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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from "@material-ui/core/styles";
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CreateIcon from '@material-ui/icons/Create';
import ProductsService from "../../services/ProductsService";
import imageCompression from 'browser-image-compression';
import { connect } from "react-redux";

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
        margin: "10px"
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
        formatTypes: {},
        errors: {},
    }
    componentDidUpdate(props){

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
                                    <img id="productImg" alt="Product Image" className={classes.image} width="400px" src="https://coffaine.s3.eu-west-3.amazonaws.com/no-image.png"/>
                                    <input type="file" id="coverInput" name="cover" onChange={this.handleImageChange} hidden="hidden" />
                                    <Tooltip title={"Upload Image"} placement="bottom">
                                        <IconButton className="button" onClick={this.handleUploadImage}>
                                            <ImageSearchIcon color="primary" /> 
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField className={classes.input} id="title" name="title" placeholder="Title" error={errors.title ? true : false } helperText={errors.title} onChange={this.handleChange} fullWidth/>                                    
                                    <TextField className={classes.input} id="description" name="description" placeholder="Descriptrion" error={errors.description ? true : false } helperText={errors.description} onChange={this.handleChange} fullWidth/>
                                    <TextField className={classes.input} id="stock" name="stock" placeholder="Stock" type="number" error={errors.stock ? true : false } helperText={errors.stock} onChange={this.handleChange} fullWidth/>
                                    <Typography className={classes.input} variant="body1" color="textSecondary">Selecciona los tipos de molido que va a tener el producto: </Typography>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={grindTypes}
                                        className={classes.input}
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
                                    <br />
                                    <br />
                                    <Button
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
}

const mapStateToProps = state =>({
    newProduct: state.ProductsReducer.newProduct
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(NewProduct));
