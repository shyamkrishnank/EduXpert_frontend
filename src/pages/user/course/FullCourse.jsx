import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/AxiosInstance'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { API_URL } from '../../../constants/url'
import { FaRegSadTear } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function FullCourse() {
    const [category,setCategory] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.get('/course/get_allcourse')
        .then(response=>{
            console.log(response.data)
            setCategory(response.data)
        })
        .catch(error=>{
            console.log(error.message)
        })
    },[])

    const handleClick = (id) =>{
        console.log(id)
        navigate(`/user/course/view/${id}`)

    }

  return (
    <div>
        {category ?
        Object.keys(category).map(key=>{
            return(
            <div className='ml-12  mt-12 '>
                <h1 className='text-2xl italic font-bold'>
                   {`${key} Courses `} 
                </h1>
                {
                category[key].length > 0 ?
                <div className='grid grid-cols-12 gap-4 px-5 my-8 flex-nowrap '>
                    {
                category[key].map((course,index)=>
                    <div key={index}  className='col-span-3'>
                    <Card isPressable onPress={()=>handleClick(course.id)}  className="h-[250px] cursor-pointer">
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
                    
                )}
                </div>
                :
                <div className='w-full flex justify-center my-7'>
                    <div className='flex flex-col  '>
                    <FaRegSadTear  size={30}/>
                    <hi className='text-xl'> Sorry No Course Available Now! </hi>
                    </div>
                    
                </div>

                }

            </div>
            )

        }):
         <div className='w-full flex justify-center my-7'>
                    <div className='flex flex-col  '>
                    <FaRegSadTear  size={30}/>
                    <hi className='text-xl'> Sorry No Course Available Now! </hi>
                    </div>
                    
                </div>

         }
       {/* <div className='w-full my-7 pl-5'>
            <h1 className='text-2xl italic font-bold'>
               {`${category} Courses`} 
            </h1>
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
          <div className='col-span-6 h-64 flex flex-col gap-2  items-center justify-center'>
              <div><h1 className='text-xl font-semibold'>Sorry ! No course available now</h1></div>
              <div><Button color='success' onClick={()=>navigate('/user')} variant="bordered">Back Home</Button></div>
       </div> 
          }

        </div> 
        </div> */}

      
    </div>
  )
}

export default FullCourse
