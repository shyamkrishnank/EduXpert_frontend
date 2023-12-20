import { Accordion, AccordionItem, Checkbox, Chip, Input, Link, Textarea, useAccordion } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import ReactPlayer from 'react-player'
import { API_URL } from '../../constants/url'
import axiosInstance from '../../axios/AxiosInstance'
import Loading from '../../components/loading/Loading'
import { useNavigate } from 'react-router-dom'

function UserOrderedcourse({prop:courseDetails}) {
    const [content,setContent] = useState(0)
    const navigate = useNavigate()
    const [course,setCourse]=useState(courseDetails)
    const[loading,setLoading] = useState(false)
    const handleChapterSelected = (id) =>{
        setLoading(true)
        axiosInstance.get(`${API_URL}/course/chapter_details/${id}`)
        .then(response=>{
          setLoading(false)
          setCourse(response.data)
        .catch(error=>{
          setLoading(false)
          console.log(console.log(error))
        })
        })
      }

      const handleContent = (content) =>{
        setContent(content)   
      }
      const handleInstructor = (id)=>{
        navigate(`/user/instructor/${id}`)
      }

  return (
    <div>
    <div  className='grid grid-cols-12 gap-4 mt-6 ml-32'>
    <div className='col-span-8'>
      {course && course.initial_chapter?
        <>
        {loading?<div className='w-full h-44'><Loading /></div>:<ReactPlayer  height="auto" width="auto" url={`${API_URL}${course.initial_chapter.video}`} controls/>}
      <div className='my-4 text-3xl font-bold font-sans'><span onClick={()=>handleContent(0)} className='px-8 cursor-pointer'>About</span><span onClick={()=>handleContent(1)} className='mr-8 cursor-pointer'>Reviews</span><span onClick={()=>handleContent(2)} className='mr-8 cursor-pointer'>Notes</span></div>
      {content == 0 &&  
      <div className='mt-8 grid gap-7'>
        <div className='flex flex-col'>
            <div className='w-full flex flex-row '>
                <div className='basis-1/4'><h1 className='font-semibold'>Title</h1></div>
                <div className='basis-3/4'><h1 className='font-semibold'>{course.initial_chapter.title}</h1></div>
            </div>
        </div>  
        <div className='flex flex-col'>
            <div className='w-full flex flex-row'>
                <div className='basis-1/4'><h1 className='font-semibold'>Description</h1></div>
                <div className='basis-3/4'><h1 className='font-semibold'>{course.initial_chapter.description}</h1></div>
            </div>
        </div> 
        <div className='flex flex-col'>
            <div className='w-full flex flex-row'>
                <div className='basis-1/4'><h1 className='font-semibold'>Instructor</h1></div>
                <div className='basis-3/4'><h1 className='font-semibold'> <Link onClick={()=>handleInstructor(course.instructor.id)} className='cursor-pointer' showAnchorIcon >{course.instructor.get_full_name}</Link></h1></div>
            </div>
        </div>
      </div>}
      {content == 1 &&  
      <div className='h-24  flex justify-center align-middle'>
        <h1 className='text-2xl font-semibold text-danger-500'> No Reviews Yet!</h1>
      </div>}
      {content == 2 && 
       <div className='h-24  flex justify-center align-middle'>
                <h1 className='text-2xl font-semibold text-danger-500'> No Notes Available Yet!</h1>
      </div>}
       </>:
        <h2>No Chapter Added Yet!</h2>  
          }
    </div>
        <div className='col-span-3 pl-4'> 
        {course && course.initial_chapter && <div className='mb-7 pl-4'><h1 className='text-2xl font-bold font-sans'>Chapters</h1></div> }  
        <Accordion>
           {course && course.all_chapters.map((chapter,index)=>{return(
                    <AccordionItem key={index} startContent={<Checkbox onChange={()=>handleChapterSelected(chapter.id)} isSelected={chapter.id == course.initial_chapter.id?true:false}  />} subtitle={`Chapter ${index+1}`}  aria-label="Accordion 1" title={chapter.title}>
                        {chapter.description}
                    </AccordionItem>
           )})}
          </Accordion>

        </div> 
   </div>
      
    </div>
  )
}

export default UserOrderedcourse
