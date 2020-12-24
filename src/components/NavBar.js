import { Component } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    withStyles, 
    Button
} from "@material-ui/core";

import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import LoginMenu from './Auth/LoginMenu';

const styles = (theme) => ({
    root: {
        marginBottom: theme.spacing(1)
    },
    navButton: {
        marginRight: theme.spacing(1)
    },
    auth: {
        flexGrow: 1
    }
})


class NavBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <LocalCafeIcon className={classes.navButton}/>
                    <Typography variant="h6" className={classes.auth}>
                        ¿Te apetece un café?
                    </Typography>
                    <LoginMenu/>
                    <Button variant="contained" color="primary" startIcon={<VpnKeyIcon />} href="/login">Entrar</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NavBar);
