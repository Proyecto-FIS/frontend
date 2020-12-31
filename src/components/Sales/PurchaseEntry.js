import { Component } from "react";
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class PurchaseEntry extends Component {

    render() {
        const { purchase } = this.props;

        const timestamp = new Intl.DateTimeFormat('es', { dateStyle: 'full', timeStyle: 'long' }).format(purchase.timestamp);
        const operationType = purchase.operationType === "payment" ? "Pago" : "Suscripción";

        const productList = purchase.products.map((product, i) => (
            <div key={i}>
                <Typography>Product ID: {product._id}</Typography><br/>
                <Typography>Product name: {product.name}</Typography><br/>
                <Typography>Product image: {product.imageUrl}</Typography><br/>
                <Typography>Cantidad: {product.quantity}</Typography><br/>
                <Typography>Precio: {product.unitPriceEuros}</Typography><br/>
            </div>
        ));

        return (
            <Card>
                <CardContent>
                    <Typography>ID: {purchase._id}</Typography>
                    <Typography>Fecha: {timestamp}</Typography>
                    <Typography>Tipo de operación: {operationType}</Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Lista de productos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {productList}
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        );
    }
}

export default PurchaseEntry;
