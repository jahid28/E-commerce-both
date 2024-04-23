import React, { useEffect } from 'react'
import AllItemPage from './AllItemPage.js';
import Stats from './Stats.js';
import ImageSlider from './ImageSlider.js';
import { useNavigate, useLocation } from "react-router-dom";
// useEffect
export default function Home() {
  const navigate = useNavigate();
  // useEffect(()=>{
  //   navigate(`/?selectedOption=kkkkkk`);
  // },[])

  return (
    <div>

      <ImageSlider />
      <AllItemPage />
      <Stats />

    </div>
  )
}
