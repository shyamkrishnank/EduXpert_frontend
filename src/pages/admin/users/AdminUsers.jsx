
import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Table, TableCell, TableBody,TableColumn, TableHeader, TableRow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from '@nextui-org/react'
import {Pagination} from "@nextui-org/react";
import axios from 'axios';
import { API_URL } from '../../../constants/url';
import { useNavigate } from 'react-router-dom';

function AdminUsers() {
  const initialPage = `${API_URL}/eduadmin/users`
  const navigate = useNavigate()
  const [pageCount, setPageCount] = useState(0)
  const [users,setUsers] = useState([])
  const fetchData = (url=initialPage)=>{
      axios.get(url)
      .then(response=>{
          console.log(response.data)
          setUsers(response.data.results)
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
    const url = `${API_URL}/eduadmin/users?page=${page}`
    fetchData(url)
      
  }
  const handleView = (id) =>{
    localStorage.setItem('current_user', id)
    navigate('/eduadmin/users/view')

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
        {users.map((user,index)=>{return(
          <TableRow key={index} >
               <TableCell>1</TableCell>
               <TableCell><Avatar src={user.image?`${API_URL}${user.image}`:"/profileicon.jpg"}/></TableCell>
               <TableCell>{user.first_name}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell>{user.is_active?"Active":"Blocked"}</TableCell> 
               <TableCell>
                     <Button color='success' onClick={()=>handleView(user.id)} >View</Button> 
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

export default AdminUsers
