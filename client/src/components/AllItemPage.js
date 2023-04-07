import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import ItemCard from './ItemCard.js';

export default function AllItemPage(props) {
    const [progress, setProgress] = useState(0)
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('All');
    const [totalPages, setTotalPages] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    // const [count, setCount] = useState(1)
    // setInterval(() => {
    //     setCount(count+1)
        
    // }, 2000);


const URL=process.env.REACT_APP_SERVER_URL || 'http://localhost:8000'

    toast.success(process.env.REACT_APP_SERVER_URL)
    toast.info(selectedOption)



    const typeChange = (event) => {
        event.preventDefault()

        setSelectedOption(event.target.value);

    };



    const typeChangeSubmit = async (e) => {
        setProgress(20)


        try {

            await axios.post(`${URL}/getProducts`, {
                selectedOption
            })
                .then(res => {
                    // setProgress(50)
                    // setTotalPages(12)
                    // const x = res.data
                    // setData(x.allProducts)
                    // setTotalPages(Math.ceil((x.totalItems) / 12))
                    // setPageNum(1)
                    // setProgress(100)
                    if(res.data=="jk"){
                        toast.success('jk')
                    }
                    
                    else{
                        toast.success('nothing')
                    }
                })
                .catch(e => {
                    toast.error("Somethig went wrong!");
                })
            }
            
            
            catch (e) {
            toast.error("Somethig went wrong!");

        }


    }

    useEffect(() => {
        typeChangeSubmit()
    }, [selectedOption])






    const pageChangeSubmit = async (e) => {
        setProgress(20)


        try {

            await axios.post(`${process.env.REACT_APP_SERVER_URL}/pageChange`, {
                selectedOption, pageNum
            })
                .then(res => {
                    setProgress(50)
                    setData(res.data)
                    setProgress(100)

                })
                .catch(e => {
                    toast.error("Somethig went wrong!");
                })
            }


        catch (e) {
            
            toast.error("Somethig went wrong!");
        }


    }

    const prev = () => {
        setPageNum(pageNum - 1)
    }
    const next = () => {
        setPageNum(pageNum + 1)
    }

    useEffect(() => {
        pageChangeSubmit()
    }, [pageNum])




    return (
        <div>

            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <h2 className='font-bold text-base my-2 ml-3 lg:text-3xl lg:my-4' >Search by Categories : </h2>
            <select className='border border-black rounded mb-2 ml-3 lg:text-xl' value={selectedOption} onChange={typeChange} >
                <option >All</option>
                <option >Electronics</option>
                <option >Fashion</option>
                <option >Toys</option>
                <option >Sports</option>
                <option >Kitchen</option>
            </select>

            {/* <h1>count is {count}</h1> */}


            <section className="text-gray-600 body-font ">
                <div className="container px-5 py-12 mx-auto  ">

                    <div className="flex flex-wrap -m-4  ">

                        {

                            data.length > 0 ? (
                                data.map((item) => (<div className='lg:w-1/4 md:w-1/2 p-2 scale-95 my-4 w-full  rounded-lg shadow-md cursor-pointer hover:shadow-2xl' key={item._id}><ItemCard name={item.name} type={item.type} price={item.price} stocks={item.stocks} img={item.img} allRatings={item.allRatings} reviews={item.reviews} /></div>))
                            )

                                : <div>Loading...</div>

                        }


                    </div>
                </div>
            </section>



            {data.length > 0 ?

                <div id="buttons" class="flex justify-center mb-10 items-center">
                    <button disabled={pageNum <= 1 ? true : false} onClick={prev} class="mr-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Previous</button>
                    <p>Page : {pageNum}/{totalPages}</p>
                    <button disabled={pageNum >= totalPages ? true : false} onClick={next} class="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Next</button>
                </div>

                :

                <div>Loding...</div>

            }


        </div>


    )
}
