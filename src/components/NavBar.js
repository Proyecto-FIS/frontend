import { Component } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    withStyles
} from "@material-ui/core";
import CameraIcon from "@material-ui/icons/PhotoCamera";

const styles = (theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
    navButton: {
        marginRight: theme.spacing(2),
    }
})

class NavBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <CameraIcon className={classes.navButton}/>
                    <Typography variant="h6">
                        ¿Te apetece un café?
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NavBar);
