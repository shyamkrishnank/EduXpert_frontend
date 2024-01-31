import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/AxiosInstance'
import { Table, TableCell, TableBody,TableColumn, TableHeader, TableRow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar, Pagination } from '@nextui-org/react'
import { StripDate } from '../../../contents/dateStrip/utilities'
import { useDispatch } from 'react-redux'
import { end_loading, loading } from '../../../Slices/LodingSlice'
import { useNavigate } from 'react-router-dom'


function AdminOrders() {
    const [orders, setOrders] = useState()
    const [pageCount, setPageCount] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchData = (page=1)=>{
      dispatch(loading())
      axiosInstance.get(`/eduadmin/orders?page=${page}`)
      .then(response=>{
          setOrders(response.data.results)    
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
      fetchData(page)   
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
          <TableColumn>Action</TableColumn> 

      </TableHeader>
      <TableBody>
      {orders?.map((order,index)=>{return(
          <TableRow key={index} >
               <TableCell>{index+1}</TableCell>
               <TableCell>{order.course.course_title}</TableCell>
               <TableCell>{order.user.get_full_name}</TableCell>
               <TableCell>{order.order_id}</TableCell>
               <TableCell>{order.payment_id}</TableCell> 
               <TableCell>{StripDate(order.ordered_at)}</TableCell> 
               <TableCell>
                     <Button color='success' onClick={()=>navigate(`view/${order.id}`)} >View</Button> 
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

export default AdminOrders
