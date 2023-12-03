import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../components/Sidebar'
import {Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {Button , Image} from "@nextui-org/react";
import InstructorNav from '../../../../components/InstructorNav';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { API_URL } from '../../../../constants/url';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentCourse } from '../../../../Slices/CourseIdSlice';
import { FaRupeeSign } from "react-icons/fa";



function AddTitle() {
  const [title,setTitle] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("")
  const [thumbnail,setThumbnail] = useState("")
  const [price,setPrice] = useState("")
  const [course,setCourse] = useState({})
  const created_by = useSelector(state=>state.auth.logged_id)
  const handleSubmit=()=>{
    if (title == "" || description == "" || category == "" || thumbnail == "" || price == ""){
      toast.error('Please fill all fields!', {
        position: "top-center",
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
   const formData = new FormData
   formData.append("course_title",title)
   formData.append('course_description',description)
   formData.append('course_category',course[category])
   formData.append('created_by',created_by)
   formData.append('image',thumbnail)
   formData.append('price',price)
   axios.post(`${API_URL}/course/upload_course`,formData)
   .then(response=>{
    localStorage.setItem('course_id',response.data.id)
    dispatch(currentCourse(response.data))
    toast.success('Well done!', {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    navigate('/instructor/course/addchapter')

   })
   .catch(error=>{
    console.log(error)
   })
  }
  }
  useEffect(()=>{
    axios.get(`${API_URL}/course/course_category`)
    .then(response=>{
      console.log(response)
      setCourse(response.data.data)
    })
  .catch(error=>{
    console.log(error)
  })
  },[])
  return (
    <>
        <InstructorNav />
        <Sidebar />
        <div className='ml-28 flex mt-4'>
          <div className='w-4/5'><span className='text-2xl italic font-bold'>Course Name</span></div>
        </div>
        <div className='flex ml-32 mt-8'>
          <div className='w-3/5'>
          <Input
            isRequired
            type="email"
            label="Course titile"
            defaultValue=""
            value={title}
            className='w-9/12 text-xl '
            onChange={e=>setTitle(e.target.value)}
            size={'lg'}
            />
          <Textarea
            isRequired
            label="Discription"
            placeholder="Enter your description"
            className='w-9/12 text-xl my-6'
            value={description}
            onChange={e=>setDescription(e.target.value)}
            size={'lg'}
            />
              <Input
                type="text"
                label="Course Category"
                id="myInput"
                value={category}
                onChange={e=>setCategory(e.target.value)}
                list="options"
                className="w-9/12 text-xl"
              />
              <datalist id="options" className="mt-2">
                {Object.entries(course).map(([key, value]) => (
                  <option 
                    key={key}
                    value={key}
                    className="py-1 px-2 text-gray-800 hover:bg-blue-200 cursor-pointer"
                  />
                ))}
              </datalist>
              <Input
                    isRequired
                    type="number"
                    label="price"
                    className='w-9/12 text-xl my-6'  
                    value={price}
                    onChange={e=>setPrice(e.target.value)}
                    endContent={<FaRupeeSign/> }
                    description="You can change the price later." 
                    size={'lg'}
                />

          </div>

          <div className='w-2/5'>
            
          <Image
                width={300}
                height={200}
                src={thumbnail?URL.createObjectURL(thumbnail):"/uploadimage.jpg"}
                className='mt-3'
              />
              <input onChange={e=>setThumbnail(e.target.files[0])} type='file' />

          </div>

        </div>
      



        <div className='absolute bottom-28 right-80'>
            <Button 
            onClick={handleSubmit}
            color="success">
            Continue
        </Button> 
        </div>
     </>
  )
}

export default AddTitle
