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
import DeliveryService from "../../services/DeliveryService";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LocalCafeSharpIcon from '@material-ui/icons/LocalCafeSharp';


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
        color: '#fff',
        backgroundColor: red
    },
}));

class Delivery extends Component {

    edit() {
        this.props.setDelivery(this.props.delivery);
        this.props.history.push("/deliveries/add");
    }

    delete() {
        DeliveryService.deleteDelivery(this.props.delivery)
            .then(() => DeliveryService.requestDeliveries())
            .catch(() => { });
    }

    render() {

        const { classes, delivery: { paymentId, name, surname, address, city, comments, statusType, deliveryDate, zipCode, country, phoneNumber, products } } = this.props;

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
                
                    <Typography variant="h6">RESUMEN DEL PEDIDO</Typography>
                    <Typography variant="body1" component={Link} to={`/purchase-history/${paymentId}`}>[ historial de compra ]</Typography>
                    <hr />
                    
                    {products.map((product) => (
                        <div>
                            <List className={classes.root}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <LocalCafeSharpIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={product.name} secondary={`${product.unitPriceEuros * product.quantity}€ [${product.quantity} unid.]`} />
                                </ListItem>
                            </List>
                        </div>
                    ))}
                    <Typography variant="body1">{comments}</Typography>
                    <br />
                    <Typography variant="h6" >DIRECCIÓN DE ENTREGA</Typography>
                    <hr />
                    <Typography variant="h6" align='center'>{name} {surname}</Typography>
                    <Typography paragraph align='center'>{address}</Typography>
                    <Typography paragraph align='center'>{zipCode}, {city} [{country}]</Typography>
                    <Typography paragraph align='center' color='textSecondary'>TLF contacto: {phoneNumber}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="cancel">
                        <CancelIcon />
                    </IconButton>
                    <IconButton aria-label="Borrar" onClick={() => this.delete()}>
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
