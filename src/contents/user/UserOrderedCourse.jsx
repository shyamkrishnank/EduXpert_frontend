import { Accordion, AccordionItem, Avatar, Badge, Checkbox, Link, Textarea} from '@nextui-org/react'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { API_URL } from '../../constants/url'
import axiosInstance from '../../axios/AxiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { IoSend } from 'react-icons/io5'
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { StripDate } from '../dateStrip/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { end_loading, loading } from '../../Slices/LodingSlice'



function UserOrderedcourse({prop:courseDetails}) {
    const [content,setContent] = useState(0)
    const user_id = useSelector(state=>state.auth.id)
    const {course_id}= useParams()
    const navigate = useNavigate()
    const [course,setCourse]=useState(courseDetails)
    const [reviews, setReviews] = useState([])
    const [addreview, setAddreview] = useState("")
    const dispatch = useDispatch()

  
    const handleChapterSelected = (id) =>{
        dispatch(loading())
        axiosInstance.get(`/course/chapter_details/${id}`)
        .then(response=>{
          setCourse(response.data)
          dispatch(end_loading())
        })
        .catch(error=>{
          dispatch(end_loading())

        })
      }

      const handleContent = (content) =>{
        if (content == 1){
          axiosInstance.get(`/course/get_review/${course_id}`)
          .then(response=>{
            setReviews(response.data)
          })
          .catch(error=>{

          })

        }
        setContent(content)   
      }

      const handleInstructor = (id)=> {
        navigate(`/user/instructor/${id}`)
      }

      const handleSubmit = () =>{
        setAddreview("")
        const data ={
          'course' : course_id,
          'comment' : addreview,
        }
        axiosInstance.post('/course/addreview/', data)
        .then(response=>{
          setReviews(prev=>[response.data,...prev])
          toast.success('Review Added Successfully!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
        })
        .catch(error=>{
          toast.error('Something went wrong!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
          

        })
      }

      const handleLike = (id,index) =>{
        setReviews(prev=>[
          ...prev.slice(0, index),
          { ...prev[index], is_liked:!prev[index].is_liked, liked_count:prev[index].is_liked?prev[index].liked_count-1:prev[index].liked_count+1},
          ...prev.slice(index + 1)
        ])
        axiosInstance.get(`/course/like_review/${id}`)
      }

      const handleDelete =(id,index)=>{
        axiosInstance.get(`/course/delete_review/${id}`)
        .then(response=>{
          setReviews(prev=>prev.filter((review, i) => i !== index))
          toast.success('Review deleted!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
        })
        .catch(error=>{
          toast.success('Something went wrong!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })

        })



      } 


  return (
    <div>
    <div  className='grid grid-cols-12 gap-4 mt-6 ml-32'>
    <div className='col-span-8'>
      {course && course.initial_chapter?
        <>
       <ReactPlayer height={500} width="auto" fallback="https://www.youtube.com/watch?v=qxOkaU6RVz4" url={`${API_URL}${course.initial_chapter.video}`} controls/>
      <div className='my-4 text-3xl font-bold font-sans'><span onClick={()=>handleContent(0)} className='px-8 cursor-pointer'>About</span><span onClick={()=>handleContent(1)} className='mr-8 cursor-pointer'>Reviews</span></div>
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
      <div className='flex flex-col justify-center align-middle'>
        <div className='w-full'> <Textarea value={addreview} onChange={e=>setAddreview(e.target.value.trimStart())} endContent={<IoSend onClick={handleSubmit} className='cursor-pointer' size={25}/>}  variant="bordered" placeholder="Write Your Review" /></div>
        {reviews.length > 0 ? 
        <div className='my-3'>
          <div className='flex flex-col gap-5 mt-5'>
            {reviews.map((review,index)=>{
              return(
            <div>
            <div key={index} className='w-full flex gap-3 mx-2 '>
               <div className='w-1/12'><Avatar name={review.user ? review.user.get_full_name:null}  size="sm"   /></div>
               <div className='w-11/12'>
                  <div className='flex gap-5'>
                    <div><h1 className='font-semibold'>{review.user.get_full_name} {review.user.id == user_id && "(You)"}</h1></div>
                    <div><p className='text-sm'>{StripDate(review.timestamp)}</p></div>
                  </div>
                  <div className='my-4'><p className='break-all'>{review.comment}</p></div>
                  <div className='flex gap-3'>
                    <div className='flex justify-start'><Badge variant="solid" color="secondary" content={review.liked_count == 0 ? null : review.liked_count} size="md"  placement="bottom-right">{review.is_liked? <AiFillLike onClick={()=>handleLike(review.id,index)} className='cursor-pointer text-primary-500' size={25} />:<AiOutlineLike onClick={()=>handleLike(review.id,index)}  className='cursor-pointer' size={25} />}</Badge></div>
                    {review.user.id == user_id &&  <div><MdDelete onClick={()=>handleDelete(review.id,index)} className='text-red-500 cursor-pointer' size={25}  /></div>}
                  </div>
                  {review.reply.length > 0 &&
                   <div className='mt-4'>
                    {
                      review.reply.map((reply,index)=>{
                        return(
                          <div key={index} className='flex'>
                          <div className='w-1/12'><Avatar name={reply.user ? reply.user.get_full_name:null}  size="sm" /></div>
                            <div className='flex flex-col gap-3 w-full'>
                                <div className='flex fle gap-5'>
                                  <div><h1 className='font-semibold'>{reply.user.get_full_name}</h1></div>
                                  <div><p className='text-sm'>{StripDate(reply.timestamp)}</p></div>
                                </div>
                                <div><p className='break-all'>{reply.comment}</p></div>
                            </div>
                          </div>
                        )
                      })
                    }

                   </div>
                  }

               </div>
            </div>
            </div>
            )})}
            


          </div>

        </div>
        : <div className='flex justify-center my-3'><h1 className='text-2xl font-semibold text-danger-500'> No Reviews Yet!</h1></div>}
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
