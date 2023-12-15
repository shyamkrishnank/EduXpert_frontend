import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminSideBar() {
    const navigate = useNavigate()

    const handleCourse = () => {
        navigate('/eduadmin/course')
    }
    const handleStudents = ()=>{
        navigate('/eduadmin/users')

    }
    const handleInstructor = () =>{
        navigate('/eduadmin/instructors')

    }
  return (
    <div className='flex h-5/6 ml-2 mb-8 mt-8  fixed'>
         <div className="bg-blue-500 text-white w-48 shadow-lg  rounded-lg">
        <div className="flex items-center justify-center h-20 border-b">
          <span className="text-2xl font-semibold">EduXpert</span>
        </div>
        <nav >
          <span className="flex items-center cursor-pointer  my-3 py-2 px-4 text-white hover:bg-blue-800">
             Dashboard
          </span>
          <span onClick={handleCourse} className="flex items-center cursor-pointer  my-3  py-2 px-4 text-white hover:bg-blue-800">
           Courses
          </span>
          <span onClick={handleStudents} className="flex items-center cursor-pointer my-3  py-2 px-4 text-white hover:bg-blue-800">
             Users
          </span>
          <span onClick={handleInstructor} className="flex items-center cursor-pointer my-3  py-2 px-4 text-white hover:bg-blue-800">
             Instructors
          </span>
        </nav>
      </div>
    </div>
  )
}

export default AdminSideBar
