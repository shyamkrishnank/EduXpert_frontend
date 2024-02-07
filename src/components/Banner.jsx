import React from 'react'
import { STATIC_IMAGE_URL } from '../constants/url'

function Banner() {
  return (
    <div>
        <img  className="relative w-full h-30" src={`${STATIC_IMAGE_URL}/banner.jpg`}/>
        <h1 className='absolute bottom-0'>Hello</h1>
    </div>
  )
}

export default Banner
