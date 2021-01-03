import { Component } from "react";
import PropTypes from 'prop-types';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CardActions,
    Avatar,
    Typography,
    IconButton,
} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Autorenew';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';


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

        const { classes, delivery: { _id, name, surnames, address, city, comments, statusType, deliveryDate } } = this.props;

        return (
            <Grid key={_id} item sm={4} xs={12}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="delivery" className={classes.avatar}>
                                D
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={statusType}
                        subheader={`Entrega estimada: ${deliveryDate}`}
                    />
                    <CardMedia
                        component="img"
                        className={classes.cardMedia}
                        image="https://cdn3.vectorstock.com/i/1000x1000/31/17/coffee-delivery-logo-icon-design-vector-22483117.jpg"
                        title={name}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5">Resumen del pedido</Typography>
                        <hr/>
                        <Typography variant="body1">{comments}</Typography>
                        <Typography variant="body1" component={Link} to={`/deliveries/${_id}`}>{_id}</Typography>
                        <br/>
                        <Typography variant="h5">Dirección de entrega</Typography>
                        <hr/>
                        <Typography paragraph>{name} {surnames}</Typography>
                        <Typography paragraph>{address}</Typography>
                        <Typography paragraph>{city}</Typography>     
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="cancel">
                            <CancelIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="update">
                            <UpdateIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

Delivery.propTypes = {
    delivery: PropTypes.object.isRequired,
}

export default (withStyles(styles, { withTheme: true })(Delivery));
