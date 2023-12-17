import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../constants/url'
import Navbar1 from '../../../components/user/Navbar'
import { Card, CardBody, CardHeader,Image } from '@nextui-org/react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../../../components/user/Footer'
import { useSelector } from 'react-redux'

function UserCourseView() {
    const {category_id} = useParams()
    const navigate = useNavigate()
    const [courses,setCourses] = useState([])
    const [category, setCategory] = useState("")
    const handleClick = (id) =>{
      navigate(`/user/course/view/${id}`)
    }
    useEffect(()=>{
     axios.get(`${API_URL}/course/course_view/${category_id}`)
     .then(response=>{
        setCourses(response.data.course)
        setCategory(response.data.category)
     })
     .catch(error=>{
        console.log(error.message)
     })

    },[category_id])
  return (
    <div>
        <Navbar1 />
        <div className='w-full my-7 pl-5'>
        <h1 className='text-2xl italic font-bold'>
          {`${category} Courses`}
          </h1>
        </div>
        <div className='grid grid-cols-6 gap-4 px-5 my-8 '>
          {courses.length > 0 ? courses.map((course,index)=>{
            console.log(course)
            return(
          <div key={index} onClick={()=>handleClick(course.id)}  className='col-span-2'>
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
          }):
          <div className=' w-full col-span-6 justify-center text-xl font-bold'><h2>Sorry No Courses Avail At This Moment !</h2></div>
          }

        </div> 
      <Footer />
    </div>
  )
}

export default UserCourseView