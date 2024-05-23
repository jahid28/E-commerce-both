import {loadStripe} from "@stripe/stripe-js"

import React from 'react'

export async function checkout({lineItems}) {
    let stripePromise =null
    const getstripe =()=>{
        if(!stripePromise){
            stripePromise =loadStripe(`${process.env.REACT_APP_STRIPE}`)
        }
        return stripePromise
    }
    const stripe =await getstripe()
    await stripe.redirectToCheckout({
        mode:"payment",
        lineItems,
        successUrl:"http://localhost:3000/orders",
		cancelUrl: "http://localhost:3000"
    })
}