import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import Cookies from "js-cookie";

import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index.js'
import ReactImageMagnify from 'react-image-magnify';
// import 'react-image-magnify/dist/styles.css';
// import 'react-image-magnify/dist/styles.css';
// import 'node_modules/react-image-magnify/dist/styles.css';

import { Magnifier } from 'react-image-magnifiers';



export default function SingleItemPage(props) {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)
    const { decCounter, incCounter, SmallCartPreviewArr, SmallCartPreviewTotal, isProductFromCart } = bindActionCreators(actionCreators, useDispatch())
    const counter = useSelector(state => state.counter)

    const SingleItemPageObj = counter.SingleItemPageObj
    // alert(SingleItemPageObj.type)

    const imgArr = SingleItemPageObj.img
    const [bigImage, setBigImage] = useState((SingleItemPageObj.img)[0])

    const imgChange = (e) => {
        setBigImage(e.target.getAttribute("src"))
    }



    const addToCart = async (e) => {
        if (SingleItemPageObj.stocks == 0) {
            toast.error("Product is out of stock")
            return
        }
        setProgress(20)

        try {
            let qty = counter.number
            const cookieVal = Cookies.get("email")
            const nameOfProduct = SingleItemPageObj.name
            setProgress(50)

            if (cookieVal == undefined || cookieVal == null) {
                toast.error("You need to login first");
                setProgress(70)
            }
            else {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/addToCart`, {
                    cookieVal, nameOfProduct, qty
                })
                    .then(res => {
                        if (res.data == "pass") {
                            toast.success("Product added to the cart");
                        }
                        else if (res.data == "alreadyAdded") {
                            toast.warn("Product already added");
                        }
                        else if (res.data == "fail") {
                            toast.error("Something went wrong");
                        }

                        setProgress(70)
                    })
                    .catch(e => {
                        toast.error("Somethig went wrong!");
                    })
            }
        }


        catch (e) {
            toast.error("Somethig went wrong!");


        }
        setProgress(100)

    }
    useEffect((e) => {
        setProgress(100)
    }, [])

    const goToAddress = () => {
        setProgress(20)
        const cookieVal = Cookies.get("email")

        if (cookieVal == undefined || cookieVal == null) {
            toast.error("You need to login first");
        }
        else if (SingleItemPageObj.stocks == 0) {
            toast.error("Product is out of stock")
        }
        else {
            SmallCartPreviewArr([{ SingleItemPageObj, qty: counter.number }])
            isProductFromCart(false)
            SmallCartPreviewTotal(SingleItemPageObj.price * counter.number)
            navigate("/address")
        }
        setProgress(100)
    }

    let totalRating
    let sum = 0

    SingleItemPageObj.allRatings.map((e) => {
        sum += e.rating
    })

    sum != 0 ? totalRating = sum / SingleItemPageObj.allRatings.length : totalRating = 0




    return (
        <div>
            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />



            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto ">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap ">
                        <div className='lg:w-1/2 flex flex-wrap w-full lg:h-auto '>
                            <div className='lg:w-1/12 flex flex-wrap mb-4 lg:mr-3'>
                                {
                                    imgArr.length > 0 ?
                                        imgArr.map((e) => (
                                            <div>
                                                <img onMouseOver={imgChange} className='w-9  h-11 mr-4 lg:w-12 object-contain object-center border border-black rounded-md hover:shadow-md hover:shadow-indigo-500 cursor-pointer' src={e} alt="" />
                                            </div>
                                        ))

                                        :
                                        <p>Load</p>
                                }


                            </div>
                            <div className=' lg:w-10/12 w-full h-[40vh] lg:h-[80vh] border border-black flex justify-center'>
                                <img alt="ecommerce" className=" object-contain h-full rounded " src={bigImage} />


                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Type : {SingleItemPageObj.type}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{SingleItemPageObj.name}</h1>

                            <h2 className="text-lg font-semibold  tracking-widest">Rating : {totalRating}/5<i class="text-yellow-400 fa-solid fa-star mr-2"></i>     ({SingleItemPageObj.allRatings.length} ratings) </h2>


                            <div className=" my-3 w-full flex">
                                <div className=" border-2 border-gray-600 w-5/12 grid place-items-center rounded-lg">
                                    <i className="fa-solid fa-truck-fast text-5xl  mt-2"></i>
                                    <h2 className=" text-center title-font font-medium text-lg mt-2 text-gray-900">Free delivery</h2>
                                </div>
                                <div className="ml-4 border-2 border-gray-600 w-5/12 grid place-items-center rounded-lg">
                                    <i className="fa-solid fa-box text-5xl  mt-2 "></i>
                                    <h2 className=" text-center title-font font-medium text-lg mt-2 text-gray-900">Best quality product</h2>
                                </div>
                            </div>

                            {
                                SingleItemPageObj.stocks > 0 ? <p className="mt-1 text-white bg-green-500 w-fit px-2 rounded-lg">In Stock</p> : <p className="mt-1 text-white bg-red-500 w-fit px-2 rounded-lg">Out of Stock</p>

                            }
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">



                                <div className="flex my-2 ">
                                    <button disabled={counter.number <= 1 ? true : false} onClick={() => { decCounter(1) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   text-xl px-2 text-center inline-flex items-center mx-2  ">-</button>
                                    <p className='font-sans '>Qty : {counter.number}</p>
                                    <button disabled={counter.number >= SingleItemPageObj.stocks ? true : false} onClick={() => { incCounter(1) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   text-xl px-2 text-center  items-center mx-2">+</button>
                                </div>

                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">Rs. {SingleItemPageObj.price}.00</span>
                                <div className='items-center ml-auto mr-4 '>
                                    <button onClick={addToCart} className=" items-center mb-2 w-full text-center flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart <i className="ml-3 fa-solid fa-cart-shopping "></i></button>
                                    <button onClick={goToAddress} className=" flex w-full text-center  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className=' ml-4 mb-4'>

                {(SingleItemPageObj.reviews).length != 0 ?



                    <div>
                        <p className='text-3xl font-semibold'>All Reviews : </p>
                        {
                            (SingleItemPageObj.reviews).map((e) => (
                                <div className='my-4'>
                                    <p className='text-sm text-gray-500'>~{e.name}</p>
                                    <p className='text-xl'>{e.message}</p>
                                    <hr className='border-gray-500' />
                                </div>
                            ))
                        }
                    </div>

                    :
                    <p className='text-3xl font-semibold'>No Reviews yet </p>

                }

            </div>

        </div>
    )
}
