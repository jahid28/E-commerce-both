import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function SingleItemPage(props) {
    const counter = useSelector(state => state.counter)

    const SingleOrderPageObj = counter.SingleOrderPageObj




    return (
        <div>


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
