import React, { useState, useEffect, useRef } from 'react';
import randomstring from 'randomstring';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
// import jwt from 'jsonwebtoken'
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom"

export default function Signup() {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState('');
  const [inp, setInp] = useState('');

  useEffect(() => {
    setCaptchaText(randomstring.generate(6));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontSize = 35;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(captchaText, 40, 40);

    for (let i = 0; i < 5; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const endX = Math.random() * width;
      const endY = Math.random() * height;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }, [captchaText]);



  const history = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const submit = async (e) => {
    e.preventDefault();

    try {

      if (formData.password != formData.cpassword) {
        toast.error("Password is not same");
      }
      else if (formData.password.length < 6) {
        toast.error("Password must be atleast 6 characters")

      }
      else if (inp != captchaText) {
        toast.error("Invalid Captcha");
      }
      else {

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
          formData
        })
          .then(res => {
            if (res.data == "exist") {
              toast.error("Email is already registered");

            }
            else if (res.data == "notexist") {

              Cookies.set("email", formData.email, { expires: 7 })
              if (Cookies.get("allProducts") != undefined || Cookies.get("allProducts") != null) {
                Cookies.remove("allProducts")
              }


              toast.success("Successfully Registered", {
                autoClose: 1000
              });
              setTimeout(() => {
                history("/login")
              }, 2000)

            }
          })
          .catch(e => {
            toast.error("Somethig went wrong!");
          })
        }
        
    }
    catch (e) {
        toast.error("Somethig went wrong!");

    }

  }

  return (
    <div className='mb-6' >
      <form method='/signup' action="POST" onSubmit={submit} >
        <section className="text-gray-600 mt-14 body-font grid place-items-center  relative  ">

          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-2xl mb-5 font-medium title-font">Sign Up</h2>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">Name</label>
              <input value={formData.name} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input value={formData.email} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">Password</label>
              <input value={formData.password} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">Comfirm Password</label>
              <input value={formData.cpassword} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

            <label htmlFor="userInput">Enter the Captcha shown below :</label>
            <input value={inp} type="text" className="mt-2 mb-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => { setInp(e.target.value) }} required />
            <canvas ref={canvasRef} width="200" height="50" className='mt-2 mb-2 w-52 border border-black' />

            <input className="cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit" value={"Submit"} />
            <p className="text-base text-gray-500 mt-3">Already have an account? </p>
            <p className="text-base text-blue-700 mt-3"><Link to={"/login"}>Login</Link> </p>

          </div>
        </section>

      </form>



    </div>
  )
}
