import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Image, Link } from '@nextui-org/react'
import { API_URL, STATIC_IMAGE_URL } from '../../../constants/url'
import { StripDate } from '../../../contents/dateStrip/utilities'
import InsChatModal from '../../../contents/modals/InsChatModal'
import axiosInstance from '../../../axios/AxiosInstance'
import { useDispatch } from 'react-redux'
import { end_loading, loading } from '../../../Slices/LodingSlice'

function InstructorProfile() {
    const {instructor_id}= useParams()
    const navigate = useNavigate()
    const [chatActive,setChatActive] = useState(false)
    const [instructor,setInstructor] = useState()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loading())
        axiosInstance(`/users/instructorprofile/${instructor_id}`)
        .then(response=>{
            setInstructor(response.data)
            dispatch(end_loading())
        })
        .catch(response=>{
          dispatch(end_loading())
        })
    },[])

    const handleClick = (id) =>{
        navigate(`/user/course/view/${id}`)
      }

  return (
    <div>
        {instructor ? 
        <div>
         <div className='px-28 pt-14 pb-8 w-full justify-center flex gap-8'>
            <div className='basis-2/4 flex justify-center'>
              <div className='flex gap-4 flex-col'>
                <div> <h1 className='text-lg font-semibold'>Instructor</h1></div>
                <div ><h1 className='text-4xl capitalize font-serif font-bold'>{instructor.get_full_name}</h1></div>
                <div><h1 className='text-lg '>{instructor.headline}</h1></div>
                <div><h1 className='text-lg font-semibold'>Started from {StripDate(instructor.created_at)}</h1></div>
                <div className='mt-4'>
                    <h1 className='text-xl font-semibold'>About Me</h1>
                </div>
                <div className='flex capitalize ml-4'>
                    <p>{instructor.bio}</p>
                </div>
                <div className='mt-4'>
                    <h1 className='text-xl font-semibold'>Social Link</h1>
                </div>
                <div className='flex ml-4'>
                    {<Link className='cursor-pointer'>{instructor.sociallink}</Link>}
                </div>
                <div className='mt-4'>
                    <h1 className='text-2xl font-semibold'>{`My Courses (${instructor.course.length})`}</h1>
                </div>
              </div>
            </div>  
            <div className='basis-2/4 flex flex-col gap-4'>
                <div className='pl-8'> <Image width={200} src={`${API_URL}${instructor.image}`} alt="NextUI Album Cover" classNames="m-5"/> </div>
                <div className='pl-16'><Button color="success" onClick={()=>setChatActive(true)} className='text-white' variant="solid" startContent={""}> Send Message </Button></div>

            </div>
        </div> 
        <div className='grid grid-cols-6 gap-4 px-40'>
          {instructor.course.length > 0 ? instructor.course.map((course,index)=>{
            return(
          <div key={index} onClick={()=>handleClick(course.id)}  className='col-span-2'>
              <Card className="h-[250px] cursor-pointer">
              <CardHeader className="pb-0 pt-2  flex-col items-center">
                <h4 className="font-bold text-large">{course.course_title}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2 items-center">
                <Image
                  alt={`${STATIC_IMAGE_URL}profileicon.jpg`}
                  className="object-cover rounded-xl"
                  src={course.image?`${API_URL}/${course.image}`:`${STATIC_IMAGE_URL}/profileicon.jpg`}
                  width={270}
                />
              </CardBody>
          </Card>
          </div>
            )
          }):
          <div className='col-span-6 h-64 flex flex-col gap-2  items-center justify-center'>
              <div><h1 className='text-xl font-semibold'>Sorry ! No course available now</h1></div>
              <div><Button color='success' onClick={()=>navigate('/user')} variant="bordered">Back Home</Button></div>
       </div> 
          }

        </div>  
        </div>
        :
        <div className='h-96 flex w-full justify-center items-center'>
            <h1  className='font-bold text-2xl'>No Instructor Detials Available!</h1>
        </div>
       
         }
         {chatActive &&  <InsChatModal setChatActive={setChatActive} instructor_id={instructor_id} />}
        
    </div>
  )
}

export default InstructorProfile
