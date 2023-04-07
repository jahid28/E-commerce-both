import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment.js';
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE}`);

export default function PaymentWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <Payment />
        </Elements>
    );
}
