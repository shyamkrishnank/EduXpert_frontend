import React, { useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Pagination, Textarea} from "@nextui-org/react";
import axiosInstance from '../../../axios/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { StripDate } from '../../../contents/dateStrip/utilities';
import { IoIosSend } from "react-icons/io";
import { toast } from 'react-toastify';
import { end_loading, loading } from '../../../Slices/LodingSlice';



export default function Reviews() {
    const instuctor_id = useSelector(state=>state.auth.id)
    const [reviews,setReviews] = useState()
    const [count,setCount] = useState()
    const [reply,setReply] = useState({})
    const dispatch = useDispatch()

    const initialState = {
        0:false
    }

    const fetchData = (page = 1) => {
        dispatch(loading())
        axiosInstance.get(`/course/instructor_review/${instuctor_id}?page=${page}`)
        .then(response=>{
            setReviews(response.data.results)
            setCount(Math.ceil(response.data.count/4))
            dispatch(end_loading())

        })
        .catch(error=>{
            dispatch(end_loading())
            console.log(error)
        })

    }


    const[inputOpen,setInputOpen] = useState(initialState)

    const handleReply = (index) =>{
        setInputOpen(prev => ({ ...prev, [index]: !prev[index] }));
        console.log(reviews)
        
    }

    const handleSubmit = (id,index) =>{
        if (reply[index]  == ""){
            toast.error('Please enter a valid data!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        }
        else{
        const data = {
            'review' : id,
            'comment' : reply[index]
        }
        axiosInstance.post('/course/review_reply/',data)
        .then(response=>{
            console.log(index)
            setReviews(prev => [
                ...prev.slice(0, index),
                { ...prev[index], reply: [...prev[index].reply, response.data] }, 
                ...prev.slice(index + 1), 
              ])   
            setReply(prev=>({...prev,[index]:""})) 
            toast.success('Reply added!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                
        })
        .catch(error=>{
            console.log(error)
        })
    }

    }

    const handleDelete = (reply_id,index_1,index) =>{
        axiosInstance.get(`/course/delete_reply/${reply_id}`)
        .then(response=>{
            setReviews(prev=>[
                ...prev.slice(0, index),
                {
                  ...prev[index],
                  reply: [...prev[index].reply.slice(0, index_1), ...prev[index].reply.slice(index_1 + 1)],
                },
                ...prev.slice(index + 1),
              ])
              toast.info('Review Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
        .catch(error=>{
            console.log(error)
        })


    }

    const handleClick = (page) =>{
        fetchData(page)     
      }

    useEffect(()=>{
        fetchData()
    },[])


  return (
    <div className='mt-9 ml-28'>
      <div className='w-4/5'><span className='text-3xl italic font-bold'>Reviews</span></div>
      <div>
      <Table aria-label="Example static collection table" className='pr-5'>
      <TableHeader>
        <TableColumn className='w-3/12' >Student</TableColumn>
        <TableColumn className='w-3/12'>Date</TableColumn>
        <TableColumn className='w-3/12'>Course</TableColumn>
        <TableColumn className='w-3/12'>Feedback</TableColumn>
      </TableHeader>
      <TableBody>
        {reviews && reviews.length > 0 ?
        reviews.map((review,index)=>{
            return(
          <TableRow key={index}>
          <TableCell>{review.user.get_full_name}</TableCell>
          <TableCell>{StripDate(review.timestamp)}</TableCell>
          <TableCell>{review.course.course_title}</TableCell>
          <TableCell>
            <div>
                <div> <p className='break-words w-9/12'>{review.comment}</p></div>
                <div onClick={()=>handleReply(index)} className='text-danger font-semibold cursor-pointer mt-1'>Reply</div>
                  {inputOpen[index] == true  &&  <div className='mt-2'>
                    {review.reply.length > 0 && 
                    <div className='flex flex-col gap-2 mb-2'>
                    {
                    review.reply.map((reply,index_1)=>{
                        return(
                            <div key={index_1} className='w-full'>
                                <p className='w-10/12 break-words'><span className='text-success'>(You) </span>{reply.comment}</p>
                                <div><span onClick={()=>handleDelete(reply.id,index_1,index)} className='text-xs text-red-600 cursor-pointer'>Delete</span> </div>
                                </div>
                        )
                    })}
                    </div>
                    }
                    <Textarea   variant="bordered" placeholder="Enter your reply"  value={reply[index]}  onChange={e => setReply(prev => ({ ...prev, [index]: e.target.value}))} endContent={<IoIosSend onClick={()=>handleSubmit(review.id,index)} className='cursor-pointer'  size={30}/>} />
                    </div> } 
            </div>
            </TableCell>
           </TableRow>

            )
        })
        :
        null

         }
      </TableBody>
    </Table>
    {reviews &&  <div className='flex w-full justify-center mt-4'><Pagination showControls total={count} onChange={(page)=>handleClick(page)} initialPage={1} /></div>}
      </div>

      
    </div>
  )
}
