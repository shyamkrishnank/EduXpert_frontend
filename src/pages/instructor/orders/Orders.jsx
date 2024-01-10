import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/AxiosInstance'
import { useSelector } from 'react-redux'
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { StripDate } from '../../../contents/dateStrip/utilities'
import { useNavigate } from 'react-router-dom'

function Orders() {
    const user = useSelector(state=>state.auth)
    const initialPage = `order/instructor/${user.id}`
    const navigate = useNavigate()
    const [orders,setOrders] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const fetchData = (url=initialPage)=>{
        axiosInstance.get(url)
        .then(response=>{
            console.log(response.data)
            setOrders(response.data.results)    
            setPageCount(Math.ceil(response.data.count/8))
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    
    const handleClick = (page) =>{
        console.log(page)
        const url = `order/instructor/${user.id}?page=${page}`
        fetchData(url)   
    }
    
    const handleView = (id) =>{
        navigate(`order/${id}`)

    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
        <div className='ml-28 flex mt-4'>
            <div className='w-4/5'><span className='text-4xl italic font-bold'>Orders </span></div>
        </div>
        <div className='ml-56 w-9/12 mt-10'>
        <Table aria-label="Example table with dynamic content">
      <TableHeader>   
          <TableColumn >ID</TableColumn>
          <TableColumn >Course</TableColumn>
          <TableColumn >User</TableColumn>
          <TableColumn >Order_id</TableColumn>
          <TableColumn >Payment_id</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Action</TableColumn> 
      </TableHeader>
      <TableBody>
        {orders.map((order,index)=>{return(
          <TableRow key={index} >
               <TableCell>{index+1}</TableCell>
               <TableCell>{order.course.course_title}</TableCell>
               <TableCell>{order.user.get_full_name}</TableCell>
               <TableCell>{order.order_id}</TableCell>
               <TableCell>{order.payment_id}</TableCell> 
               <TableCell>{StripDate(order.ordered_at)}</TableCell> 
               <TableCell>
                     <Button color='success' onClick={()=>handleView(order.id)} >View</Button> 
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

export default Orders
