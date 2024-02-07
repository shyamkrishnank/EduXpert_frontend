import React from 'react'
import Navbar1 from '../../components/user/Navbar'
import Footer from '../../components/user/Footer'
import { Image } from '@nextui-org/react'
import { STATIC_IMAGE_URL } from '../../constants/url'

function Landingpage() {
  return (
    <div>
      <Navbar1 />
      <div >
         <div className='flex'>
          <div className='w-3/6 flex flex-col justify-center'>
            <div className='flex justify-center'><p className='text-6xl font-bold'> Education Opens <br/>Up the Mind</p></div>
            <div><p className='text-xl font-bold pl-24 mt-4 '>Embark on a boundless learning adventure with our cutting-edge e-learning platform. </p></div>
          </div>
          <div className='w-3/6' ><Image src={`${STATIC_IMAGE_URL}/e-lerningbanner.jpg`}  fallbackSrc="https://placehold.co/600x400?text=Loading..."/></div>
        </div>
        <div className='flex'>
        <div className='3/6' ><Image src={`${STATIC_IMAGE_URL}/banner2.jpg`} fallbackSrc="https://placehold.co/600x400?text=Loading..."/></div>
          <div className='w-3/6 flex flex-col justify-center'>
            <div className='w-3/6' >
               <div className='flex justify-center'><p className='text-6xl font-bold'> Unleash the Power of Learning</p></div>
               <div><p className='text-xl font-bold mt-4 '>Experience the transformative force of education as it propels your mind into realms of endless possibilities on our EduXpert</p></div>
            </div>
          </div>
        </div> 
      </div>
      <Footer />
    </div>
  )
}

export default Landingpage
