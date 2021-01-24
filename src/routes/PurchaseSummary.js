import React, { Component } from "react";
import { ElementsConsumer, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PurchaseForm from "../components/Sales/PurchaseForm";

const stripePromise = loadStripe("pk_test_51I6Be7F99Rt15XIeG4wPUHclnzu0sTcV8XBWD5EdODbhUO4ssfRS50TImpP9klwmsJC7v2M91pneoF589jcYm7Fx00K2qrUolB");

class PurchaseSummary extends Component {

    render() {
        return (
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ stripe, elements }) => (
                        <PurchaseForm stripe={stripe} elements={elements} />
                    )}
                </ElementsConsumer>
            </Elements>
        );
    }
}

export default PurchaseSummary;
