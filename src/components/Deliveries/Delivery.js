import { Component } from "react";
import PropTypes from 'prop-types';
import {
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
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import setDelivery from "../../redux/actions/Delivery/setDelivery";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const styles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red,
    },
  }));

class Delivery extends Component {

    edit() {
        this.props.setDelivery(this.props.delivery);
        this.props.history.push("/deliveries/add");
    }

    render() {

        const { classes, delivery: { _id, name, surname, address, city, comments, statusType, deliveryDate } } = this.props;

        return (
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="delivery" className={classes.avatar}  >
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
                        image="https://www.monumentalmarkets.com/wp-content/uploads/Depositphotos_184271090_m-2015-300x200.jpg"
                        title={name}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5">Resumen del pedido</Typography>
                        <hr/>
                        <Typography variant="body1">{comments}</Typography>
                        <Typography variant="body1" component={Link} to={`/deliveries/${_id}`}>{_id}</Typography>
                        <br/>
                        <Typography variant="h5" spacing={4}>Dirección de entrega</Typography>
                        <hr/>
                        <Typography paragraph>{name} {surname}</Typography>
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
                        <IconButton aria-label="Editar" onClick={() => this.edit()}>
                            <UpdateIcon />
                        </IconButton>
                    </CardActions>
                </Card>
        );
    }
}

const mapDispatchToProps = {
    setDelivery
};

Delivery.propTypes = {
    delivery: PropTypes.object.isRequired,
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Delivery)));
