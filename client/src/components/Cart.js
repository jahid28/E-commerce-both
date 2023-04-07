import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index.js'

export default function Cart() {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [progress, setProgress] = useState(0)

  const { isProductFromCart, SingleItemPageObj, SmallCartPreviewArr, SmallCartPreviewTotal } = bindActionCreators(actionCreators, useDispatch())
  // const counter = useSelector(state => state.counter)


  const getItemsFromCart = async (e) => {


    setProgress(20)
    const cookieVal = Cookies.get("email")

    try {
      setProgress(50)

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/getItemsFromCart`, {
        cookieVal
      })
        .then(res => {
          if (res.data == "noitems") {
            toast.error("Your cart is empty")
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
      // }
    }


    catch (e) {
      toast.error("Somethig went wrong!");


    }
    setProgress(100)

  }


  const deleteItemFromCart = async (e) => {
    setProgress(20)
    const cookieVal = Cookies.get("email")

    try {
      setProgress(50)

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteItemFromCart`, {
        cookieVal, deleteItem
      })
        .then(res => {
          setData(res.data)
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


  const qtyChanged = async (qty, itemName) => {

    const cookieVal = Cookies.get("email")
    setProgress(20)


    try {

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/qtyChanged`, {
        cookieVal, qty, itemName
      })
        .then(res => {
          setData(res.data)
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


  const [deleteItem, setDeleteItem] = useState('')
  const handleButtonClick = (name) => {
    setDeleteItem(name);
  };


  useEffect(() => {
    if (deleteItem != '') {
      deleteItemFromCart()

    }
  }, [deleteItem])


  useEffect(() => {
    getItemsFromCart()
  }, [])

  const [subTotal, setSubTotal] = useState(0)


  useEffect(() => {
    let sum = 0
    data.map((e) => {
      sum = sum + e.qty * e.SingleItemPageObj.price
    })
    setSubTotal(sum)
  }, [data])



  const goToProductPage = (index) => {
    SingleItemPageObj({
      name: data[index].SingleItemPageObj.name,
      type: data[index].SingleItemPageObj.type,
      img: data[index].SingleItemPageObj.img,
      price: data[index].SingleItemPageObj.price,
      stocks: data[index].SingleItemPageObj.stocks,
      allRatings: data[index].SingleItemPageObj.allRatings,
      reviews: data[index].SingleItemPageObj.reviews
    })
    navigate("/singleitempage")
  };


  const decQty = (name) => {
    const index = data.findIndex((obj) => obj.SingleItemPageObj.name == name);
    let updatedQty = data[index].qty - 1
    let itemName = data[index].SingleItemPageObj.name

    qtyChanged(updatedQty, itemName)

  };
  const incQty = (name) => {
    const index = data.findIndex((obj) => obj.SingleItemPageObj.name == name);
    let updatedQty = data[index].qty + 1
    let itemName = data[index].SingleItemPageObj.name

    qtyChanged(updatedQty, itemName)
  };

  const [isAnyItemOutOfStock, setIsAnyItemOutOfStock] = useState(false)


  useEffect(() => {
    const found = data.some(e => e.SingleItemPageObj.stocks == 0);
    setIsAnyItemOutOfStock(found);
  }, [data])


  const goToAddress = () => {

    if (isAnyItemOutOfStock) {
      toast.error("Some items in your cart are out of stock")
    }
    else {
      SmallCartPreviewArr(data)
      isProductFromCart(true)
      SmallCartPreviewTotal(subTotal)
      navigate("/address")
    }
  }


  return (
    <div>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />



      {
        data.length > 0 ?
          <div>
            <h1 className=' text-3xl font-bold mt-3 ml-3 text-center mb-10'>Your Cart</h1>

            {data.map((e, index) => (
              <div key={e.id} className=' my-3'>
                <section className="text-gray-600 w-[95vw] my-3 flex   body-font overflow-hidden   mx-auto">
                  <div className='w-3/12 mr-3   grid place-items-center'>
                    <img onClick={() => goToProductPage(index)} alt="ecommerce" className="cursor-pointer items-center w-fit object-cover object-center rounded" src={e.SingleItemPageObj.img[0]} />
                  </div>
                  <div className=" w-8/12 flex-col flex">
                    <h2 className="text-xs lg:text-lg text-gray-500 tracking-widest">Type : {e.SingleItemPageObj.type}</h2>
                    <h1 onClick={() => goToProductPage(index)} className="cursor-pointer hover:text-pink-500 w-fit text-gray-900 text-lg lg:text-2xl title-font font-medium mb-1">{e.SingleItemPageObj.name}</h1>

                    {
                      e.SingleItemPageObj.stocks > 0 ? <p className="mt-1 text-white bg-green-500 w-fit px-2 rounded-lg">In Stock</p> : <p className="mt-1 text-white bg-red-500 w-fit px-2 rounded-lg">Out of Stock</p>

                    }

                    <div className="flex my-2 ">
                      <button disabled={e.qty <= 1 ? true : false} onClick={() => decQty(e.SingleItemPageObj.name)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   text-xl px-2 text-center inline-flex items-center mx-2  ">-</button>
                      <p className='font-sans '>Qty : {e.qty}</p>
                      <button disabled={e.qty >= e.SingleItemPageObj.stocks ? true : false} onClick={() => incQty(e.SingleItemPageObj.name)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   text-xl px-2 text-center  items-center mx-2">+</button>
                    </div>
                    <div className="flex mt-auto">
                      <span className="title-font font-medium text-xl lg:text-2xl text-gray-900">₹ {e.SingleItemPageObj.price}.00</span>
                      <button onClick={() => handleButtonClick(e.SingleItemPageObj.name)} className="  ml-auto text-white bg-gray-400  py-0 px-4 focus:outline-none hover:bg-gray-600 rounded">Delete</button>
                    </div>
                  </div>
                </section>
                <hr className=' border-gray-500' />
              </div>


            ))}

            <div className="my-6 flex flex-wrap  items-center">
              <h2 className='font-semibold text-xl ml-3 mr-3'>Your Subtotal : ₹ {subTotal}.00</h2>
              <button onClick={goToAddress} className=" text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Buy</button>
            </div>
          </div>
          :

          <div className='w-full  grid place-items-center lg:flex'>
            <h2 className='w-6/12 text-center lg:w-4/12 my-3 lg:my-0 lg:ml-4 font-bold text-xl lg:text-5xl'>Your cart is empty</h2>

            <img className='w-6/12' src={require('./Images/empty-freepik (1).jpg')} alt="" />

          </div>
      }





    </div>
  )
}
