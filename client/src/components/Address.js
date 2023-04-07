import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index.js'
import SmallCartPreview from './SmallCartPreview.js';

export default function Address() {
    const navigate = useNavigate()
    const [captchaValue, setCaptchaValue] = useState(null);
    // const counter = useSelector(state => state.counter)
    const { paymentDetails } = bindActionCreators(actionCreators, useDispatch())


    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        pincode: ''
    });
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('')

    useEffect(() => {
        toast.info("We only deliver in India for now!", {
            autoClose: false,

        })
    }, [])

    async function getApi() {
        const response = await fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`);
        const data = await response.json();
        if (data[0].PostOffice != null) {
            setState(data[0].PostOffice[0].Circle)
            setDistrict(data[0].PostOffice[0].District)

        }
    }
    useEffect(() => {

        if (formData.pincode.length == 6) {
            getApi()

        }
        else {
            setState('')
            setDistrict('')

        }

    }, [formData.pincode])

    const submit = (e) => {
        e.preventDefault();
        if (!captchaValue) {
            toast.error("Fill the Captcha")

        }
        else if (formData.phone.length != 10) {
            toast.error("Phone number should be 10 digits long")
        }
        else if (formData.pincode.length != 6 || state.length == 0 || district.length == 0) {
            toast.error("Not a valid pincode")
        }
        else {
            paymentDetails({
                phoneNum:formData.phone,
                address:formData.address,
                pincode:formData.pincode
            })
            navigate("/paymentwrapper")
        }


    }

    return (
        <div className='lg:flex w-full my-3'>
            <form onSubmit={submit} className='lg:w-8/12  text-gray-600  body-font grid place-items-center  '>

                <div className=" lg:w-1/2  md:w-1/2 bg-white rounded-lg p-8 flex flex-col   mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-2xl mb-5 font-medium title-font">Delivery Details : </h2>

                    <div className="relative mb-4">
                        <label for="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
                        <input value={formData.phone} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label for="address" className="leading-7 text-sm text-gray-600">Address</label>
                        <textarea value={formData.address} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <label for="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                        <input value={formData.pincode} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label for="State" className="leading-7 text-sm text-gray-600">State</label>
                        <input value={state} disabled required type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label for="District" className="leading-7 text-sm text-gray-600">District</label>
                        <input value={district} disabled required type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>



                    <ReCAPTCHA
                        sitekey={`${process.env.REACT_APP_RECAPTCHA}`}
                        onChange={(value) => setCaptchaValue(value)}
                    />

                    <input type="submit" className="mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" value="Submit" />
                </div>

            </form>


            <div className='lg:w-4/12 lg:border'>
                <SmallCartPreview />

            </div>

        </div>
    )
}
