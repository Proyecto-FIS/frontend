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
            price: ''
        }],
        errors: {},
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.newProduct?.errors){
            this.setState({
                title: '',
                description: '',
                grinds: [],
                stock: 0,
                productImg: '',
                formatTypes: {},
                errors: this.props.newProduct.errors
            });
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
        return this.state.formatTypes.map((el, i) => 
            <div key={i} className={this.props.classes.inputInline}>
                <TextField className={this.props.classes.input} id="name" name="name" placeholder="Format" error={this.state.errors.stock ? true : false } helperText={this.state.errors.stock} onChange={this.handleFormatChange.bind(this,i)} />
                <CurrencyTextField className={this.props.classes.input} name="price" placeholder="Price" variant="standard" currencySymbol="€" outputFormat="number" minimumValue="0" onChange={this.handleFormatChange.bind(this.value, i)} />
                <IconButton aria-label="delete" onClick={this.removeClick.bind(this, i)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    }
    addClick(){
        let values = this.state.formatTypes;
        this.setState({ formatTypes: [...values, {
            name: '',
            price: ''
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
        console.log(i)
        console.log(event.target.value)
        console.log(event.target.name)
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
            title: this.state.title,
            description: this.state.description,
            grinds: this.state.grinds,
            stock: this.state.stock,
            productImg: this.state.productImg,
            formatTypes: this.state.formatTypes
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
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField className={classes.input} id="title" name="title" placeholder="Title" error={errors.title ? true : false } helperText={errors.title} onChange={this.handleChange} fullWidth/>                                    
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
}

const mapStateToProps = state =>({
    newProduct: state.ProductsReducer.newProduct
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(NewProduct));
