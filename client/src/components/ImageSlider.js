import React, { useState, useEffect } from 'react';
import Image1 from './Images/ecom_img1.jpg';
import Image2 from './Images/ecom_img2.jpg';
import Image3 from './Images/ecom_img3.jpg';
import Image4 from './Images/ecom_img4.jpg';

function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: Image1, alt: 'Image 1' },
    { src: Image2, alt: 'Image 2' },
    { src: Image3, alt: 'Image 3' },
    { src: Image4, alt: 'Image 4' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return (
    <div className="relative h-[20vh] sm:h-[40vh] md:h-[50vh] lg:h-[75vh] xl:h-[95vh] overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={` absolute top-0 object-center object-cover left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
        />
      ))}
    </div>
  );
}

export default ImageSlider;
