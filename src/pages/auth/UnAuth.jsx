import React from 'react'
import Navbar1 from '../../components/user/Navbar'
import { Link } from 'react-router-dom'
import { Image } from '@nextui-org/react'

function UnAuth() {
  return (
    <>
    <Navbar1 />
    <div className='w-full flex justify-center h-full items-center'>
    <div>
        <Image width={300} src='/error.jpg' />
     <h1 className="text-4xl font-bold text-red-500 mb-4">404 PAGE NOT FOUND</h1>
      <p className="text-gray-700 mb-8">
        Oops! The page is not available at this moment
      </p>
      <Link
        to="/home"
        className="text-blue-500 hover:underline font-medium"
      >
        Go back to Home
      </Link>
    </div>
    </div>
    </>
  )
}

export default UnAuth
