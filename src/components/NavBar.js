import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";

import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import StorefrontIcon from '@material-ui/icons/Storefront';

import {Component, Fragment} from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import RegisterMenu from './Auth/RegisterMenu';
import LoggedMenu from './Users/LoggedMenu';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import UsersService from "../services/UsersService"
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PaymentIcon from '@material-ui/icons/Payment';
import CartService from "../services/CartService";
import ProductListItem from "./Common/ProductListItem";

const styles = (theme) => ({
    root: {
        marginBottom: theme.spacing(1)
    },
    navButton: {
        marginRight: theme.spacing(2)
    },
    auth: {
        flexGrow: 1
    },
    cart: {
        marginRight: "20px"
    },
    dialogText: {
        margin: "10px 0px 10px 25px"
    },
    submitButton: {
        position: 'relative',
        margin: "10px 0px 10px 25px"
    },
    listItem: {
        width: "50%"
    }
});

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}))(Badge);

class NavBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
        }
    }

    usersService = new UsersService();
    cartService = new CartService();

    render() {
        const {classes, account} = this.props;
        
        const handleClose= () => {
            this.setState({
                open: false
            })
        };

        const handleOpen = () => {
            this.setState({
                open: true
            })
        }

        const handleDeleteItem = (product) => {
            let products = this.props.productList.filter((p) => {
                return p._id !== product._id
            })
            this.cartService.updateCart(products)
        }

        const handlePurchase = () => {
            this.setState({
                open: false,
            });
            this.props.history.push("/purchase");
        }
    
        const authLinks = (
            <Fragment>
                {account && <LoggedMenu account={account}/> }
            </Fragment>
        );
    
        const guestLinks = (
            <Fragment>
                <RegisterMenu/>
                <Button variant="contained" color="primary" startIcon={<VpnKeyIcon />} component={ Link } to="/login">Entrar</Button>
            </Fragment>
        );

        const cart = (
            <Fragment>
                <IconButton onClick={handleOpen} className={classes.cart} aria-label="cart" color="inherit">
                    <StyledBadge badgeContent={this.props.quantity} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={this.state.open} fullWidth>
                    <DialogTitle id="simple-dialog-title">Carro de la compra</DialogTitle>
                    <List>
                        {this.props.quantity > 0 ? this.props.productList.map((product) => (
                            <ProductListItem key={`product-${product._id}-${product.format}`} product={product} handleDeleteItem={handleDeleteItem}/>
                        )) : <Typography variant="h5" color="textSecondary" className={classes.dialogText}>El carro está vacío</Typography>}
                        {this.props.quantity > 0 ? (
                        <Fragment>
                            <Divider />
                            <Typography variant="h6" color="textPrimary" className={classes.dialogText}>Total: {this.props.totalPrice}€</Typography>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} endIcon={<PaymentIcon />} onClick={handlePurchase}>Comprar</Button>
                        </Fragment>) : null}
                    </List>
                </Dialog>
            </Fragment>
        );
    
        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <LocalCafeIcon color="inherit" className={classes.navButton}/>
                    
                    <Typography variant="h6" className={classes.auth}>
                        <Link to="/" style={{ textDecoration: 'none' }}> Coffaine </Link>
                    </Typography>
                    <Button style={{marginRight: '15px'}} variant="contained" color="primary" startIcon={<StorefrontIcon />} component={ Link } to="/toasters">Tostadores</Button>
                    { account && account.isCustomer ? cart : null }
                    { account ? authLinks : guestLinks }

                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state =>({
    quantity: state.CartReducer.quantity,
    productList: state.CartReducer.productList,
    totalPrice: state.CartReducer.totalPrice,
    account: state.AuthReducer.account
});


export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(NavBar)));
