import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../axios/AxiosInstance'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button
  } from "@nextui-org/react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { StripDate, StripTime } from '../../../contents/dateStrip/utilities';

function OrderDetailPage() {
    const {order_id} = useParams()
    const navigate = useNavigate()
    const [order,setOrder] = useState()
    console.log("ordr",order)
    useEffect(()=>{
        axiosInstance.get(`/order/orderdetailview/${order_id}`)
        .then(response=>{
            console.log(response.data)
            setOrder(response.data)
        })
        .catch(error=>{
            console.log('orderdetails',error)
        })

    },[])
  return (
    <div className='mt-10 ml-28'>
            <div className='w-4/5'><span className='text-3xl italic font-bold'>Order Details</span></div>
        {order && 
        <div className='flex'>
         <div className='w-8/12'>
        <div>
        <h1 className='text-lg font-medium ml-2 my-3'>Ordered Course</h1>
         <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Course</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Chapter Count</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>{order && order.course.course_title}</TableCell>
          <TableCell>{order  && order.course.price}</TableCell>
          <TableCell>{order && order.course.chapter_count}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
    <div className='mt-10'>
    <h1 className='text-lg font-medium ml-2 my-3'>Transactions</h1>
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Id</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Amount</TableColumn>
\        <TableColumn>Payment_id</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell className='text-xm'>{order && order.order_id}</TableCell>
          <TableCell>{order  && `${StripDate(order.ordered_at)} ${StripTime(order.ordered_at)}`}</TableCell>
          <TableCell>{order && order.status ? "Success":"Failed"}</TableCell>
          <TableCell>{order && order.course.price}</TableCell>
          <TableCell>{order && order.payment_id}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
    </div> 
    <div className='w-4/12 mt-9 px-5'>
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
         <p className="font-bold text-lg">Student</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className='flex'>
            <div className='w-8/12'>
                <p className='font-medium my-2'>{order.user.get_full_name}</p>
                <p className='text-sm my-1'>{order.user.email}</p>
                <p className='text-sm my-1'>{order.user.phone ? order.user.phone : 'phone : ***'}</p>
                <Button onClick={()=>navigate('/instructor/chats', { state: { chat_with_id: order.user.id } })} className='mt-3' color='success' >Message</Button>

            </div>
            <div className='flex justify-center'>
            <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={order.user.image?`${order.user.image}`:'/profileicon.jpg'}
                width={200}
                />
            </div>
        </div> 
      </CardBody>
    </Card>
    <div className='border-2 border-black-700 mt-4 px-4 py-4 '>
        <div className='w-8/12'>
        <h1 className='font-medium text-lg mb-3'>Order Details</h1>
        <p className='text-sm font-semibold'>Order Status:</p>
        <p className='text-sm my-1'>{order && order.status ? "Success":"Failed"}</p>
        <p className='text-sm font-semibold'>Date Purchased:</p>
        <p className='text-sm my-1'>{order  && `${StripDate(order.ordered_at)} ${StripTime(order.ordered_at)}`}</p>
        <p className='text-sm font-semibold my-1'>Payment Signature:</p>
        <p className='text-xs break-words'>{order.signature}</p>
        </div>
    </div>
    </div>
    </div>
    } 
    </div>

  )
}

export default OrderDetailPage
