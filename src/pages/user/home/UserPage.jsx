import React, { useEffect, useState } from 'react'
import Navbar1 from '../../../components/user/Navbar'
import { Button, Card, CardBody, CardHeader, Image, Skeleton } from '@nextui-org/react'
import { API_URL } from '../../../constants/url'
import Footer from '../../../components/user/Footer'
import axiosInstance from '../../../axios/AxiosInstance'
import { useNavigate } from 'react-router-dom'


function UserPage() {
  const [course,setCourse] = useState([{},{},{}])
  const navigate = useNavigate()
  useEffect(()=>{
    axiosInstance.get(`${API_URL}/course/userhome`)
    .then(response=>{
      console.log(response.data)
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
        <Navbar1 />
        <div className='flex'>
          <div className='w-3/6 flex flex-col justify-center'>
            <div className='flex justify-center'><p className='text-6xl font-bold'> Education Opens <br/>Up the Mind</p></div>
            <div><p className='text-xl font-bold pl-24 mt-4 '>Embark on a boundless learning adventure with our cutting-edge e-learning platform. </p></div>
          </div>
          <div className='3/6' ><Image src='e-lerningbanner.jpg' /></div>
        </div>
        <div className='flex'>
        <div className='3/6' ><Image src='banner2.jpg' /></div>
          <div className='w-3/6 flex flex-col justify-center'>
            <div className='3/6' >
               <div className='flex justify-center'><p className='text-6xl font-bold'> Unleash the Power of Learning</p></div>
               <div><p className='text-xl font-bold mt-4 '>Experience the transformative force of education as it propels your mind into realms of endless possibilities on our EduXpert</p></div>
            </div>
          </div>
        </div> 
        <div className='flex items-center h-44'>
              <div className='w-4/12 flex flex-col font-bold pl-8'>
                  <div className='text-xl'><h1>Top Categories </h1></div>
                  <div className='text-4xl' >Popular Courses</div>
              </div>
              <div className='w-5/12 font-semibold'>Explore an unparalleled array of courses across diverse categories as we strive to provide the best learning experiences tailored to your unique interests and ambitions.</div>
              <div className='w-3/12 flex justify-center'>   <Button color="primary" variant="ghost">View Courses</Button> </div>
        </div>     
        <div className='font-bold flex pl-6 text-3xl'>
          TOP COURSES FOR YOU
        </div>
        <div className='flex my-5 pl-6'>
          {course && course.map(course=>{return(
          <div onClick={()=>handleClick(course.id)} className='flex-1 flex justify-center'>
           <Card className="w-[400px] h-56 cursor-pointer">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
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
          </div>)})}
        </div>
        <Footer />
    </div>
  )
}

export default UserPage
