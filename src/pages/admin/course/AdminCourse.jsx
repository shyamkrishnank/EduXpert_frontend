import React, { useEffect, useState } from 'react'
import { Table, TableCell, TableBody,TableColumn, TableHeader, TableRow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import {Pagination} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import {StripDate} from '../../../contents/dateStrip/utilities'
import axiosInstance from '../../../axios/AxiosInstance';
import { useDispatch } from 'react-redux';
import { end_loading, loading } from '../../../Slices/LodingSlice';



function AdminCourse() {
    const initialPage = `/eduadmin/course`
    const navigate = useNavigate()
    const [pageCount, setPageCount] = useState(0)
    const [courses,setCourses] = useState([])
    const dispatch = useDispatch()


    const fetchData = (url=initialPage)=>{
        dispatch(loading())
        axiosInstance.get(url)
        .then(response=>{
            setCourses(response.data.results)
            setPageCount(Math.ceil(response.data.count/6))
            dispatch(end_loading())
        })
        .catch(error=>{
            dispatch(end_loading())
        })
    }
    useEffect(()=>{
        fetchData()
    },[])

    const handleClick = (page) =>{
        const url = `${initialPage}?page=${page}`
        fetchData(url)

    }
    const handleView = (id) =>{
        navigate(`view/${id}`)
    }
   
  return (
    <div>
        <div className='ml-56 w-9/12 mt-10'>
        <Table aria-label="Example table with dynamic content">
      <TableHeader>   
          <TableColumn >ID</TableColumn>
          <TableColumn >Course</TableColumn>
          <TableColumn >Created at</TableColumn>
          <TableColumn >Status</TableColumn>
          <TableColumn>Action</TableColumn> 
      </TableHeader>
      <TableBody>
        {courses.map((course,index)=>{return(
          <TableRow key={index} >
               <TableCell>{index+1}</TableCell>
               <TableCell>{course.course_title}</TableCell>
               <TableCell>{StripDate(course.created_at)}</TableCell>
               <TableCell>{course.status}</TableCell>
               <TableCell>
                    <Button onClick={()=>handleView(course.id)} >View</Button>
                </TableCell>
          </TableRow>
        )})}
      </TableBody>
    </Table>  
    <div className='flex w-full justify-center mt-4'><Pagination showControls total={pageCount} onChange={(page)=>handleClick(page)} initialPage={1} /></div>  </div>
      
    </div>
  )
}

export default AdminCourse
