import { Component } from "react";
import { Card, CardContent, CardMedia, Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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

class Subscription extends Component {

    render() {
        const { subscription, classes } = this.props;

        const timestamp = new Intl.DateTimeFormat('es', { dateStyle: 'full', timeStyle: 'long' }).format(subscription.timestamp);

        const productList = subscription.products.map((product, i) => (
            <Grid key={i} container margin={2} item xs={11} alignItems="center">
                <Card aria-label="subscriptionProduct" className={classes.card}>
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
                    <Grid item xs={2}>
                        <CardMedia className={classes.cardMedia} component="img" image={product.imageUrl} alt={product.name} />
                    </Grid>
                </Card>
            </Grid>
        ));

        return (
            <Card aria-label="subscription">
                <CardContent>
                    <Typography variant="subtitle1" color="textPrimary">Fecha de compra: {timestamp}</Typography>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Id de la transacción: {subscription.transaction_subscription_id}</Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle2" gutterBottom>Lista de productos ({subscription.products.length})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                {productList}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Subscription);
