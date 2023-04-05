import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import ItemCard from './ItemCard.js';
import { useDispatch, useSelector } from 'react-redux'


export default function SearchPage() {
    const [progress, setProgress] = useState(0)
    const counter = useSelector(state => state.counter)



    return (
        <div>
            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <section className="text-gray-600 body-font ">
                <div className="container px-5 py-24 mx-auto  ">

                    <div className="flex flex-wrap -m-4  ">

                        {

                            (counter.text).length > 0 ? (
                                (counter.text).map((item) => (<div className='lg:w-1/4 md:w-1/2 p-2 scale-95 my-4 w-full  rounded-lg shadow-md cursor-pointer hover:shadow-2xl' key={item._id}><ItemCard name={item.name} type={item.type} price={item.price} stocks={item.stocks} img={item.img} allRatings={item.allRatings} reviews={item.reviews} /></div>))
                            )

                                :
                                <div className='w-full grid place-items-center lg:flex'>
                                    <h2 className='w-6/12 lg:w-4/12 my-3 lg:my-0 lg:ml-4 font-bold text-xl lg:text-5xl'>No Results Found</h2>

                                    <img className='w-6/12' src={require('./Images/noresult-freepik (1).jpg')} alt="" />

                                </div>

                        }


                    </div>
                </div>
            </section>


        </div>
    )
}
