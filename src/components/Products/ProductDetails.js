import { Component } from "react";
import PropTypes from 'prop-types';
import {
    Button,
    Grid,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        height: "70vh"
    },
    cardMedia: {
        paddingTop: "100%", // Image aspect ratio
    },
    cardContent: {
        flexDirection: 'column',
        padding: 25
    },
});

class ProductDetails extends Component {
    render() {
        return (
            <Grid container spacing={6}>
                <h1>HOLA</h1>
            </Grid>
        );
    }
}


export default (withStyles(styles, { withTheme: true })(ProductDetails));
