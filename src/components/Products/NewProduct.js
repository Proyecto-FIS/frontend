import { Component } from "react";
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    Tooltip,
    IconButton,
    Button,
    TextField,
    Grid,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from "@material-ui/core/styles";
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import ProductsService from "../../services/ProductsService";
import imageCompression from 'browser-image-compression';
import { connect } from "react-redux";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { Redirect } from "react-router-dom";

const styles = (theme) => ({
    div: {
        display: 'flex',
        flexDirection: "row",
    },
    divImage:{
        position: 'relative',
        margin: '0 auto',
    },
    card: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    image:{
        minWidth: 200,
        maxWidth: 400,
        maxHeight: 500,
        [theme.breakpoints.down("xs")]: {
            minWidth: 150,
        },
    },
    content: {
        padding: 25,
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        maxWidth: 450,
    },
    input:{
        margin: '10px',
        width: '100%'
    },
    inputHalf:{
        margin: '10px',
        width: '45%'
    },
    inputInline: {
        display: "inline-flex",
        width: '100%'
    },
    button: {
        float: 'right'
    },
    errorText: {
        color: "#f44336",
        margin: 0,
        "font-size": "0.75rem",
        "margin-top": "3px",
        "text-align": "left",
        "font-family": "Roboto",
        "font-weight": 400,
        "line-height": 1.66,
        "letter-spacing":" 0.03333em",
    }
});

class NewProduct extends Component {
    productsService = new ProductsService();
    state = {
        title: '',
        description: '',
        grinds: [],
        stock: 0,
        productImg: '',
        formatTypes: [{
            name: '',
            price: 0
        }],
        errors: {},
        redirect: null,
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.newProduct?.created){
            this.setState({ redirect: "/" });
        }
        if(prevProps.newProduct?.loading === true && this.props.newProduct?.productImage){
            document.getElementById('productImg').src = this.props.newProduct.productImage;
            this.setState({
                productImg: this.props.newProduct.productImage
            });
        }
    };
    handleImageChange = async (event) => {
        const image = event.target.files[0];
        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            onProgress: function() {
                return true;
            }
          }
        let formData = await imageCompression(image, options)
            .then(function (compressedImage) {
                const data = new FormData();
                data.append('cover', compressedImage, image.name);
                return data;
            })
            .catch((error)=>{
                console.log(error.message);
            });
        this.productsService.uploadImage(formData);
    };
    handleUploadImage = () => {
        const fileInput = document.getElementById('coverInput');
        fileInput.click();
    };
    createFormatTypes(){
        return Array.isArray(this.state.formatTypes) ? this.state.formatTypes?.map((el, i) => 
            <div key={i} className={this.props.classes.inputInline}>
                <TextField className={this.props.classes.input} id="name" name="name" placeholder="Format" error={this.state.errors[`format.${i}.name`] ? true : false } helperText={this.state.errors[`format.${i}.name`]} onChange={this.handleFormatChange.bind(this,i)} />
                <CurrencyTextField className={this.props.classes.input} name="price" placeholder="Price" variant="standard" currencySymbol="€" outputFormat="number" minimumValue="0" onChange={this.handleFormatChange.bind(this.value, i)} />
                { i > 0 ? 
                    <IconButton aria-label="delete" onClick={this.removeClick.bind(this, i)}>
                        <DeleteIcon />
                    </IconButton>
                : null}
            </div>
        ) : null
    }
    addClick(){
        let values = this.state.formatTypes;
        this.setState({ formatTypes: [...values, {
            name: '',
            price: 0
        }]})
    }
    removeClick(i){
        console.log(i)
        let values = [...this.state.formatTypes];
        console.log(values);
        values.splice(i,1);
        console.log("Despues")
        console.log(values);
        this.setState({ formatTypes: values });
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleGrindChange = (event,values) => {
        this.setState({grinds: values});
    }
    handleFormatChange = (i,event) => {
        let formats = this.state.formatTypes
        if(event.target.name === "name")
            formats[i].name = event.target.value
        else{
            formats[i].price = event.target.value
        }
        this.setState({ formatTypes: formats });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.productsService.postProduct({
            product:{
                providerId: this.props.account._id,
                name: this.state.title,
                description: this.state.description,
                grind: this.state.grinds,
                stock: this.state.stock,
                imageUrl: this.state.productImg,
                format: this.state.formatTypes
            },
            userToken: this.props.account.token
        });
    };

    render() {
        const {errors} = this.state;
        const {classes, newProduct: {loading}} = this.props;
        const grindTypes = [
            "Grueso",
            "Medio grueso",
            "Medio",
            "Medio fino",
            "Fino",
            "Extra fino espresso"
        ]
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Card className={classes.card}>
                <div className={classes.div}>
                    <CardContent className={classes.content}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <img id="productImg" alt="Product" className={classes.image} src="https://coffaine.s3.eu-west-3.amazonaws.com/no-image.png"/>
                                    <input type="file" id="coverInput" name="cover" onChange={this.handleImageChange} hidden="hidden" />
                                    <Tooltip title={"Upload Image"} placement="bottom">
                                        <IconButton className="button" onClick={this.handleUploadImage}>
                                            <ImageSearchIcon color="primary" /> 
                                        </IconButton>
                                    </Tooltip>
                                    {errors.imageUrl ? (<p className={classes.errorText} id="name-helper-text">Upload an Image</p>) : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField className={classes.input} id="title" name="title" placeholder="Title" error={errors.name ? true : false } helperText={errors.name} onChange={this.handleChange} fullWidth/>                                    
                                    <TextField className={classes.input} id="description" name="description" placeholder="Description" error={errors.description ? true : false } helperText={errors.description} onChange={this.handleChange} fullWidth/>
                                    <TextField className={classes.input} id="stock" name="stock" placeholder="Stock" type="number" error={errors.stock ? true : false } helperText={errors.stock} onChange={this.handleChange} fullWidth/>
                                    <Typography className={classes.input} variant="body1" color="textSecondary">Selecciona los tipos de molido que va a tener el producto: </Typography>
                                    <Autocomplete
                                        multiple
                                        options={grindTypes}
                                        className={classes.input}
                                        onChange={this.handleGrindChange}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            error={errors.grind ? true : false } 
                                            helperText={errors.grind}                                            
                                            label="Grind Types"
                                            placeholder="Grind Types"
                                        />
                                        )}
                                    />
                                    <br />
                                    <Typography className={classes.input} variant="body1" color="textSecondary">Selecciona los distintos envasados que va a tener el producto: </Typography>
                                    {this.createFormatTypes()}
                                    <IconButton aria-label="addFormat" className={classes.button} onClick={this.addClick.bind(this)}>
                                        <AddIcon />
                                    </IconButton>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        disabled={loading}
                                        endIcon={<CreateIcon />}
                                    >
                                        Crear
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </div>
            </Card>
        );
    }
}

NewProduct.propTypes = {
    classes: PropTypes.object.isRequired,
    newProduct: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    newProduct: state.ProductsReducer.newProduct,
    account: state.AuthReducer.account
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(NewProduct));
