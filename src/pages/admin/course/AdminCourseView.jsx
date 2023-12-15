import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Button, Card, CardBody, CardHeader, Image, Input, Textarea } from '@nextui-org/react'
import axios from 'axios'
import { API_URL } from '../../../constants/url'
import ReactPlayer from 'react-player'
import { StripDate } from '../../../contents/dateStrip/utilities'


function AdminCourseView() {
    const [course,setCourse] = useState({})
    const [activebtn,setactivebtn] =  useState()
    const id = localStorage.getItem('course_id')
    useEffect(()=>{
        axios.get(`${API_URL}/eduadmin/course_details/${id}`)
        .then(response=>{
            console.log(response.data)
            setCourse(response.data)
            setactivebtn(response.data.is_active)
        })
        .catch(error=>{
            console.log(error.message)
        })

    },[])
    const handleActive = () =>{
        setactivebtn('lodding')
        axios.get(`${API_URL}/eduadmin/course_status/${id}`)
        .then(response=>{
            setactivebtn(response.data.status)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

  return (
    <div>
        <AdminNav />
        <AdminSideBar/>
        <div className='ml-56 '>
            <Card className='flex mr-7 mt-9 py-3 px-3'>
                <CardHeader>
                    {course.course_title}
                </CardHeader>
                <CardBody>
                    <div className='flex'>
                        <div className='basis-3/6 ml-8'>
                            <h4>{course.course_description}</h4>
                            <p>Chapter Count :{course.chapters?course.chapters.length:null}</p>
                            <p>Created by : {course.created_by?course.created_by.first_name:null}</p>
                            <p>Created at: {StripDate(course.created_at)} </p>
                           {activebtn == true && <Button onClick={handleActive} color='success'>Active</Button> }
                           {activebtn == false && <Button onClick={handleActive} color='danger'>Inactive</Button>}
                           {activebtn == 'lodding' && <Button isLoading color="secondary"  spinner={<svg
                          className="animate-spin h-5 w-5 text-current" fill="none"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                         <circle  className="opacity-25"    cx="12"  cy="12"  r="10"   stroke="currentColor"   strokeWidth="4"    />
                         <path   className="opacity-75"  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"    />   </svg>  }  > Loading    </Button>}   
                        </div>
                        <div className='basis-3/6 grid'>
                            <div className='place-self-center '><Image width={300} src={course.image?`${API_URL}${course.image}`:null} /></div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <div className='my-10'><h1>Chapters</h1></div>
            {course.chapters && course.chapters.map((chapter,index)=>{
                return(
                    <div className=' mt-5'>
                        <div key={index} className='grid grid-cols-12 gap-4 mt-6 mr-3'>
          <div className='col-span-1'>{index+1}</div>
          <div className='col-span-5'>
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 mx-4 my-6">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{chapter.title}</h3>
        <p className="text-gray-600 mb-4">{chapter.description}</p>
        <p>Created on : {chapter.created_at}</p>
        <p className={`text-sm ${chapter.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
          Status: {chapter.is_active?'Active':'InActive'}
        </p>
      </div>
    </div>
            
            </div>
        <div className='col-span-5'>
          {chapter.video?<ReactPlayer  height="30vh" width="auto"  url={`${API_URL}${chapter.video}`} controls/>:
              <Image
                width={300}
                height={300}
                src="/uploadimage.jpg"
                className='mt-3'
              />}         
        </div> 
     </div>
                     </div> 
                )
                
            })}

        </div>
      
    </div>
  )
}

export default AdminCourseView
