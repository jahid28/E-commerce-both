import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";
import LoadingBar from 'react-top-loading-bar'

export default function AdminAccount() {
  const [progress, setProgress] = useState(0)

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: null,
    stocks: null
  });

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);


  function isValidUrl(text) {
    // Regular expression to match a URL pattern
    const urlRegex = /^(https?|ftp|file):\/\/\S+$/i;
    return urlRegex.test(text);
  }

  async function submit(e) {
    e.preventDefault();

    if (messages.length == 0) {
      toast.error("Atleast one product image is required")
    }
    else {


      try {
        await axios.post("http://localhost:8000/adminUpdate", {
          formData, messages

        })
          .then(res => {
            if (res.data == "pass") {
              toast.success("Product added successfully");
            }
            else if (res.data == "fail") {
              toast.error("Something went wrong!");
            }
          })
          .catch(e => {
            toast.error("Something went wrong carch!");

            console.log(e);
          })

      }
      catch (e) {
        console.log(e);

      }
      setFormData({ name: '', price: '', stocks: '', type: '' }); // clear form fields

      setMessage('')
      setMessages([])
    }

  }



  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const urlSend = (event) => {
    if (message == '') {
      toast.warn("URL cannot be empty");

    }
    else if (!isValidUrl(message)) {
      toast.error("It is not a valid URL");

    }
    else if (messages.length >= 6) {
      toast.error("Max 6 images are allowed");

    }
    else {

      setMessages([message, ...messages]);
      setMessage('');
    }
  };

  const handleDelete = (index) => {

    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };
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

      <h1 className='text-3xl text-center mt-6'>Admin Account</h1>


      <form method='/adminUpdate' action="POST" onSubmit={submit}  >
        <section className="text-gray-600  mt-6 body-font grid place-items-center  relative  ">

          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col   mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-2xl mb-5 font-medium title-font">Add a product here :</h2>

            <div className="relative mb-4">
              <label for="name" className="leading-7 text-sm text-gray-600">Name of the product</label>
              <input value={formData.name} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="text" id="text" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label for="type" className="leading-7 text-sm text-gray-600">Product Type</label>
              <input value={formData.type} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="text" id="text" name="type" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label for="price" className="leading-7 text-sm text-gray-600">Price in Rupees</label>
              <input value={formData.price} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="number" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label for="stocks" className="leading-7 text-sm text-gray-600">Number of stocks</label>
              <input value={formData.stocks} onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })} required type="number" name="stocks" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label for="img" className="leading-7 text-sm text-gray-600">Enter image URL</label>
              <input value={message} onChange={handleChange} type="text" name="img" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>


            <button type='button' className="cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={urlSend} >Give the image URL</button>

            <br />
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg}
                  <button type='button' className='ml-2' onClick={() => handleDelete(index)}><i className="fa-solid fa-trash-can"></i></button>
                  <br />
                  <br />
                </div>
              ))}
            </div>


            <input className="cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit" value={"Submit"} />

          </div>
          <button onClick={logOut} class="mb-4 mt-4  text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Log Out</button>

        </section>
      </form>



    </div>
  )
}
