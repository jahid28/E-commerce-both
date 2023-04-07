import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import Cookies from "js-cookie";

import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index.js'

export default function SingleItemPage(props) {
    // const navigate = useNavigate()
    // const [progress, setProgress] = useState(0)
    // const { decCounter, incCounter, SmallCartPreviewArr, SmallCartPreviewTotal, isProductFromCart } = bindActionCreators(actionCreators, useDispatch())
    const counter = useSelector(state => state.counter)

    const SingleOrderPageObj = counter.SingleOrderPageObj

    // const imgArr = SingleItemPageObj.img
    // const [bigImage, setBigImage] = useState((SingleItemPageObj.img)[0])

    // const imgChange = (e) => {
    //     setBigImage(e.target.getAttribute("src"))
    // }



    // const addToCart = async (e) => {
    //     if (SingleItemPageObj.stocks == 0) {
    //         toast.error("Product is out of stock")
    //         return
    //     }
    //     setProgress(20)

    //     try {
    //         let qty = counter.number
    //         const cookieVal = Cookies.get("email")
    //         const nameOfProduct = SingleItemPageObj.name
    //         setProgress(50)

    //         if (cookieVal == undefined || cookieVal == null) {
    //             toast.error("You need to login first");
    //             setProgress(70)
    //         }
    //         else {
    //             await axios.post("${process.env.REACT_APP_SERVER_URL}/addToCart", {
    //                 cookieVal, nameOfProduct, qty
    //             })
    //                 .then(res => {
    //                     if (res.data == "pass") {
    //                         toast.success("Product added to the cart");
    //                     }
    //                     else if (res.data == "alreadyAdded") {
    //                         toast.warn("Product already added");
    //                     }
    //                     else if (res.data == "fail") {
    //                         toast.error("Something went wrong");
    //                     }

    //                     setProgress(70)
    //                 })
    //                 .catch(e => {
    //                     toast.error("Somethig went wrong!");
    //                 })
    //         }
    //     }


    //     catch (e) {
    //         toast.error("Somethig went wrong!");


    //     }
    //     setProgress(100)

    // }
    // useEffect((e) => {
    //     setProgress(100)
    // }, [])

    // const goToAddress = () => {
    //     setProgress(20)
    //     const cookieVal = Cookies.get("email")

    //     if (cookieVal == undefined || cookieVal == null) {
    //         toast.error("You need to login first");
    //     }
    //     else if (SingleItemPageObj.stocks == 0) {
    //         toast.error("Product is out of stock")
    //     }
    //     else {
    //         SmallCartPreviewArr([{ SingleItemPageObj, qty: counter.number }])
    //         isProductFromCart(false)
    //         SmallCartPreviewTotal(SingleItemPageObj.price * counter.number)
    //         navigate("/address")
    //     }
    //     setProgress(100)
    // }

    // let totalRating
    // let sum = 0

    // SingleItemPageObj.allRatings.map((e) => {
    //     sum += e.rating
    // })

    // sum != 0 ? totalRating = sum / SingleItemPageObj.allRatings.length : totalRating = 0




    return (
        <div>
            {/* <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            /> */}


            <h2 className='text-center font-extrabold text-3xl my-2'>Order Details</h2>

            <section className=" body-font overflow-hidden">
                <div className="container px-5 py-5 mx-auto ">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap ">
                        <div className='lg:w-1/2 flex flex-wrap w-full lg:h-auto '>
                            <div className='  w-full  border border-black flex justify-center'>
                                <img alt="ecommerce" className=" object-contain h-full rounded " src={SingleOrderPageObj.img[0]} />
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0  ">
                            <h2 className=" title-font text-gray-500 tracking-widest">Type : {SingleOrderPageObj.type}</h2>
                            <h2 className="text-gray-900 text-xl lg:text-3xl title-font font-medium my-2">{SingleOrderPageObj.name}</h2>

                            <h2 className=" ">Qty bought : {SingleOrderPageObj.qty}</h2>
                            <h2 className="title-font font-medium text-xl text-gray-900 my-2">Total payment was : ₹{SingleOrderPageObj.price * SingleOrderPageObj.qty}.00</h2>
                            <h2 className=" my-2">Ordered Date : {SingleOrderPageObj.date}</h2>
                            <h2 className="">Ordered Time : {SingleOrderPageObj.time}</h2>

                            <hr className='border-gray-500' />

                            <div className='my-3'>
                                <h2 className='text-xl font-bold'>Shipping Details</h2>
                                <p className=' '>Address : {SingleOrderPageObj.address}</p>
                                <p className=' '>Pincode : {SingleOrderPageObj.pincode}</p>
                                <p className=' '>Phone number : {SingleOrderPageObj.phoneNum}</p>
                            </div>

                            <hr className='border-gray-500' />


                            <div>
                                <h2 className='text-xl font-bold'>Payment Details</h2>
                                <p>Payment Method : Card</p>
                                <p>Card number : xxxx xxxx xxxx {SingleOrderPageObj.cardNum}</p>

                            </div>

                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
