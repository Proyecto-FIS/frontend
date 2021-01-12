import React, { Component } from "react";
import { Button, Select, MenuItem, InputLabel, FormControl, Grid, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import BillingProfileService from "../../services/BillingProfileService";
import SubscriptionService from "../../services/SubscriptionService";
import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";
import MainGrid from "../Common/MainGrid";
import { CardElement } from "@stripe/react-stripe-js";
import PaymentService from "../../services/PaymentService";
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    paper: {
        padding: theme.spacing(7),
        margin: 'auto',
        maxWidth: 1200,
    },
    root: {
        padding: theme.spacing(4),
        flexGrow: 1,
    },
    cardpay: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    titleForm: {
        paddingBottom: theme.spacing(4),
    },
});

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            'color': '#32325d',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

class PurchaseForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            billingProfile: "",
            operationType: "",
            creditCardError: true,
        };

        BillingProfileService.requestProfiles();
    }

    changeBillingProfile(ev) {
        this.setState({
            billingProfile: ev.target.value
        });
    }

    changeOperationType(ev) {
        this.setState({
            operationType: ev.target.value
        });
    }

    checkCreditCard(ev) {
        this.setState({
            creditCardError: ev.error === undefined && !ev.empty ? false : true
        });
    }

    pay(event) {
        if (this.state.billingProfile === "" || this.state.operationType === "") {
            this.props.startSnackBar("warning", "Hay campos sin rellenar");
            return;
        }

        if(this.state.creditCardError) {
            this.props.startSnackBar("error", "La información de la tarjeta no es válida");
            return;
        }

        if (!this.props.stripe || !this.props.elements) {
            this.props.startSnackBar("warning", "Stripe está siendo cargado, espere unos instantes e inténtelo de nuevo");
            return;
        }

        if (this.state.operationType === "payment") {
            this.handleSubmitPay(event);
        } else {
            this.handleSubmitSubscription(event);
        }
    }

    handleSubmitPay(event) {

        const { stripe, elements } = this.props;
        
        const billingProfileIndex = parseInt(this.state.billingProfile, 10);
        const billingProfile = this.props.billingProfiles[billingProfileIndex];
        
        let products = [];
        this.props.products.forEach((product, i) => {
            products.push({ _id: product._id, quantity: product.quantity, format: product.format });
        });
        
        PaymentService.postPayment(billingProfile, products, stripe, elements.getElement(CardElement))
        .then(() => {
            // TODO Redireccionar a donde toque
            console.log("Payment REDIRECCIONAR a Delivery");
        })
        .catch(() => {
            // TODO Gestionar errores
            console.log("Ha habido un error");
        });
    };

    handleSubmitSubscription(event) {
        
        const { stripe, elements } = this.props;

        const billingProfileIndex = parseInt(this.state.billingProfile, 10);
        const billingProfile = this.props.billingProfiles[billingProfileIndex];

        let products = [];
        this.props.products.forEach((product, i) => {
            products.push({ _id: product._id, quantity: product.quantity, format: product.format });
        });
        
        SubscriptionService.postSubscription(billingProfile, products, stripe, elements.getElement(CardElement))
            .then(() => {
                // TODO Redireccionar a donde toque
                console.log("Subscripcion: REDIRECCIONAR a Delivery");
            })
            .catch(() => {
                // TODO Gestionar errores
                console.log("Ha habido un error");
            });
        };
        
        render() {

        const { /*products,*/ totalPrice, billingProfiles, classes } = this.props;

        const profileList = billingProfiles === null ? null : billingProfiles.map((profile, i) => (
            <MenuItem key={i} value={i}>
                {`${profile.name}, ${profile.address}, ${profile.city}, ${profile.province}, ${profile.country}`}
            </MenuItem>
        ));

        const defaultProfile = <MenuItem value={""}><em>{billingProfiles === null ? "Cargando perfiles..." : "No seleccionado"}</em></MenuItem>

        return (
            <div className={classes.root}>
            <Paper className={classes.paper}>
              
            <MainGrid container className={classes.form}>
                <Grid item className={classes.titleForm}>
                    <Typography variant="h4" align="center">Resumen del pedido</Typography>
                </Grid>
                <Grid item xs={8}>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                        <InputLabel id="billing-profile-label">Perfil de entrega</InputLabel>
                        <Select
                            className={classes.selectEmpty}
                            labelId="billing-profile-label"
                            value={this.state.billingProfile}
                            onChange={ev => this.changeBillingProfile(ev)}>
                            {defaultProfile}
                            {profileList}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                        <InputLabel id="operation-type-label">Tipo de operación</InputLabel>
                        <Select
                            className={classes.selectEmpty}
                            labelId="operation-type-label"
                            value={this.state.operationType}
                            onChange={ev => this.changeOperationType(ev)}>
                            <MenuItem value={""}>
                                <em>No seleccionado</em>
                            </MenuItem>
                            <MenuItem value={"payment"}>
                                Pago normal ({totalPrice} €)
                        </MenuItem>
                            <MenuItem value={"subscription"}>
                                Suscripción mensual ({totalPrice} €/mes)
                        </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs className={classes.cardpay}>
                    <Card>
                        <CardContent>
                            <CardElement options={CARD_ELEMENT_OPTIONS} onChange={(ev) => this.checkCreditCard(ev)} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container item direction="row-reverse">
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={ev => this.pay(ev)}>Pagar</Button>
                    </Grid>
                </Grid>
            </MainGrid>
            </Paper>
    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.CartReducer.productList,
        totalPrice: state.CartReducer.totalPrice,
        billingProfiles: state.BillingProfileReducer.elements
    };
};

const mapDispatchToProps = {
    startSnackBar,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PurchaseForm));
