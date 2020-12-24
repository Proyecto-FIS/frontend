import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {Fragment} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {logout} from "../redux/actions/logout";
import LoginMenu from './Auth/LoginMenu';


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


const NavBar = ({auth: {isAuthenticated, loading}, logout}) => {

    const authLinks = (
        <Fragment>
            <Button variant="contained" color="primary" onClick={logout} startIcon={<ExitToAppIcon />}>Cerrar sesión</Button>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <LoginMenu/>
            <Button variant="contained" color="primary" startIcon={<VpnKeyIcon />} href="/login">Entrar</Button>
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
                
                { !loading && (isAuthenticated ? authLinks: guestLinks) }
                
            </Toolbar>
        </AppBar>
    );
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.AuthReducer
});

export default connect(mapStateToProps, {logout})(NavBar);
