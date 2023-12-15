import React, { useEffect, useState } from 'react'
import Navbar1 from '../../../components/user/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../constants/url'
import { BreadcrumbItem, Breadcrumbs, Button, Image, Link } from '@nextui-org/react'
import { StripDate } from '../../../contents/dateStrip/utilities'
import { FaRupeeSign } from "react-icons/fa";
import Footer from '../../../components/user/Footer'


function UserCourseDetail() {
  const {course_id}= useParams()
  const [courseDetails,setCourseDetails] = useState()
  console.log(course_id)
  useEffect(()=>{
    axios.get(`${API_URL}/course/get_course/${course_id}`)
    .then(response=>{
      console.log(response.data.course_category.category_name)
      setCourseDetails(response.data)
      console.log(response.data)
    })
    .catch(error=>{
      console.log(error.message)
    })

  },[])
  return (
    <div >
        <Navbar1 />
        <div className='flex py-8 w-full mt-5 bg-slate-900'>
          <div className='flex-col w-6/12 flex pl-32 pt-5'>
            <div>
            <Breadcrumbs color='primary' size='lg'>
              <BreadcrumbItem>{courseDetails && courseDetails.course_category.category_name}</BreadcrumbItem>
              <BreadcrumbItem>{courseDetails && courseDetails.course_title }</BreadcrumbItem>
           </Breadcrumbs>
            </div> 
            <div className='mt-4'>
              <h1 className='text-4xl font-bold text-white'>{courseDetails && courseDetails.course_title}</h1>
            </div>
            <div className='mt-3'>
               <h1 className='text-white'>Instructor : <Link className='cursor-pointer underline-offset-1' showAnchorIcon>{courseDetails && courseDetails.created_by.get_full_name}</Link></h1>
            </div>
            <div className='mt-3'>
               <h1 className='text-white'>Created at :<span className='text-xm'>{courseDetails && StripDate(courseDetails.created_at) }</span> </h1>
            </div>
          </div>
          <div className='flex justify-center items-center w-6/12 '>
            <div><Image width={300} height={400} src={courseDetails && `${API_URL}${courseDetails.image}`} /></div>
          </div>
        </div>
        <div className='flex mb-24'>
          <div className=' py-8 ml-4 px-8 w-6/12 shadow-2xl'>
            <div className=' pl-8 pt-8 w-full h-full '>
              <div>
                <h1 className='text-2xl font-bold'>What You Will Learn</h1>
              </div>
              <div className='w-7/12 mt-5' >
                 <p className='text-md font-semibold'>{courseDetails && courseDetails.course_description}</p>
              </div>
              <div className='my-3'> 
                 <h1 className='text-2xl font-bold'>Course Content</h1>
              </div>
              {courseDetails && courseDetails.chapters.map(chapter=>{
                return(
                 <p className='font-semibold'>. {chapter.title}</p>
              )})}
            </div>
          </div>
          <div className='w-6/12  mt-8 px-4 '>
                 <div className='border-2 px-10 py-6'>
                      <div className='w-full flex justify-center mb-2 text-lg font-bold font-serif'><h1>BUY THE COURSE</h1></div>
                      <div><p className='text-xm'>Unlock a world of knowledge with our premium course — purchase now and enjoy lifetime access to empower your learning journey</p></div>
                      <div className='mt-6 flex  text-4xl font-bold '><FaRupeeSign className='mt-2' size={30} /> {courseDetails && courseDetails.price}.00</div>
                      <div className='mt-2 '><Button fullWidth color="success" variant="ghost"> Buy Now </Button> </div>
                 </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default UserCourseDetail
