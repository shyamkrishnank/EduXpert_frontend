import React, {useRef, useState } from 'react'
import { Button, Chip, Image, Input, Switch, Textarea } from '@nextui-org/react'
import { IoMdAdd} from 'react-icons/io'
import { API_URL } from '../../../constants/url'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,useDisclosure} from "@nextui-org/react";
import UseCurrentChapter from '../../../hooks/UseCurrentChapter'
import { FaRegCircleDot } from "react-icons/fa6";
import { toast } from 'react-toastify'
import ChapterEditModal from '../../../contents/modals/ChapterEditModal'
import axiosInstance from '../../../axios/AxiosInstance'
import { useDispatch } from 'react-redux'
import { end_loading, loading } from '../../../Slices/LodingSlice'



function CourseChapter() {
   const objects = {
    title : "",
    description: "",
    video : ""
   }
    const {isOpen, onOpen,onClose, onOpenChange} = useDisclosure();
    const {course_id} = useParams()
    const dispatch = useDispatch()
    const [content,setContent] = useState(0)
    const [editChapter,setEditChapter] = useState(false)
    const [course,setCourse] = UseCurrentChapter(course_id)
    const [chapter,setChapter] = useState(objects)
    const imgRef = useRef(" ")

    const handleChapterSelected = (id) =>{
      dispatch(loading())
      axiosInstance.get(`${API_URL}/course/chapter_details/${id}`)
      .then(response=>{
        setCourse(response.data)
        dispatch(end_loading())
      .catch(error=>{
        dispatch(end_loading())
      })
      })
    }
    const addChapter = () =>{
       onOpen()
    }
    const handleImageClick = () =>{
       imgRef.current.click()
    }

    const handleClose = () =>{
      setChapter(objects)
      onClose()
    }

    const handleContent = (content) =>{
      setContent(content)   
    }
 

  const handleSubmit = () =>{
    if (chapter.title === "" || chapter.description === "" || chapter.video === ""){
      toast.error('Please fill all fields!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    else{ 
      handleClose()
      dispatch(loading())
      const formData = new FormData
      Object.entries(chapter).forEach(([key,value])=>{
        formData.append(key,value)
      })
      formData.append('course',course_id)
      axiosInstance.post(`${API_URL}/course/add_chapter`, formData)
      .then(response=>{
        setCourse(response.data)
        dispatch(end_loading())
        toast.success('Chapter Added Successfully!', {
          position: "top-center",
          autoClose: 1000,
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
        console.log(error.message)
      })
    }
  }
  return (
    <div> 
    <div className='mt-7 flex  justify-end mr-9 gap-7'> 
    <div className=''><Button color="primary" onClick={addChapter} endContent={<IoMdAdd />}>
      Add New Chapter
    </Button></div>
  </div>
    <div className='ml-28 flex mt-4'>
    </div>
    <div  className='grid grid-cols-12 mt-6 ml-32'>
    <div className='col-span-8'>
      {course.initial_chapter?
        <>
      <ReactPlayer  height="auto" width="90%" url={`${API_URL}${course.initial_chapter.video}`} controls/>
      <div className='my-4 text-3xl font-bold font-sans'><span onClick={()=>handleContent(0)} className='px-8 cursor-pointer'>About</span></div>
      {content == 0 &&  <div className='mt-8'>
         <Input className='w-6/12 mb-2' onChange={e=>setEditChapter(prev=>({...prev,title:e.target.value}))}   label="Title" variant="bordered"  value={course.initial_chapter.title} size="lg" type='text' />
         <Textarea className='w-6/12 mb-2'  label="Description" variant="bordered" value={course.initial_chapter.description} />
         <Button onClick={()=>setEditChapter(true)} color='success'>Edit Details</Button>
      </div>}
       </>:
        <h2>No Chapter Added Yet!</h2>
         
          }
    </div>
        <div className='col-span-3'> 
        {course.initial_chapter && <div className='mb-7'><h1 className='text-2xl font-bold font-sans'>Chapters</h1></div> } 
           
           {course.all_chapters && course.all_chapters.map(chapter=>{return(
            <div className='flex justify-between start'>
           <Chip color={chapter.id == course.initial_chapter.id?"success":"default"} variant="light" onClick={()=>handleChapterSelected(chapter.id)} startContent={<FaRegCircleDot size={15} />} className="text-base font-bold mb-4 py-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">{chapter.title}</Chip> 
           </div>
           )})}
        </div> 
   </div>
  <div className='w-full h-20'></div>
  <Modal isOpen={isOpen}  size={'4xl'}  onOpenChange={onOpenChange}>
        <ModalContent>
          {
            <>
              <ModalHeader className="flex flex-col gap-1">{chapter.title}</ModalHeader>
              <ModalBody>
              <div  className='grid grid-cols-12 gap-4 mt-6 ml-2 mr-3'>
              <div className='col-span-5'>
                <Input
                isRequired
                type="text"
                name='title'
                label="Chapter Heading"
                value={chapter.title}
                onChange={e=>setChapter(prev=>({...prev,title:e.target.value.trimStart()}))}
                className='text-xl my-4'
                size={'lg'}
                /> 
                <Textarea
                isRequired
                label="Discription"
                name='description'
                type='text'
                placeholder="Enter your description"
                className='text-xl my-6'
                onChange={e=>setChapter(prev=>({...prev,description:e.target.value.trimStart()}))}
                size={'lg'}
                />
                </div>
            <div className='col-span-5'>
            <h1 className='ml-16 text-xl'>Upload Video</h1>
              {chapter.video?<ReactPlayer  height="30vh" width="auto" url={URL.createObjectURL(chapter.video )} controls/>:
                  <Image
                    width={300}
                    src="/uploadimage.jpg"
                    className='mt-3 cursor-pointer'
                    onClick={handleImageClick}
                  />
                  }
              <input name='video' accept="video/*"  value={""} onChange={e=>setChapter(prev=>({...prev,video:e.target.files[0]}))} ref={imgRef} hidden type='file'/>
            </div> 
        </div>      
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Save Chapter
                </Button>
              </ModalFooter>
            </>
           }
        </ModalContent>
      </Modal>
     {editChapter && <ChapterEditModal editchapter={course.initial_chapter} closefun={setEditChapter} setCourse={setCourse} />}
      
</div>
  )
}

export default CourseChapter
