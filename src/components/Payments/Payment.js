import React, {useState} from 'react';
import { useDispatch } from "react-redux";
// import axios from 'axios';
// Material UI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
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

function Payment() {

  const dispatch = useDispatch();
  const classes = useStyles();
  // State
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const billing_profile_id = 1;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (event) => {
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
  };

  const handleSubmitSub = async (event) => {
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
  };

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

export default Payment;
