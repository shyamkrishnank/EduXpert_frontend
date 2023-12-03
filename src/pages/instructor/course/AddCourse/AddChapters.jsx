import React, { useState } from 'react'
import InstructorNav from '../../../../components/InstructorNav'
import Sidebar from '../../../../components/Sidebar'
import { Input,Textarea,Image,Button } from "@nextui-org/react"
import ReactPlayer from 'react-player'
import UseCurrentCourse from '../../../../hooks/UseCurrentCourse'
import {IoMdCheckmark , IoMdAdd } from "react-icons/io";
import {  toast } from 'react-toastify';
import { courseChapterSubmit, courseDelete } from '../../../../contents/instructor/Course'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




function AddChapters() {
    const objects = {
      title : "",
      description: "",
      video : ""
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user_id = useSelector(state=>state.auth.logged_id) 
    const course_id = useSelector(state=>state.currentCourse.id) 
    const [formFields,setFormFields] = useState([objects])
    const [data] = UseCurrentCourse()
    const title = data.course_title
    const handleInputChange = (e,index) =>{
      const data = [...formFields]
      data[index][e.target.name] = e.target.value
      console.log(data[index])
      setFormFields(data)
      console.log(data)
    }
    const handleFileChange = (e,index) =>{
      const data = [...formFields]
      data[index][e.target.name] = e.target.files[0]
      setFormFields(data)
    }
    
    const removeChapter = (index) =>{
      const data = [...formFields]
      data.splice(index,1)
      setFormFields(data)
    }

    const addChapter = () =>{
      const index = formFields.length - 1
      if(index == 2){
        toast.error('You can only add 3 chapters at a time!', {
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
      const current = formFields[index]
      if (current['title'] == ""|| current['description'] == "" || current['video']==""){
        toast.error('Please complete the existing chapter !', {
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
        const obj = objects
        setFormFields([...formFields,obj])
      } 
    }
    }
   function  handleSubmit (formFields){
       const data = {
        user_id : user_id,
        course_id : course_id
        }
        courseChapterSubmit(formFields,data,navigate)

      }
  return (
    <div> 
        <InstructorNav />
        <Sidebar /> 
        <div className='ml-28 flex mt-4'>
          <div className='w-4/5'><span className='text-2xl italic font-bold'>{title}-Chapters</span></div>
          <div className='w-1/5 justify-end'> <Button color="danger" onClick={()=>courseDelete(navigate,dispatch)} variant="bordered" > Delete Course </Button></div>
        </div>
        {formFields.map((form,index)=>{
          return(
        <div key={index} className='grid grid-cols-12 gap-4 mt-6 ml-32 mr-3'>
          <div className='col-span-1'>{index+1}</div>
          <div className='col-span-5'>
            <Input
            isRequired
            type="text"
            name='title'
            label="Chapter Heading"
            value={form.title}
            onChange={(e)=>handleInputChange(e,index)}
            className='text-xl my-4'
            size={'lg'}
            /> 
             <Textarea
            isRequired
            label="Discription"
            name='description'
            placeholder="Enter your description"
            className='text-xl my-6'
            value={form.description}
            onChange={(e)=>handleInputChange(e,index)}
            size={'lg'}
            />
            </div>
        <div className='col-span-5'>
          {form.video?<ReactPlayer  height="30vh" width="auto"  url={URL.createObjectURL(form.video)} controls/>:
              <Image
                width={300}
                height={300}
                src="/uploadimage.jpg"
                className='mt-3'
              />}
          <input name='video' onChange={e=>handleFileChange(e,index)} type='file'/>
         
        </div> 
        {index==0?null:<div className='justify-self-start'>
          <Button color="danger" 
          onClick={()=>removeChapter(index)}
           variant="bordered">Remove</Button>
          </div>}
     </div>
      )})}
      <div className='mt-7 flex  justify-center gap-7'> 
        <div className=''><Button color="primary" onClick={addChapter} endContent={<IoMdAdd />}>
          Add Chapter
        </Button></div>
        <div className=''><Button color="success" onClick={()=>handleSubmit(formFields)} startContent={<IoMdCheckmark />}>
          Submit
        </Button></div>
      </div>
      <div className='w-full h-20'></div>
    </div>
  )
}

export default AddChapters
