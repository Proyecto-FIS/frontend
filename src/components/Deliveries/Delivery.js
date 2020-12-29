import { Component } from "react";
import PropTypes from 'prop-types';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import {Link} from 'react-router-dom';

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    cardMedia: {
        height: 140,
    },
    cardContent: {
        padding: 25,
    },
});


class Delivery extends Component {
    render() {

        const { classes, delivery: { _id, name, surnames, address, comments } } = this.props;

        return (
            <Grid key={_id} item sm={4} xs={12}>
                <Card className={classes.card}>
                    <CardMedia
                        component="img"
                        className={classes.cardMedia}
                        title={name}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component={Link} to={`/products/${_id}`}>{name}</Typography>
                        <Typography variant="body2">{comments}</Typography>
                        <Typography variant="body2">{name}</Typography>
                        <Typography variant="body2">{surnames}</Typography>
                        <Typography variant="body2">{address}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

Delivery.propTypes = {
    delivery: PropTypes.object.isRequired,
}

export default (withStyles(styles, { withTheme: true })(Delivery));
