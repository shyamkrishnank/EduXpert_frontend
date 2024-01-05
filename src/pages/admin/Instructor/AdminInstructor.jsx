
import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Table, TableCell, TableBody,TableColumn, TableHeader, TableRow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from '@nextui-org/react'
import {Pagination} from "@nextui-org/react";
import { API_URL } from '../../../constants/url';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios/AxiosInstance';

function AdminInstructors() {
  const initialPage = `${API_URL}/eduadmin/instructors`
  const navigate = useNavigate()
  const [pageCount, setPageCount] = useState(0)
  const [instructors,setInstructors] = useState([])
  const fetchData = (url=initialPage)=>{
      axiosInstance.get(url)
      .then(response=>{
          console.log(response.data)
          setInstructors(response.data.results)
          setPageCount(Math.ceil(response.data.count/2))
      })
      .catch(error=>{
          console.log(error.message)
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
    localStorage.setItem('current_instructor', id)
    navigate('/eduadmin/instructors/view')

  }
    

  return (
    <div>
        <AdminNav />
        <AdminSideBar/> 
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
               <TableCell>1</TableCell>
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
