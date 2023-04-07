import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index.js'

export default function ItemCard(props) {

    const { SingleItemPageObj } = bindActionCreators(actionCreators, useDispatch())
    const counter = useSelector(state => state.counter)


    const navigate = useNavigate()

    const itemClicked = () => {
        counter.number = 1
        SingleItemPageObj({
            name: props.name,
            type: props.type,
            img: props.img,
            price: props.price,
            stocks: props.stocks,
            allRatings: props.allRatings,
            reviews: props.reviews
        })
        navigate("/singleitempage")
    }

    return (
        <div className="" onClick={itemClicked}>

            <a className="flex  relative h-48 justify-center rounded overflow-hidden">
                <img alt="ecommerce" className=" object-contain w-full h-full block " src={`${(props.img)[0]}`} />
            </a>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Type : {props.type}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{props.name} </h2>
                <p className="mt-1">₹ {props.price}.00</p>

                {
                    props.stocks > 0 ? <p className="mt-1 text-white bg-green-500 w-fit px-2 rounded-lg">In Stock</p> : <p className="mt-1 text-white bg-red-500 w-fit px-2 rounded-lg">Out of Stock</p>


                }

            </div>
        </div>


    )
}
