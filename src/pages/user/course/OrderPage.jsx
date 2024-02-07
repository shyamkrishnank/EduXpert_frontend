import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { API_URL } from '../../../constants/url'
import {  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../axios/AxiosInstance'

function OrderPage() {
    const navigate = useNavigate()
    const user_id = useSelector(state=>state.auth.id)
    console.log(user_id)

    const [courses,setCourse] = useState("")
    useEffect(()=>{
        axiosInstance.get(`/order/user/${user_id}`)
        .then(response=>{
            setCourse(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const handleClick = (id)=>{
        navigate(`/user/course/view/${id}`)
    }
  return (
    <div>
        <div className='flex py-8 w-full mt-5 bg-slate-900'>
            <div className=' w-6/12 pl-32 py-3'>
                <h1 className='text-white text-4xl'>My Learnings</h1>
            </div>
        </div>
        {courses?
        <div className='grid grid-cols-12 gap-3 px-10 mt-5'>
            {courses && courses.map((course,index)=>{
               return(
                <div key={index} onClick={()=>handleClick(course.id)}  className='col-span-3'>
                     <Card className="h-[250px] cursor-pointer">
                        <CardHeader className="pb-0 pt-2  flex-col items-center">
                        <h4 className="font-bold text-large">{course.course_title}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2 items-center">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={course.image?`${API_URL}${course.image}`:null}
                            width={270}
                        />
                        </CardBody>
                        </Card> 
                </div>
               
               )
        })} 
        </div>  
         :
         <div>
            <div className='w-full flex flex-col gap-2 h-64 items-center justify-center'>
                <div><h1 className='text-xl font-semibold'>No Course Purchased Yet !</h1></div>
                <div><Button color='success' onClick={()=>navigate('/user/courses')} variant="bordered">Browse Course</Button></div>
            </div>
         </div>      
          }
    </div>
  )
}

export default OrderPage
