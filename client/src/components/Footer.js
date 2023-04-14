import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer class="text-gray-600 body-font bg-gray-200">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap md:text-left text-center order-first">
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">See All Categories</h2>
              <nav class="list-none mb-10">
               
                <li>
                  <a href='https://www.youtube.com/@techywebdev8393' class="text-gray-600 hover:text-gray-800">YT Channel</a>
                </li>
                <li>
                  <a href='https://www.youtube.com/@techywebdev8393' class="text-gray-600 hover:text-gray-800">Twitter</a>
                </li>
                <li>
                  <a href='https://www.youtube.com/@techywebdev8393' class="text-gray-600 hover:text-gray-800">Featured!</a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Policy</h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Return Policy</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Privacy Policy</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Terms and Conditions</a>
                </li>

              </nav>
            </div>

            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CONTACT US :</h2>
              <div class="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                <Link to={'/contact'}>
                  <button class="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Contact Form</button>
                </Link>

              </div>

            </div>
          </div>
        </div>
        <div class="bg-gray-800 ">
          <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <img className="h-8 md:h-20  md:mt-1 md:mb-1" src={require('./Images/twd_ecommerce-removebg-preview (3).png')} alt="" />
            </a>
            <p class="text-sm text-white sm:ml-6 sm:mt-0 mt-4">© 2023 TWD Ecommerce
            </p>

          </div>
        </div>
      </footer>

    </div>
  )
}
