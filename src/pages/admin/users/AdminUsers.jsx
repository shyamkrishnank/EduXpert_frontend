
import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Table, TableCell, TableBody,TableColumn, TableHeader, TableRow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from '@nextui-org/react'
import {Pagination} from "@nextui-org/react";
import { API_URL } from '../../../constants/url';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios/AxiosInstance';
import { useDispatch } from 'react-redux';
import { end_loading, loading } from '../../../Slices/LodingSlice';

function AdminUsers() {
  const initialPage = `${API_URL}/eduadmin/users`
  const navigate = useNavigate()
  const [pageCount, setPageCount] = useState(0)
  const [users,setUsers] = useState([])
  const dispatch = useDispatch()

  const fetchData = (url=initialPage)=>{
      dispatch(loading())
      axiosInstance.get(url)
      .then(response=>{
          setUsers(response.data.results)
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
    const url = `${API_URL}/eduadmin/users?page=${page}`
    fetchData(url)     
  }
  const handleView = (id) =>{
    navigate(`/eduadmin/users/view/${id}`)
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
        {users.map((user,index)=>{return(
          <TableRow key={index} >
               <TableCell>{index+1}</TableCell>
               <TableCell><Avatar src={user.image?`${user.image}`:"/profileicon.jpg"}/></TableCell>
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
