import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import axios from 'axios';
// import Stats from './Stats.js';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default function MyAccount() {
    const [cookieValue, setCookieValue] = useState(Cookies.get('email'));
    const [name, setName] = useState('');
    const [progress, setProgress] = useState(0)


    const submit = async (e) => {
        // e.preventDefault();

        try {

            await axios.post(`${process.env.REACT_APP_SERVER_URL}/myaccount`, {
                cookieValue
            })
                .then(res => {
                    setName(res.data)


                })
                .catch(e => {
                })
        }


        catch (e) {

        }



    }
    useEffect(() => {
        submit()

    }, [cookieValue])

    const logOut = () => {
        setProgress(100)
        Cookies.remove('email')
    }

    return (
        <div>
            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <section className="text-gray-600 grid place-items-center mt-6 mb-6 ">
                <h1 className="title-font sm:text-4xl  text-3xl mb-4 font-medium text-gray-900">Hello 👋 {name}</h1>
                <p className="mb-8 leading-relaxed">Your Email : {cookieValue}</p>
                <div className="p-4  w-full flex flex-wrap justify-center">
                
                    <Link to='/orders' className='cursor-pointer  w-fit m-4 hover:shadow-lg border-2 text-center  border-gray-200 px-4 py-2 lg:py-6 lg:px-10 rounded-lg'>
                            <i className="fa-solid fa-box text-3xl lg:text-5xl"></i>
                            <h2 className="title-font font-medium text-lg lg:text-2xl mt-4 text-gray-900">Your Orders</h2>
                    </Link>
                    <Link to='/cart' className='cursor-pointer  w-fit m-4 hover:shadow-lg border-2 text-center  border-gray-200 px-4 py-2 lg:py-6 lg:px-10 rounded-lg'>
                            <i className="fa-solid fa-cart-shopping text-3xl lg:text-5xl"></i>
                            <h2 className="title-font font-medium text-lg lg:text-2xl mt-4 text-gray-900">Your Cart</h2>
                    </Link>
                    <Link to='/contact' className='cursor-pointer  w-fit m-4 hover:shadow-lg border-2 text-center  border-gray-200 px-4 py-2 lg:py-6 lg:px-10 rounded-lg'>
                            <i className="fa-solid fa-user text-3xl lg:text-5xl"></i>
                            <h2 className="title-font font-medium text-lg lg:text-2xl mt-4 text-gray-900">Contact Us</h2>
                    </Link>

                </div>

                <button onClick={logOut} className="ml-4  text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Log Out</button>
            </section>


        </div>
    )
}
