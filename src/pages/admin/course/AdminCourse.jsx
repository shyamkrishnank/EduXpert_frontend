import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Table, TableCell, TableBody,TableColumn, TableHeader, TableRow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import {Pagination} from "@nextui-org/react";
import { API_URL } from '../../../constants/url';
import { useNavigate } from 'react-router-dom';
import {StripDate} from '../../../contents/dateStrip/utilities'
import axiosInstance from '../../../axios/AxiosInstance';



function AdminCourse() {
    const initialPage = `${API_URL}/eduadmin/course`
    const navigate = useNavigate()
    const [pageCount, setPageCount] = useState(0)
    const [courses,setCourses] = useState([])
    const fetchData = (url=initialPage)=>{
        axiosInstance.get(url)
        .then(response=>{
            console.log(response.data)
            setCourses(response.data.results)
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
        const url = `${initialPage}?page=${page}`
        fetchData(url)

    }
    const handleView = (id) =>{
        localStorage.setItem('course_id', id) 
        navigate('view')
    }
   
  return (
    <div>
        <AdminNav />
        <AdminSideBar/> 
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
               <TableCell>1</TableCell>
               <TableCell>{course.course_title}</TableCell>
               <TableCell>{StripDate(course.created_at)}</TableCell>
               <TableCell>{course.status}</TableCell>
               <TableCell>
                <Dropdown>
                <DropdownTrigger>
                    <Button 
                    isIconOnly
                    size="sm" variant="light"
                    >
                        :
                    </Button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Action event example">
                    <DropdownItem onClick={()=>handleView(course.id)} key="view">View</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger"> Delete  </DropdownItem>
                </DropdownMenu>
                </Dropdown>
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
