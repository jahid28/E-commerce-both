import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function SmallCartPreview(props) {

    const counter = useSelector(state => state.counter)
    return (
        <div >

            <h2 className='font-bold text-center text-lg lg:text-2xl mt-3 mb-8'>Your Order's Preview : </h2>

            {counter.SmallCartPreviewArr.map((e) => (

                <div className=' my-3 '>
                    <section className="text-gray-600 w-full my-3 flex body-font overflow-hidden   mx-auto">
                        <div className='w-2/12  mr-3    grid place-items-center'>
                            <img alt="ecommerce" className=" items-center w-fit object-cover object-center rounded" src={e.SingleItemPageObj.img[0]} />
                        </div>
                        <div className="  w-10/12 flex-col flex">
                            <h1 className="w-fit  text-gray-900 text-sm lg:text-lg  title-font font-medium ">{e.SingleItemPageObj.name}</h1>
                            <div className="flex   ">
                                <p className='font-sans '>Qty : {e.qty}</p>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-sm lg:text-lg text-gray-900">₹ {e.SingleItemPageObj.price}.00</span>
                            </div>
                        </div>
                    </section>
                    <hr className=' border-gray-500' />
                </div>

            ))}

            <h2 className='font-semibold text-base lg:text-xl ml-3 my-2'>Your Subtotal : ₹ {counter.SmallCartPreviewTotal}.00</h2>

        </div>
    )
}
