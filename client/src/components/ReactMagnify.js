import React from 'react'
import ReactImageMagnify from 'react-image-magnify';

export default function ReactMagnify() {
  return (
    <div className="my-component">
    {/* src: 'https://m.media-amazon.com/images/I/7154EWu-5LL._SX679_.jpg', */}
    <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'Product Image',
            width:'500',
            height:'500',
            src: 'https://m.media-amazon.com/images/I/7154EWu-5LL._SX679_.jpg',
          },
          largeImage: {
            alt: 'Product Image',
            src: 'https://m.media-amazon.com/images/I/7154EWu-5LL._SX679_.jpg',
            width: 1800,
            height: 1800,
          },
          lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
        }}
      />
    </div>
  )
}
