import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import PropTypes from 'prop-types';

import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {Component, Fragment} from "react";
import { Link } from 'react-router-dom';

import RegisterMenu from './Auth/RegisterMenu';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import UsersService from "../services/UsersService"

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
    state = {
        totalProducts: 0,
        totalProductPrice: 0
    }
    usersService = new UsersService();
    
    componentDidUpdate(prevProps, prevState){
        console.log("Hola")
        console.log(prevProps)
        if(prevProps.productList !== this.props.productList){
            let totalProducts = 0
            this.props.productList.forEach(p => totalProducts + p.quantity);
            this.setState({
                totalProducts: totalProducts
            })
        }
    }

    render() {
        const {classes, account} = this.props;
        
        const logoutHandler = () => {
            this.usersService.logOut();
        }
    
        const authLinks = (
            <Fragment>
                <Button variant="contained" color="primary" onClick={logoutHandler} startIcon={<ExitToAppIcon />}>Cerrar sesión</Button>
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
                <IconButton className={classes.cart} aria-label="cart" color="inherit">
                    <StyledBadge badgeContent={this.state.totalProducts} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </Fragment>
        );
    
        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <LocalCafeIcon color="inherit" className={classes.navButton}/>
                    
                    <Typography variant="h6" className={classes.auth}>
                        <Link to="/" style={{ textDecoration: 'none' }}> Coffaine </Link>
                    </Typography>
                    {cart}
                    { account ? authLinks : guestLinks }

                </Toolbar>
            </AppBar>
        );
    }
}

NavBar.propTypes = {
    productList: PropTypes.array.isRequired,

}

const mapStateToProps = state =>({
    productList: state.CartReducer.productList,
});


export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(NavBar));
