import React, {Component} from "react";
import MainGrid from "../components/Common/MainGrid";
import {Grid} from "@material-ui/core";
// Componente
import Payment from "../components/Payment/Payment";
// Stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

class PaymentForm extends Component {
    render() {
        return ( 
        <Elements stripe = {stripePromise} >
            <Payment />
        </Elements>
        );
    }
}
export default PaymentForm;