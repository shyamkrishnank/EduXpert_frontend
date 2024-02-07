import React from 'react'
import {Button} from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import UseInsCourse from '../../../hooks/UseInsCourse';
import { API_URL } from '../../../constants/url';


function CoursePage() {
  const [courses,setCourses] = UseInsCourse()
  const navigate = useNavigate()
  const handleClick = (id) =>{
    navigate(`/instructor/course/view/${id}`)  
  }

  const addCourse = () => {
    navigate('addtitle')
    }

  return (
    <div>
        <div className='ml-28 flex mt-4'>
          <div className='w-4/5'><span className='text-4xl italic font-bold'>Your Courses</span></div>
          <div className='w-1/5 justify-end'>  <Button className='absolute top-20 right-10 font-bold' 
                    onClick={addCourse } color="success"
                    endContent={<IoIosAdd />}>
                    Add Course
            </Button></div>
        </div>
        <div className='grid grid-cols-6 gap-4 mt-8 ml-32 mr-12'>
          {courses ? courses.map((course,index)=>{
            return(
          <div key={index} onClick={()=>handleClick(course.id)}  className='col-span-2'>
              <Card className="py-4 cursor-pointer">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <h4 className="font-bold text-large">{course.course_title}</h4>
                <p className="text-tiny  font-bold">{course.course_description}</p>
                <small className="text-default-500">{course.created_at}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2 items-center">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={course.image?`${API_URL}/${course.image}`:null}
                  width={270}
                />
                <h4 >{course.status}</h4>
              </CardBody>
          </Card>
          </div>
            )
          }):
          <div className='flex justify-center col-span-12 w-full mt-10 ml-56 text-xl'>
              No Orders For Any Orders Yet!
          </div>
          }

        </div> 
    </div>
  )
}

export default CoursePage
