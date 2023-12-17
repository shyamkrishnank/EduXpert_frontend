import { Image } from '@nextui-org/react'
import React, { useEffect } from 'react'

function Footer() {
  return (
    <div className='h-56 shadow-xl text-white bg-black mt-9 flex'>
        <div className='flex-2 pt-6  pl-20'><Image width={90} src="/logo.png" />
        <p className='text-md w-9/12 font-semibold'>Unlocking Knowledge, Empowering Minds: eduXpert  Your Pathway to Excellence!</p>
        </div>
        <div className='flex-1  pt-6 pl-6'>
            <h1 className='text-md mb-1 font-semibold'> About </h1>
            <h1 className='text-md mb-1 font-semibold'> Blog </h1>
            <h1 className='text-md mb-1 font-semibold'> Account </h1>
            <h1 className='text-md mb-1 font-semibold'> Help and Support </h1>    
        </div>
        <div className='flex-1 pt-6'>
            <h1 className='text-md mb-1 font-semibold'> Instructors </h1>
            <h1 className='text-md mb-1 font-semibold'> Terms </h1>
            <h1 className='text-md mb-1 font-semibold'> Contact Us</h1>
        </div>
      
    </div>
  )
}

export default Footer
