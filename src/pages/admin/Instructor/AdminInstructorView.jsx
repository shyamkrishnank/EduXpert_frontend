import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Accordion, AccordionItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Input, Listbox, ListboxItem, Textarea } from '@nextui-org/react'
import { API_URL } from '../../../constants/url'
import { useNavigate } from 'react-router-dom'
import {StripDate} from '../../../contents/dateStrip/utilities'
import axiosInstance from '../../../axios/AxiosInstance'

function AdminInstructorView() {

    const id = localStorage.getItem('current_instructor')
    const navigate = useNavigate()
    const [instructor,setinstructor] = useState({})
    const [activebtn, setactivebtn] = useState("")
    const handleActive = () =>{
        setactivebtn("lodding")
        axiosInstance.get(`${API_URL}/eduadmin/instructor_status/${id}`)
        .then(response=>{
            
            setactivebtn(response.data.status)
        })
        .catch(error=>{
            console.log(error.message)
        })

    }
    const handleCourse = (id) => {
        console.log(id)
        localStorage.setItem('course_id', id) 
        navigate('/eduadmin/course/view')

    }
    useEffect(()=>{
        axiosInstance.get(`${API_URL}/eduadmin/instructors_details/${id}`)
        .then(response=>{
            console.log(response.data)
            setinstructor(response.data) 
            setactivebtn(response.data.is_active)
        })
        .catch(error=>{
            console.log(error.data)
        })
    },[])
  return (
    <div>
        <AdminNav />
        <AdminSideBar/> 
        <div className='ml-56 mr-8 mt-10'>
        <div className='grid grid-cols-3 grid-flow-row-dense mt-4'>
              <div className='mx-16'> 
                <Image
                    width={200}
                    height={200}
                    alt="/profileicon.jpg"
                    src={instructor.image?`${API_URL}${instructor.image}`:"/profileicon.jpg"}
                    className='cursor-pointer'
                    onClick=""
             />
             </div> 
             <div className='col-span-2 gap-4 grid grid-cols-2 '>
                <div><Input label="First Name" value={instructor.first_name} type='text'/></div>
                <div><Input label="Last Name" value={instructor.last_name} type='text'/></div>
                <div><Input label="Headline" value={instructor.headline?instructor.headline:'Not Added'} type='text'/></div>
                <div><Input label='Email' value={instructor.email}  type='text'/></div>
                <div><Input label='Phone' value={instructor.phone?instructor.phone:'Not Added'} type='text'/></div>
                <div><Input label='Social Link' value={instructor.social_link?instructor.social_link:'Not Added'}   type='text'/></div>
                <div><Input label='Joined On' value={StripDate(instructor.created_at)}  type='text'/></div>
                <div><Textarea  label="Bio" value={instructor.bio?instructor.bio:'Not Added'} /></div>
                <div>
                    <Accordion disabledKeys={["2"]}>
                        <AccordionItem key="1" aria-label="Accordion 1" subtitle="Press to expand" title="Courses">
                        <Listbox aria-label="Listbox Variants" >
                            {instructor.courses && instructor.courses.map((course,index)=>{return(
                            <ListboxItem startContent={'.'} onClick={()=>handleCourse(course.id)} key={index}>{course.course_title}</ListboxItem>
                            )})}
                        </Listbox>
                        </AccordionItem>
                    </Accordion>
                                

                </div>
             </div>
               <div className='col-start-1 mt-6 col-end-7 justify-self-center'>
               {activebtn == true && <Button onClick={handleActive} color='success'>Active</Button> }
                {activebtn == false && <Button onClick={handleActive} color='danger'>Inactive</Button>}
                {activebtn == 'lodding' && <Button isLoading color="secondary"  spinner={<svg
                className="animate-spin h-5 w-5 text-current" fill="none"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                <circle  className="opacity-25"    cx="12"  cy="12"  r="10"   stroke="currentColor"   strokeWidth="4"    />
                <path   className="opacity-75"  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"    />   </svg>  }  > Loading    </Button>} 
                </div>
            </div> 


        </div>
      
    </div>
  )
}

export default AdminInstructorView