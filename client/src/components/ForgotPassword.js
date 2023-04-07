import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import LoadingBar from 'react-top-loading-bar'

export default function ForgotPassword() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const digits = '0123456789';

  const handleOtpChange = (event) => {
    setOtpValue(event.target.value);
  };


  const sendEmail = async (e) => {
    setProgress(20)
    e.preventDefault();

    try {

      if (!captchaValue) {
        toast.error("Fill the Captcha")

      }
      else {


        let OTP = '';
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        setOtp(OTP);

        setProgress(50)

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/sendEmail`, { email, OTP })
          .then(res => {
            if (res.data == 'pass') {
              toast.success("Code sent to the email")
              setShowPopup(true)
            }
            else if (res.data == 'notexist') {
              toast.error("User not found! Please sign up")
            }
            else if (res.data == 'fail') {
              toast.error("Something went wrong")
            }
          })
          .catch(e => {
            toast.error("Something went wrong")
          })
          setProgress(70)
        }
      }

      
      catch (e) {
      toast.error("Something went wrong")

    }
    setProgress(100)
  }


  const otpCheck = () => {
    if (otp != otpValue) {
      toast.error("Invalid Code")
    }
    else {
      Cookies.set("resetEmail", email)
      navigate("/resetpassword")
    }
  }

  return (
    <div>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {showPopup && (
        <div className="z-20 fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Enter Code</h2>

            </div>
            <div className="flex justify-center items-center">
              <input
                type="text"
                maxLength="6"
                value={otpValue}
                onChange={handleOtpChange}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full text-center text-lg font-semibold"
              />
            </div>
            <p className="text-md mt-4">Enter the 6-digit code sent to your Email.</p>
            <button onClick={otpCheck} className="mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" >Submit</button>
          </div>
        </div>
      )}


      <form onSubmit={sendEmail} className='mb-4' >
        <section className="text-gray-600 mt-14 body-font grid place-items-center  relative  ">

          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col   mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-2xl mb-5 font-medium title-font">Forgot Password</h2>

            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} required type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

            <ReCAPTCHA
              sitekey={`${process.env.REACT_APP_RECAPTCHA}`}
              onChange={(value) => setCaptchaValue(value)}
            />


            <input className="mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit" value={"Submit"} />
            <p className="text-base text-blue-700 mt-3"><Link to={"/login"}>Login</Link> </p>

          </div>
        </section>

      </form>
    </div>
  )
}
