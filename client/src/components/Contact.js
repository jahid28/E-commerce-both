import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
export default function Contact() {
    const [state, handleSubmit] = useForm(`${process.env.REACT_APP_FORMSPREE}`);
    if (state.succeeded) {
        return <div className='suceed'>
            <div>
                <p className='text-3xl text-center mx-auto mt-11 py-2 px-8'>Your message was submitted successfully.</p>
                <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><Link to='/'>Go Back </Link> </button>
            </div>
        </div>;
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >

                <section class="text-gray-600 body-font relative">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="flex flex-col text-center w-full mb-12">
                            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                        </div>
                        <div class="lg:w-1/2 md:w-2/3 mx-auto">
                            <div class="flex flex-wrap -m-2">
                                <div class="p-2 w-1/2">
                                    <div class="relative">
                                        <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                        <input required type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
                                    <div class="relative">
                                        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                                        <input required type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-full">
                                    <div class="relative">
                                        <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                                        <textarea required id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                    </div>
                                </div>
                                <div class="p-2 w-full">
                                    <button type='submit' class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>
            </form>


        </div>
    )
}
