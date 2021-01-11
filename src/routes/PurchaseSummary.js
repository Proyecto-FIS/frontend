import React, { Component } from "react";
import { ElementsConsumer, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PurchaseForm from "../components/Sales/PurchaseForm"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

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

// export default PurchaseSummary;
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PurchaseSummary));
