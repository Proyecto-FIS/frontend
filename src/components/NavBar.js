import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import {logout} from "../redux/actions/logout";
import RegisterMenu from './Auth/RegisterMenu';


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1)
    },
    navButton: {
        marginRight: theme.spacing(1)
    },
    auth: {
        flexGrow: 1
    }
}));


const NavBar = () => {

    const dispatch = useDispatch();

    const accountLogin = useSelector(state => state.AuthReducer);

    const { account } = accountLogin;

    const logoutHandler = () => {
        dispatch(logout());
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

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <LocalCafeIcon className={classes.navButton}/>
                <Typography variant="h6" className={classes.auth}>
                    ¿Te apetece un café?
                </Typography>
                
                { account ? authLinks : guestLinks }

            </Toolbar>
        </AppBar>
    );
}



export default NavBar;
