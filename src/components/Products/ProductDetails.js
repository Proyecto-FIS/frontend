import { Component } from "react";
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardMedia,
    FormControl,
    InputLabel,
    Typography,
    Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from "react-redux";
import CartService from "../../services/CartService"
import ProductsService from "../../services/ProductsService"
import { Redirect } from "react-router-dom";

const styles = (theme) => ({
    div: {
        display: 'flex',
        flexDirection: "row",
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
    button: {
        float: 'right'
    }
});

class ProductDetails extends Component {
    cartService = new CartService();
    productsService = new ProductsService();

    state = {
        productList: [],
        grindType: "",
        formatType: {},
        productPrice: 0.0,
        redirect: null,
    };
    componentDidMount(){
        const productList = this.props.productList
        this.setState({
            productList: productList
        })
    }
    componentDidUpdate(){
        if(this.props.productDetails.deleted){
            this.setState({
                redirect: "/"
            })
        }
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        if(name === "formatType" && value){
            const formats = this.props.product.format;
            const id = event.target.value
            const format = formats.find(f => { return f._id===id})
            this.setState({
                formatType: format,
                productPrice: format.price
            });
       }else{
            this.setState({
                [name]: event.target.value,
              });
        }
    };

    handleAddCart = (id) =>{
        let product = {
            _id: id,
            quantity: 1,
            format: this.state.formatType.name,
            unitPriceEuros: this.state.productPrice,
            name: this.props.product.name,
            imageUrl: this.props.product.imageUrl
        }
        let productList = this.props.productList
        let found = productList.find(p => p._id === product._id)
        if(found){
            found.quantity = found.quantity + 1   
        }else{
            productList.push(product)
        }
        this.cartService.updateCart(productList)
    }

    handleDeleteProduct = (id) => {
        this.productsService.deleteProduct(this.props.account.token, id)
    }

    render() {
        const {classes, product:{ _id, name, description, format, grind, imageUrl, providerId }, account} = this.props; 
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Card className={classes.card}>
                <div className={classes.div}>
                    <CardMedia component="img" image={imageUrl} title={name}className={classes.image}/>
                    <CardContent className={classes.content}>
                        <Typography variant="h2" color="primary">{name}</Typography>
                        <Typography variant="h5" color="textSecondary">{description}</Typography>
                        <br />
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Tipo de molido</InputLabel>
                            <Select
                                native
                                value={this.state.grindType}
                                onChange={e => this.handleChange(e)}
                                inputProps={{
                                    name: "grindType",
                                    id: "grindType",
                                }}
                            >
                                <option aria-label="None" value="" />
                                {grind.map((grindType,index) => (
                                <option key={index} value={grindType}>
                                    {grindType}
                                </option>
                                ))}  
                            </Select>
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Formato</InputLabel>
                            <Select
                                native
                                value={this.state.formatType._id}
                                onChange={e => this.handleChange(e)}
                                inputProps={{
                                    name: "formatType",
                                    id: "formatType",
                                }}
                            >
                                <option aria-label="None" value="" />
                                {format.map((formatType,index) => (
                                <option key={index} value={formatType._id}>
                                    {formatType.name}
                                </option>
                                ))}  
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <Typography variant="h5" color="primary">{this.state.productPrice} €</Typography>

                        {account && account.isCustomer ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            onClick={() => this.handleAddCart(_id)}
                            disabled={this.state.grindType === "" || Object.entries(this.state.formatType).length === 0}
                            endIcon={<ShoppingBasketIcon />}
                        >
                            Añadir al carrito
                        </Button>
                        ) : null}
                        {(account && !account.isCustomer && account._id === providerId) ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => this.handleDeleteProduct(_id)}
                            disabled={this.props.productDetails.loading}
                            className={classes.button}
                            endIcon={<DeleteIcon />}
                        >
                            Borrar Producto
                        </Button>
                        ) : null }
                    </CardContent>
                </div>
            </Card>
        );
    }
}

ProductDetails.propTypes = {
    product: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    productList: state.CartReducer.productList,
    account: state.AuthReducer.account,
    productDetails: state.ProductsReducer.productDetails,
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ProductDetails));
