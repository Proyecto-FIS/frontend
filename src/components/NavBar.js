import { Component } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    withStyles
} from "@material-ui/core";
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import {Link} from 'react-router-dom';

const styles = (theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
    navButton: {
        marginRight: theme.spacing(2),
    },

})

class NavBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <LocalCafeIcon color="inherit" className={classes.navButton}/>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" color="textSecondary" className={classes.navButton}>
                            Coffaine
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NavBar);
