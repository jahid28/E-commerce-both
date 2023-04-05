import React, { useState } from 'react'
import AllItemPage from './AllItemPage.js';
import Stats from './Stats.js';
import 'react-toastify/dist/ReactToastify.css';
import ImageSlider from './ImageSlider.js';
export default function Home() {

  return (
    <div>

      <ImageSlider />
      <AllItemPage />
      <Stats />

    </div>
  )
}
