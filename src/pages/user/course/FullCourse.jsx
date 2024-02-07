import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/AxiosInstance'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { API_URL } from '../../../constants/url'
import { FaRegSadTear } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { end_loading, loading } from '../../../Slices/LodingSlice';


function FullCourse() {
    const [category,setCategory] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loading())
        axiosInstance.get('/course/get_allcourse')
        .then(response=>{
            setCategory(response.data)
            dispatch(end_loading())
        })
        .catch(error=>{
            console.log(error.message)
            dispatch(end_loading())
        })
    },[])

    const handleClick = (id) =>{
        console.log(id)
        navigate(`/user/course/view/${id}`)

    }

  return (
    <div>
        {category ?
        Object.keys(category).map((key,index)=>{
            return(
            <div key={index} className='ml-12  mt-12 '>
                <h1 className='text-2xl italic font-bold'>
                   {`${key} Courses `} 
                </h1>
                {
               category[key] && category[key].length > 0 ?
                <div className='grid grid-cols-12 gap-4 px-5 my-8 flex-nowrap '>
                    {console.log(category[key])}
                    {
                category[key].map((course,index)=>
                    <div key={index}  className='col-span-3'>
                    <Card isPressable onPress={()=>handleClick(course.id)}  className="h-[250px] cursor-pointer">
                        <CardHeader className="pb-0 pt-2  flex-col items-center">
                        <h1 className="font-bold text-large">{course.course_title}</h1>
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
                    <h1 className='text-xl'> Sorry No Course Available Now! </h1>
                    </div>
                    
                </div>

                }

            </div>
            )

        }):
         <div className='w-full h-screen flex justify-center my-7'>
                    <div className='flex flex-col  '>
                    <FaRegSadTear  size={30}/>
                    <h1 className='text-xl'> Sorry No Course Available Now! </h1>
                    </div>
                    
                </div>

         }    
    </div>
  )
}

export default FullCourse
