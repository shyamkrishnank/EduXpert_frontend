import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import axiosInstance from '../../../axios/AxiosInstance';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, CardBody, Card} from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { end_loading, loading } from '../../../Slices/LodingSlice';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';




function AdminHome() {
  const[orders,setOrders] = useState()
  const labels = orders?.date
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const instuctor_data = {
    labels: labels,
    datasets: [
      {
        label: "Instructors joined in last five days",
        backgroundColor: "rgb(255, 99, 132)", 
        borderColor: "rgb(255, 99, 132)", 
        data: orders?.instructor_count, 
      },
    ],
  }

  const order_data = {
    labels: labels,
    datasets: [
      {
        label: "Instructors joined in last five days",
        backgroundColor: "rgb(75, 192, 192)", 
        borderColor: "rgb(75, 192, 192",
        data: orders?.order_count, 
      },
    ],
  }




  const user_data = {
    labels: labels,
    datasets: [
      {
        label: "Students joined in last five days",
        backgroundColor: "rgb(0, 0, 255)", 
        borderColor: "rgb(0, 0, 255)", 
        data: orders?.user_count, 
      },
    ],
  }
  useEffect(()=>{
    dispatch(loading())
    axiosInstance.get('/eduadmin/dashboard')
    .then(response=>{
      setOrders(response.data)
      dispatch(end_loading())
    })
    .catch(error=>{
      console.log(error.message)
      dispatch(end_loading())
    })

  },[])



  return (
    <div className='ml-56'>
      <div className='flex flex-row mt-9 gap-3 mr-4'>
        <div className='basis-1/3 flex justify-center'>
            <Card className='w-2/3'>
              <CardBody>
                <div>
                  <div className='flex w-full justify-center drop-shadow-lg'><h1 className='text-2xl font-semibold'>Total Students</h1></div>
                  <div className='flex w-full justify-center'><span className='text-3xl font-semibold'>{orders?.total_user_count}</span></div>
                </div>
              </CardBody>
            </Card>
        </div>
        <div className='basis-1/3 flex justify-center'>
            <Card className='w-2/3'>
              <CardBody>
                <div>
                  <div className='flex w-full justify-center drop-shadow-lg'><h1 className='text-2xl font-semibold'>Total Instructors</h1></div>
                  <div className='flex w-full justify-center'><span className='text-3xl font-semibold'>{orders?.total_instructor_count}</span></div>
                </div>
              </CardBody>
            </Card>
        </div>
        <div className='basis-1/3 flex justify-center'>
            <Card className='w-2/3'>
              <CardBody>
                <div>
                  <div className='flex w-full justify-center drop-shadow-lg'><h1 className='text-2xl font-semibold'>Active Courses </h1></div>
                  <div className='flex w-full justify-center'><span className='text-3xl font-semibold'>{orders?.total_course_count}</span></div>
                </div>
              </CardBody>
            </Card>
        </div>
      </div>
      <div className='flex w-full mt-5'>
        <h1 className='text-3xl'>New Joiners</h1>
      </div>
      <div className='w-full flex flex-row mt-9 mr-4'>
        <div className='basis-1/2 flex flex-col gap-2 justify-center'>
          <div>Recent joined instructors</div>
           <div className='flex justify-center'><Line data={instuctor_data}/> </div>
        </div>
        <div className='basis-1/2  flex flex-col gap-2 justify-center'>
           <div>Recent joined students</div>
           <div className='flex justify-center'><Line data={user_data} /> </div>
        </div>
      </div>
      <div>
          <div className='flex flex-row'>
          <div className='basis-1/2 mb-12'>
            <div className='mb-4 mt-5'>
                  <h1 className='text-xl'>
                      LATEST ORDERS
                  </h1>
              </div>
             <div className='flex justify-center w-11/12'><Bar data={order_data} /> </div>
          </div>
          {orders?.pending_courses?.length > 0 &&
          <div className='basis-1/2 mb-12 mr-4'>
            <div className='mb-4 mt-5'>
                <h1 className='text-xl'>
                    PENDING COURSES
                </h1>
            </div>
              <Table 
              selectionMode="single" 
              aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>No</TableColumn>
                  <TableColumn>Id</TableColumn>
                  <TableColumn>Title</TableColumn>
                </TableHeader>
                <TableBody>
                  {orders && orders.pending_courses?.length > 0 ?
                  orders.pending_courses.map((course,index)=>{
                    return( 
                  <TableRow onClick={()=>navigate(`course/view/${course.id}`)} className='cursor-pointer hover:text-green-500' key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.course_title}</TableCell>
                  </TableRow>
                   )
                  })
                  :
                  null
                  }
                </TableBody>
              </Table>
              </div>
}
              </div>


            </div>
    </div>
  )
}

export default AdminHome
