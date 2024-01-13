import { Image } from '@nextui-org/react'
import React from 'react'


function InstructorPage() { 
  return (
    <div className='mt-10 mx-28'>
      <div className='w-full flex '>
        <div className='w-6/12 flex justify-center ' >
          <Image width={250} src='/intructorBanner1.jpg' />
        </div>
        <div className='w-6/12'>
          <div className='pt-4'>
            <h1 className='font-medium text-2xl'>Create Engaging Courses</h1>
          </div>
          <div className='mt-5'>
            <div className='w-4/6'>
            <p>Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting</p>
            </div>
          </div>   
        </div>
      </div>

      <div className='mt-10 flex'>
        <div className='flex w-6/12 gap-5'>
          <div>
            <Image width={250} src='/instructorBanner2.jpg' />
          </div>
          <div className='w-6/12'>
          <div className='pt-4'>
            <h1 className='font-medium text-2xl'>Get Started with EduXpert</h1>
          </div>
          <div className='mt-5'>
            <div>
            <p> Let your curiosity be your guide, and together, we'll pave the way for your success in the world of education and expertise. Your journey towards excellence starts here!</p>
            </div>
          </div>   
        </div>
        </div>
        <div className='flex w-6/12 gap-3'>
          <div className='pt-5'>
            <Image width={400} src='/instructorBanner3.jpg' />
          </div>
          <div className='w-6/12'>
          <div className='pt-4'>
            <h1 className='font-medium text-2xl'>Build Your Audience</h1>
          </div>
          <div className='mt-5'>
            <div>
              <p> Set your course up for success by building your audience.</p>
            </div>
          </div>   
        </div>
        </div>


      </div>
    </div>
  )
}

export default InstructorPage
