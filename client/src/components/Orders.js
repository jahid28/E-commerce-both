import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
// useState
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index.js'
export default function Orders() {
  const [progress, setProgress] = useState(0)
  const [data, setData] = useState([])
  const cookieVal = Cookies.get("email")
  const navigate = useNavigate()
  const {  SingleOrderPageObj} = bindActionCreators(actionCreators, useDispatch())


  const getItemsFromOrderCollection = async (e) => {


    setProgress(20)
    // e.preventDefault();
    const cookieVal = Cookies.get("email")

    try {
      setProgress(50)

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/getItemsFromOrderCollection`, {
        cookieVal
      })
        .then(res => {
          if (res.data == "noitems") {
            toast.error("You donot have any orders")
          }
          else if (res.data == "fail") {
            toast.error("Something went wrong");
          }
          else {
            setData(res.data)
          }


          setProgress(70)
        })
        .catch(e => {
          toast.error("Somethig went wrong!");
        })
    }


    catch (e) {
      toast.error("Somethig went wrong!");


    }
    setProgress(100)

  }

  useEffect(() => {
    getItemsFromOrderCollection()
  }, [])

  const [productName, setProductName] = useState('')
  const [selectedOption, setSelectedOption] = useState(1)

  const [reviewPopup, setReviewPopup] = useState(false)
  const [ratingPopup, setRatingPopup] = useState(false)
  const [review, setReview] = useState('')
  const [rating, setRating] = useState('')

  const submitReview = async (e) => {
    if(review==''){
      toast.error("Review cannot be empty")
      return
    }
    setProgress(20)
    // e.preventDefault();
    const cookieVal = Cookies.get("email")

    try {
      setProgress(50)

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/submitReview`, {
        cookieVal, review, productName
      })
        .then(res => {
          if (res.data == "pass") {
            toast.success("Review added")
            getItemsFromOrderCollection()
            setReviewPopup(false)
          }

          else {
            toast.error("Something went wrong");
          }


          setProgress(70)
        })
        .catch(e => {
          toast.error("Somethig went wrong!");
        })
    }


    catch (e) {
      toast.error("Somethig went wrong!");


    }
    setProgress(100)

  }
  const submitRating = async (e) => {
    setProgress(20)
    // e.preventDefault();
    const cookieVal = Cookies.get("email")

    try {
      setProgress(50)

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/submitRating`, {
        cookieVal, selectedOption, productName
      })
        .then(res => {
          if (res.data == "pass") {
            toast.success("Rating submitted")
            getItemsFromOrderCollection()
            setRatingPopup(false)

          }

          else {
            toast.error("Something went wrong");
          }


          setProgress(70)
        })
        .catch(e => {
          toast.error("Somethig went wrong!");
        })
    }


    catch (e) {
      toast.error("Somethig went wrong!");


    }
    setProgress(100)

  }

  const goToSingleOrderPage = (index) => {
    SingleOrderPageObj({
      name: data[index].SingleItemPageObj.name,
      type: data[index].SingleItemPageObj.type,
      img: data[index].SingleItemPageObj.img,
      price: data[index].SingleItemPageObj.price,
      date: data[index].date,
      time: data[index].time,
      qty: data[index].qty,
      phoneNum: data[index].phoneNum,
      address: data[index].address,
      pincode: data[index].pincode,
      cardNum: data[index].cardNum
    })
    navigate("/singleorderpage")
  };
 

  return (
    <div>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {reviewPopup && (
        <div className=" z-20 fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[90vw] sm:w-[70vw] lg:w-[50vw] rounded-lg p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Enter a Review</h2>
              <i onClick={() => { setReviewPopup(false) }} class="cursor-pointer fa-regular fa-circle-xmark text-2xl"></i>
            </div>
            <div className="flex justify-center items-center">
              <textarea onChange={(e) => { setReview(e.target.value) }} placeholder='Text' className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full text-center text-lg font-semibold"></textarea>
            </div>
            <button onClick={submitReview} className="mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" >Submit</button>
          </div>
        </div>
      )}
      {ratingPopup && (
        <div className=" z-20 fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[90vw] sm:w-[70vw] lg:w-[50vw] rounded-lg p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Rate the product</h2>
              <i onClick={() => { setRatingPopup(false) }} class="cursor-pointer fa-regular fa-circle-xmark text-2xl"></i>
            </div>
            <select value={selectedOption} onChange={(e) => { setSelectedOption(e.target.value) }} className="flex text-xl justify-center items-center border border-black rounded ">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <button onClick={submitRating} className="mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" >Submit</button>
          </div>
        </div>
      )}




      {
        data.length > 0 ?
          <div>
            <h1 className='text-3xl font-bold mt-3 ml-3 text-center mb-10'>Your Orders</h1>

            {data.map((e, index) => (
              <div key={e.id} className=' my-3'>
                <section className="text-gray-600 w-[95vw] my-3 flex   body-font overflow-hidden   mx-auto">
                  <div className='w-3/12 lg:w-2/12 mr-3   grid place-items-center'>
                    <img onClick={() => goToSingleOrderPage(index)}  alt="ecommerce" className="cursor-pointer items-center w-fit object-cover object-center rounded" src={e.SingleItemPageObj.img[0]} />
                  </div>
                  <div className=" w-8/12 flex-col flex">
                    {/* <h2 className="text-xs lg:text-lg text-gray-500 tracking-widest">Type : {e.SingleItemPageObj.type}</h2> */}
                    <h1 onClick={() => goToSingleOrderPage(index)} className="cursor-pointer w-fit text-gray-900 hover:text-indigo-500 text-lg lg:text-2xl title-font font-medium mb-1">{e.SingleItemPageObj.name}</h1>


                    <p className='font-sans '>Ordered on {e.date} at {e.time}</p>
                    {/* <p className='font-sans '>Qty : {e.qty}</p> */}

                    <div className="lg:flex mt-auto ">
                      {/* <span className="title-font font-medium text-xl lg:text-2xl text-gray-900">Total Payment was : ₹ {(e.qty) * (e.SingleItemPageObj.price)}.00</span> */}

                      {e.SingleItemPageObj.reviews.length == 0 ?

                        <p onClick={() => { setReviewPopup(true); setProductName(e.SingleItemPageObj.name) }} className='cursor-pointer my-3 lg:my-0 w-fit text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Add a Review</p>
                        :

                        e.SingleItemPageObj.reviews.find(obj => obj.name == cookieVal) ? <p className='my-3 lg:my-0  text-white bg-gray-500 border-0 py-2 px-6 w-fit focus:outline-none  rounded text-lg'>Review submitted</p>

                          :
                          <p onClick={() => { setReviewPopup(true); setProductName(e.SingleItemPageObj.name) }} className='my-3 lg:my-0   cursor-pointer text-white  bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Add a Review</p>

                      }

                      {e.SingleItemPageObj.allRatings.length == 0 ?

                        <p onClick={() => { setRatingPopup(true); setProductName(e.SingleItemPageObj.name) }} className='w-fit ml-4  cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Rate the product</p>
                        :

                        e.SingleItemPageObj.allRatings.find(obj => obj.name == cookieVal) ? <p className='w-fit text-white ml-4 bg-gray-500 border-0 py-2 px-6 focus:outline-none  rounded text-lg'>Product rated</p>

                          :
                          <p onClick={() => { setRatingPopup(true); setProductName(e.SingleItemPageObj.name) }} className=' w-fit ml-4 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Rate the product</p>

                      }



                      {/* <button onClick={() => { setRatingPopup(true) }} className='ml-4 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Rate the product</button> */}

                      {/* <button onClick={() => submitReview(index)} className='ml-auto  cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Add a Review</button>
                      <button onClick={() => submitRating(index)} className='ml-4 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Rate the product</button> */}
                    </div>
                  </div>
                </section>
                <hr className=' border-gray-500 ' />
              </div>


            ))}
          </div>
          :

          <div className='w-full grid place-items-center lg:flex'>
            <h2 className='w-6/12 text-center lg:w-4/12 my-3 lg:my-0 lg:ml-4 font-bold text-xl lg:text-5xl'>No Orders Yet</h2>

            <img className='w-6/12' src={require('./Images/noorders-freepik (1).jpg')} alt="" />

          </div>
      }

    </div>
  )
}
