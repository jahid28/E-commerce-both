import React from 'react'
import AllItemPage from './AllItemPage.js';
import Stats from './Stats.js';
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
