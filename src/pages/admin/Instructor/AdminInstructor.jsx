
import React, { useEffect, useState } from 'react'

import { Table, TableCell, TableBody,TableColumn, TableHeader, TableRow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from '@nextui-org/react'
import {Pagination} from "@nextui-org/react";
import { API_URL } from '../../../constants/url';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios/AxiosInstance';
import { useDispatch } from 'react-redux';
import { end_loading, loading } from '../../../Slices/LodingSlice';

function AdminInstructors() {
  const initialPage = `/eduadmin/instructors`
  const navigate = useNavigate()
  const [pageCount, setPageCount] = useState(0)
  const [instructors,setInstructors] = useState([])
  const dispatch = useDispatch()

  const fetchData = (url=initialPage)=>{
      dispatch(loading())
      axiosInstance.get(url)
      .then(response=>{
          setInstructors(response.data.results)
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
    const url = `${API_URL}/eduadmin/instructors?page=${page}`
    fetchData(url)
      
  }
  const handleView = (id) =>{
    navigate(`/eduadmin/instructors/view/${id}`)

  }
    

  return (
    <div> 
        <div className='ml-56 w-9/12 mt-10'>
        <Table aria-label="Example table with dynamic content">
      <TableHeader>   
          <TableColumn >ID</TableColumn>
          <TableColumn >Image</TableColumn>
          <TableColumn >Name</TableColumn>
          <TableColumn >Email</TableColumn>
          <TableColumn >Status</TableColumn>
          <TableColumn>Action</TableColumn> 
      </TableHeader>
      <TableBody>
        {instructors.map((instructor,index)=>{return(
          <TableRow key={index} >
               <TableCell>{index+1}</TableCell>
               <TableCell><Avatar src={instructor.image?`${instructor.image}`:"/profileicon.jpg"}/></TableCell>
               <TableCell>{instructor.first_name}</TableCell>
               <TableCell>{instructor.email}</TableCell>
               <TableCell>{instructor.is_active?"Active":"Blocked"}</TableCell> 
               <TableCell>
                     <Button color='success' onClick={()=>handleView(instructor.id)} >View</Button> 
                </TableCell>
          </TableRow>
        )})}
      </TableBody>
    </Table>  
    <div className='flex w-full justify-center mt-4'><Pagination showControls total={pageCount} onChange={(page)=>handleClick(page)} initialPage={1} /></div>
     </div>
      
      
    </div>
  )
}

export default AdminInstructors
