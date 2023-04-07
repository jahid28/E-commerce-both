import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'
import SmallCartPreview from './SmallCartPreview.js';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index.js'
import Cookies from 'js-cookie';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const PaymentForm = () => {

    useEffect(() => {
        toast.info("This is a demo payment, so don't share original bank details!", {
            autoClose: false,

        })
    }, [])

    const counter = useSelector(state => state.counter)
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();
    const [progress, setProgress] = useState(0)

    const handleSubmit = async (event) => {
        setProgress(20)
        event.preventDefault();
        try {

            const result = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            });
            setProgress(70)

            if (result.error) {
                toast.error(result.error.message)
            }
            else {
                if (counter.SmallCartPreviewTotal == 0) {
                    toast.error("Nothing to order")
                    setProgress(100)
                    return
                }
                const cookieVal = Cookies.get("email")
                let arr = []
                counter.SmallCartPreviewArr.map((e) => {
                    let obj = {
                        nameOfProduct: e.SingleItemPageObj.name,
                        qty: e.qty,
                        date:new Date().toDateString(),
                        time:new Date().toLocaleTimeString(),
                        phoneNum:counter.paymentDetails.phoneNum,
                        address:counter.paymentDetails.address,
                        pincode:counter.paymentDetails.pincode,
                        cardNum:result.paymentMethod.card.last4
                    }
                    arr.push(obj)
                })

                let isProductFromCart = counter.isProductFromCart

                setProgress(70)


                await axios.post(`${process.env.REACT_APP_SERVER_URL}/addToOrders`, {
                    cookieVal, arr, isProductFromCart
                })
                    .then(res => {
                        if (res.data == "outOfStock") {
                            toast.error("Some items are out of stock")

                        }
                        else if (res.data == "pass") {
                            toast.success("Payment Successfull")
                            navigate("/orders")

                        }
                        else if (res.data == "fail") {
                            toast.error("Somethig went wrong!");

                        }
                    })
                    .catch(e => {
                        toast.error("Somethig went wrong!");
                    })
            }
        }
        catch (e) {
            toast.error("Something went wrong!")
        }
        setProgress(100)
    };


    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                fontSize: '20px',

            }
        }
    };

    return (
        <div className='grid place-items-center'>
            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />



            <h1 className='font-bold text-3xl my-5 text-center'>Enter your Card Details :</h1>


            <form onSubmit={handleSubmit} className='mb-10 w-[98vw] lg:w-[60vw] grid place-items-center'>
                <img className='w-4/12 lg:w-3/12 my-3  mr-auto ' src={require("./Images/card_accept.jpg")} alt="" />
                <div className='p-3 border border-gray-500 rounded  w-[98vw] lg:w-[60vw]'>

                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                <input type="submit" className="my-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" value={`Pay ₹ ${counter.SmallCartPreviewTotal}.00`} />
            </form>

            <SmallCartPreview />

        </div>
    );
};

export default PaymentForm;
