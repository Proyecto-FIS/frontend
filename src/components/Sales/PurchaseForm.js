import React, { Component } from "react";
import { Button, Select, MenuItem, InputLabel, FormControl, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import BillingProfileService from "../../services/BillingProfileService";
import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";
import MainGrid from "../Common/MainGrid";
import { CardElement } from "@stripe/react-stripe-js";
import PaymentService from "../../services/PaymentService";

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
    }
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

    pay(event) {
        // TODO Comprobar tarjeta de crédito
        if (this.state.billingProfile === "" || this.state.operationType === "") {
            this.props.startSnackBar("warning", "Hay campos sin rellenar");
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
            products.push({ _id: product._id, quantity: product.quantity });
        });
        
        PaymentService.postPayment(billingProfile, products, stripe, elements)
            .then(() => {
                // TODO Redireccionar a donde toque
            })
            .catch(() => {
                // TODO Gestionar errores
            })
    };

    handleSubmitSubscription(event) {

        /*const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            },
        });

        if (result.error) {
            console.log(result.error.message);
            dispatch(startSnackBar("error", '¡Ha habido un error! ' + result.error.message));
        } else {
            const billing_profile_id = 1;
            const res = await PaymentService.postSubscription(result.paymentMethod.id, email, billing_profile_id);
            // eslint-disable-next-line camelcase
            const { client_secret, status } = res.data;

            if (status === 'requires_action') {
                stripe.confirmCardPayment(client_secret).then(function (result) {
                    if (result.error) {
                        console.log('¡Ha habido un error!');
                        // Display error message in your UI.
                        // The card was declined (i.e. insufficient funds, card has expired, etc)
                        dispatch(startSnackBar("error", '¡Ha habido un error! ' + result.error.message));
                    } else {
                        console.log('You got the money!');
                        // Show a success message to your customer
                        dispatch(startSnackBar("success", "La subscripción se ha realizado satisfactoriamente"));
                    }
                });
            } else {
                console.log('You got the money!');
                // No additional information was needed
                // Show a success message to your customer
                dispatch(startSnackBar("success", "La subscripción se ha realizado satisfactoriamente"));
            }
        }*/
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
            <MainGrid container className={classes.form}>
                <Grid item>
                    <Typography variant="h3" align="center">Resumen del pedido</Typography>
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
                <Grid item>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </Grid>
                <Grid container item direction="row-reverse">
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={ev => this.pay(ev)}>Pagar</Button>
                    </Grid>
                </Grid>
            </MainGrid>
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
