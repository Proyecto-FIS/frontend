import { Component, Fragment } from "react";
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
import Select from "@material-ui/core/Select";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import CartService from "../../services/CartService";
import ProductsService from "../../services/ProductsService";
import getProduct from "../../redux/actions/Products/getProduct";
import { withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { Link } from "react-router-dom";

const styles = (theme) => ({
  div: {
    display: "flex",
    flexDirection: "row",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  image: {
    minWidth: 200,
    [theme.breakpoints.down("xs")]: {
      minWidth: 150,
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
        float: 'right',
        margin: '0px 20px 0px 0px'
    },
    toasterButtons: {
        margin: '50px 0px 0px 0px',
        display: 'flex',
        float: 'right'
    },
    toasterName: {
        margin: '10px 0px 0px 15px',
    }
});

class ProductDetails extends Component {
    cartService = new CartService();

    state = {
        productList: [],
        grindType: "",
        formatType: {},
        productPrice: 0.0,
        toasterData: {},
        redirect: null,
    };
    componentDidMount(){
        const productList = this.props.productList
        axios.get(`/api/toasters/${this.props.product.providerId}`)
        .then((res)=>{
            this.setState({
                productList: productList,
                toasterData: {
                    name: res.data.name,
                    pictureUrl: res.data.pictureUrl
                }
            })
        })

    }
    componentDidUpdate(){
        if(this.props.productDetails.deleted){
            this.setState({
                redirect: "/"
            })
        }
    }

  state = {
    productList: [],
    grindType: "",
    formatType: {},
    productPrice: 0.0,
    redirect: null,
  };
  componentDidMount() {
    const productList = this.props.productList;
    this.setState({
      productList: productList,
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "formatType" && value) {
      const formats = this.props.product.format;
      const id = event.target.value;
      const format = formats.find((f) => {
        return f._id === id;
      });
      this.setState({
        formatType: format,
        productPrice: format.price,
      });
    } else {
      this.setState({
        [name]: event.target.value,
      });
      
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
        let found = productList.find(p => p._id === product._id && p.format === product.format)
        if(found){
            found.quantity = found.quantity + 1   
        }else{
            productList.push(product)
        }
        this.cartService.updateCart(productList)
    }
  }

  handleDeleteProduct = (id) => {
    ProductsService.deleteProduct(id);
    this.props.history.push("/");
  };

  handleEditProduct() {
    this.props.getProduct(this.props.product);
    this.props.history.push("/products/new");
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
                        { this.state.toasterData.name ? 
                            <div className={classes.div}>
                                <Avatar alt={this.state.toasterData.name} src={this.state.toasterData.pictureUrl} /><Typography className={classes.toasterName} variant="body1" color="primary" component={Link} to={`/toasters/${providerId}`}>{this.state.toasterData.name}</Typography>
                            </div>
                        : null}
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
                aria-label="add-cart"
                className={classes.button}
                onClick={() => this.handleAddCart(_id)}
                disabled={
                  this.state.grindType === "" ||
                  Object.entries(this.state.formatType).length === 0
                }
                endIcon={<ShoppingBasketIcon />}
              >
                Añadir al carrito
              </Button>
            ) : null}
            {account && !account.isCustomer && account._id === providerId ? (
              <Fragment>
                <div className={classes.toasterButtons}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    aria-label="edit-product"
                    disabled={this.props.productDetails.loading}
                    className={classes.button}
                    endIcon={<EditIcon />}
                    onClick={() => this.handleEditProduct()}
                  >
                    Editar Producto
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    aria-label="delete-product"
                    onClick={() => this.handleDeleteProduct(_id)}
                    disabled={this.props.productDetails.loading}
                    className={classes.button}
                    endIcon={<DeleteIcon />}
                  >
                    Borrar Producto
                  </Button>
                </div>
              </Fragment>
            ) : null}
          </CardContent>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  productList: state.CartReducer.productList,
  account: state.AuthReducer.account,
  productDetails: state.ProductsReducer.productDetails,
});

const mapDispatchToProps = {
  getProduct,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(ProductDetails))
);
