import React from 'react'
import Navbar1 from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import {Button} from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InstructorNav from '../../../components/InstructorNav';

function CoursePage() {
  const navigate = useNavigate()
  return (
    <div>
        <InstructorNav />
        <Sidebar />
        <div className='static'>
            <h1 className='absolute top-20 left-40 text-4xl italic font-bold'>Courses</h1>
            <Button className='absolute top-20 right-10 font-bold' 
                    onClick={()=>navigate('addtitle')} color="success"
                    endContent={<IoIosAdd />}>
                    Add Course
            </Button>    
        </div> 
    </div>
  )
}

export default CoursePage
