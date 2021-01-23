import { Component } from "react";
import { Card, CardContent, CardMedia, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, IconButton } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SubscriptionService from "../../services/SubscriptionService";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
    card: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        boxShadow: "4"
    },
    cardMedia: {
        height: 140,
    },
    cardContent: {
        padding: 25,
    },
    text: {
        fontSize: "1.0em"
    },
    text2: {
        fontSize: "0.9em"
    }
});

class PurchaseEntry extends Component {

    delete(transaction_id) {
        SubscriptionService.deleteSubscription(transaction_id)
            .then(() => this.props.history.push("/purchase-history"))
            .catch(() => { });
    }

    render() {
        const { purchase, classes } = this.props;

        const timestamp = new Intl.DateTimeFormat('es', { dateStyle: 'full', timeStyle: 'long' }).format(purchase.timestamp);
        const operationType = purchase.operationType === "payment" ? "Pago" : "Suscripción";
        const transaction_id = purchase.transaction_id;

        const productList = purchase.products.map((product, i) => (
            <Grid key={i} container margin={2} item xs={11} alignItems="center">
                <Card aria-label="purchaseProduct" className={classes.card}>
                    <Grid item xs={10}>
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.text} variant="overline" color="textPrimary" gutterBottom>Nombre del producto: {product.name}</Typography>
                            <br/>
                            <Typography className={classes.text2} variant="overline" color="textSecondary" gutterBottom>Precio: {product.quantity}x{product.unitPriceEuros} € = {product.quantity * product.unitPriceEuros} €</Typography>
                            <br/>
                            <Typography className={classes.text2} variant="overline" color="textSecondary" gutterBottom>Referencia:{" "}
                                <Typography className={classes.text2} variant="overline" color="textSecondary" component={Link} to={"/products/" + product._id} target="_blank">{product._id}</Typography>
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={2} >
                        <CardMedia className={classes.cardMedia} component="img" image={product.imageUrl} alt={product.name} />
                    </Grid>
                </Card>
            </Grid>
        ));

        return (
            <Card aria-label="purchase">
                <CardContent>
                    <Typography variant="subtitle1" color="textPrimary">Fecha de compra: {timestamp}</Typography>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Tipo de operación: {operationType}</Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle2" gutterBottom>Lista de productos ({purchase.products.length})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                {productList}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    {operationType === "Suscripción" &&
                    <Grid container justify="flex-end" alignItems="flex-end">
                            <Grid item>
                                <Typography variant="subtitle2" color="textSecondary">Desactivar
                                <IconButton aria-label="Borrar" onClick={() => this.delete(transaction_id)}>
                                     <DeleteIcon />
                                </IconButton>
                                </Typography>
                            </Grid>
                    </Grid>
                    }
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PurchaseEntry);
