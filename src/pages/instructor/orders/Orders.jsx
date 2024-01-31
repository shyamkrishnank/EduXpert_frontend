import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { StripDate } from '../../../contents/dateStrip/utilities'
import { useNavigate } from 'react-router-dom'
import { IoWalletSharp } from "react-icons/io5";
import { end_loading, loading } from '../../../Slices/LodingSlice'


function Orders() {
    const user = useSelector(state=>state.auth)
    const initialPage = `order/instructor/${user.id}`
    const navigate = useNavigate()
    const [orders,setOrders] = useState()
    const [pageCount, setPageCount] = useState(0)
    const dispatch = useDispatch()




    const fetchData = (url=initialPage)=>{
        dispatch(loading())
        axiosInstance.get(url)
        .then(response=>{
            setOrders(response.data.results)    
            setPageCount(Math.ceil(response.data.count/8))
            dispatch(end_loading())
        })
        .catch(error=>{
          dispatch(end_loading())
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
          <div className='w-4/5'><span className='text-4xl italic font-bold'>Orders</span></div>
          <div className='w-1/5 justify-end'> 
           <Button className='absolute top-20 right-10 font-bold' 
                    onClick={()=>navigate('/instructor/mywallet')} color="primary"
                    endContent={<IoWalletSharp size={22} /> }>
                    My Wallet
            </Button></div>
        </div>
        {orders && orders.length ? 
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
     </div> :
     
      <div className='flex justify-center w-full mt-10 text-xl'>
        No Orders For Any Orders Yet!
     </div>
     }
      
    </div>
  )
}

export default Orders
