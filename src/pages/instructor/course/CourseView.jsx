import React, { useRef, useState } from 'react'
import { Button, Image, Input, Textarea } from '@nextui-org/react'
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UseCurrentCourse from '../../../hooks/UseCurrentCourse';
import { API_URL } from '../../../constants/url';
import { courseDelete } from '../../../contents/instructor/Course';
import ObjectToForm from '../util/ObjectToForm';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axios/AxiosInstance';

function CourseView() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { course_id } = useParams()
    const imageRef = useRef()
    const [image,setImage] = useState("")
    const [course,setCourse] = UseCurrentCourse(course_id)
    const addImage = () =>{
        imageRef.current.click()
    }
    const handleSave = () => {
        if (course.title == " " || course.course_description == "" || course.price == " "){
            toast.error('Please fill all the fields!', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        }
        else if(course.price < 0){
            toast.error('Please enter the valid amount!', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        }
        else{
        const id = course.id
        const formData = ObjectToForm(course)
        if(image){
            formData.append('image',image)
        }
        axiosInstance.post(`${API_URL}/course/edit_course/${id}`,formData)
        .then(respone=>{
            navigate(`/instructor/course/chapters/${course_id}`)
        })
        .catch(error=>{
            console.log(error)

        })
    }
    }
    const handleContinue = () =>{
        navigate(`/instructor/course/chapters/${course_id}`)

    }
  return (
    <>
        <div className='ml-28 flex mt-4'>
            <div className='w-4/5'><span className='text-2xl italic font-bold'>{course.course_title}</span></div>
            <div className='w-1/5 justify-end'> <Button color="danger" onClick={()=>courseDelete(course.id,navigate,dispatch)} variant="bordered" > Delete Course </Button></div>
        </div>
        <div className='flex ml-32 mt-8'>
            <div className='w-3/5'>
                    <Input
                    isRequired
                    type="email"
                    label="Course titile"
                    value={course.course_title}
                    className='w-9/12 text-xl '
                    onChange={e=>setCourse(prev=>({...prev,course_title:e.target.value}))}
                    size={'lg'}
                    />
                   <Textarea
                    isRequired
                    label="Discription"
                    placeholder="Enter your description"
                    className='w-9/12 text-xl my-6'
                    value={course.course_description}
                    onChange={e=>setCourse(prev=>({...prev,course_description:e.target.value}))}
                    size={'lg'}
                    />
               <Input
                    isRequired
                    type="number"
                    label="Price"
                    className='w-9/12 text-xl my-6'  
                    value={course.price}
                    onChange={e=>setCourse(prev=>({...prev,price:e.target.value}))}
                    endContent={<FaRupeeSign/> }
                    size={'lg'}
                />
            </div>
            <div className='2/5'>
            <Image
                width={300}
                height={200}
                src={image?URL.createObjectURL(image):`${API_URL}${course.image}`}
                className='mt-3 cursor-pointer'
                onClick={addImage}
              />
              <input ref={imageRef} value={""} onChange={e=>setImage(e.target.files[0])} type='file' hidden />
             <h1>status - {course.status }</h1>
            </div>

        </div>

        <div  className='mt-7 flex justify-center'>
            <div className='ml-36'>
            <Button onClick={handleSave} className='mr-4' color="primary">Save Changes and Continue</Button>
            <Button onClick={handleContinue} color="success">  Continue</Button> 
      
            </div>
           
        </div>
    </>
  )
}

export default CourseView
