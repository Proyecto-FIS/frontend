import React, {useState, Component} from 'react';
import { useDispatch } from "react-redux";
import setPayment from "../../redux/actions/Subscription/setPayment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import axios from 'axios';
// Material UI Components
import Button from '@material-ui/core/Button';
import { Card, CardContent, Grid, Typography, IconButton, TextField } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
// stripe
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// Components
import CardInput from './CardInput';
// Service
import PaymentService from "../../services/PaymentService";
import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      margin: '35vh auto',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'flex-start',
    },
    div: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
    },
    button: {
      margin: '2em auto 1em',
    },
  });

  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

class Payment extends Component {

    async submitPayment() {

        this.props.setPayment(this.props.payment);
        this.props.history.push("/payments/add");

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }
      
          const res = await PaymentService.postPayment(email, price, billing_profile_id);
      
          const clientSecret = res.data['client_secret'];
          console.log(clientSecret);
      
          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                email: email,
              },
            },
          });
          
          if (result.error) {
            console.log(result.error.message);
            // Show error to your customer (e.g., insufficient funds)
            dispatch(startSnackBar("error", '¡Ha habido un error!' + result.error.message));
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              console.log('Money is in the bank!');
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              dispatch(startSnackBar("success", "Pago realizado satisfactoriamente"));
            }
          }


    }

    async submitSubscription() {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }
      
          const result = await stripe.createPaymentMethod({
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
            console.log(result);
            const res = await PaymentService.postSubscription(result.paymentMethod.id, email);
            console.log(res);
             // eslint-disable-next-line camelcase
            const {client_secret, status} = res.data;
      
            if (status === 'requires_action') {
              stripe.confirmCardPayment(client_secret).then(function(result) {
                if (result.error) {
                  console.log('¡Ha habido un error!');
                  console.log(result.error);
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
          }

        // PaymentService.deletePayment(this.props.payment)
        //     .then(() => PaymentService.requestPayments())
        //     .catch(() => { });
    }

    render() {
            const { payment } = this.props;

            return (
                <Card className={classes.root}>
        <CardContent className={classes.content}>
            <TextField
            label='Email'
            id='outlined-email-input'
            helperText={`Email you'll recive updates and receipts on`}
            margin='normal'
            variant='outlined'
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            />
            <TextField
            label='Price'
            id='outlined-price-input'
            helperText={`Price product TEST`}
            margin='normal'
            variant='outlined'
            type='number'
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            />
            <CardInput />
            <div className={classes.div}>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>
                Pay
            </Button>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitSub}>
                Subscription
            </Button>
            </div>
        </CardContent>
        </Card>
    );
    }
}

const mapDispatchToProps = {
    setPayment
};

export default withRouter(connect(null, mapDispatchToProps)(Payment));
