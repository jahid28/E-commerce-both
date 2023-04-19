import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard.js';
import { useDispatch, useSelector } from 'react-redux'
// import { query } from 'express';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";


export default function SearchPage() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const query = (useSelector(state => state.counter)).searchQuery


    async function search(e) {
        // e.preventDefault();
        try {

            await axios.post(`${process.env.REACT_APP_SERVER_URL}/search`, {
                query
            })
                .then(res => {
                    setLoading(false)
                    setData(res.data)
                })
                .catch(e => {
                    toast.error("Something went wrong!");
                })



        }
        catch (e) {
            toast.error("Something went wrong!");

        }


    }

    useEffect(() => {
        setLoading(true)
        search()
    }, [query])
  

 
    if (query == "") {
        return (
            <div className='w-full grid place-items-center lg:flex'>
                <h2 className='w-6/12 lg:w-4/12 my-3 lg:my-0 lg:ml-4 font-bold text-xl lg:text-5xl'>No Results Found</h2>

                <img className='w-6/12' src={require('./Images/noresult-freepik (1).jpg')} alt="" />

            </div>
        )
    }
    else if (loading) {
        return (
            <div className='flex justify-center w-full my-20'>
                <PulseLoader
                    color='rgb(74, 87, 224)'
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }
    else if (data.length == 0) {

       return(
        <div className='w-full grid place-items-center lg:flex'>
        <h2 className='w-6/12 lg:w-4/12 my-3 lg:my-0 lg:ml-4 font-bold text-xl lg:text-5xl'>No Results Found</h2>

        <img className='w-6/12' src={require('./Images/noresult-freepik (1).jpg')} alt="" />

    </div>
       )

    }
    else {
        return (
            <section className="text-gray-600 body-font ">
            
                <div className="container px-5 py-24 mx-auto  ">

                    <div className="flex flex-wrap -m-4  ">

                        {
                            data.map((item) => (<div className='lg:w-1/4 md:w-1/2 p-2 scale-95 my-4 w-full  rounded-lg shadow-md cursor-pointer hover:shadow-2xl' key={item._id}><ItemCard name={item.name} type={item.type} price={item.price} stocks={item.stocks} img={item.img} allRatings={item.allRatings} reviews={item.reviews} /></div>))
                        }

                    </div>
                </div>
            </section>

        )

    }
}
