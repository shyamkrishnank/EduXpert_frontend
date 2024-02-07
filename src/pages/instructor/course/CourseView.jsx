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
import { end_loading, loading } from '../../../Slices/LodingSlice';

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
        if (course.course_title == "" || course.course_description == "" ){
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
        dispatch(loading())
        if (course.price == ""){
            course.price = 0
        }
        const id = course.id
        const formData = ObjectToForm(course)
        if(image){
            formData.append('image',image)
        }
        axiosInstance.post(`/course/edit_course/${id}`,formData)
        .then(respone=>{
            dispatch(end_loading())
            navigate(`/instructor/course/chapters/${course_id}`)
            toast.success('Course Edited Successfully!', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
        .catch(error=>{
            dispatch(end_loading())
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
                    type="text"
                    label="Course titile"
                    value={course.course_title}
                    className='w-9/12 text-xl '
                    onChange={e=>setCourse(prev=>({...prev,course_title:e.target.value.trimStart()}))}
                    size={'lg'}
                    />
                   <Textarea
                    isRequired
                    label="Discription"
                    placeholder="Enter your description"
                    className='w-9/12 text-xl my-6'
                    value={course.course_description}
                    onChange={e=>setCourse(prev=>({...prev,course_description:e.target.value.trimStart()}))}
                    size={'lg'}
                    />
               <Input
                    isRequired
                    type="number"
                    label="Price"
                    className='w-9/12 text-xl my-6'  
                    value={course.price}
                    onChange={e=>setCourse(prev=>({...prev,price:e.target.value.trim()}))}
                    startContent={<FaRupeeSign/> }
                    size={'lg'}
                />
            </div>
            <div className='flex flex-col gap-3 w-2/5'>
                <div>
                <h1 className='text-xl font-semibold text-gray-500'>Thumbnail</h1>
                <Image
                width={300}
                height={200}
                src={image?URL.createObjectURL(image):`${API_URL}${course.image}`}
                className='mt-3 cursor-pointer'
                onClick={addImage}
              />
               <input ref={imageRef} value={""} onChange={e=>setImage(e.target.files[0])} type='file'  accept="image/*" hidden />
                </div>
                <div><h1><span className='text-xl font-semibold'>Status -</span> <span  className='text-xl font-semibold text-success-500'>{course.status }</span></h1></div>
            
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
