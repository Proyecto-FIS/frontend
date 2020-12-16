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

class Product extends Component {
    render() {

        const { classes, product: { _id, name, description, imageUrl } } = this.props;

        return (
            <Grid key={_id} item xs={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={imageUrl}
                        title={name}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
                        <Typography>{description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">Ver</Button>
                        <Button size="small" color="primary">Editar</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
}

export default (withStyles(styles, { withTheme: true })(Product));
