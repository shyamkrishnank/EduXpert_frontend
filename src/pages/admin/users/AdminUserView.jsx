import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Button, Image, Input, Textarea } from '@nextui-org/react'
import { API_URL } from '../../../constants/url'
import { StripDate } from '../../../contents/dateStrip/utilities'
import axiosInstance from '../../../axios/AxiosInstance'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { end_loading, loading } from '../../../Slices/LodingSlice'

function AdminUserView() {
    const {user_id} = useParams()
    const [user,setUser] = useState({})
    const [activebtn, setactivebtn] = useState("")
    const dispatch = useDispatch()

    const handleActive = () =>{
        setactivebtn("lodding")
        axiosInstance.get(`${API_URL}/eduadmin/user_status/${user_id}`)
        .then(response=>{
            setactivebtn(response.data.status)
        })
        .catch(error=>{
            console.log(error.message)
        })

    }

    useEffect(()=>{
        dispatch(loading())
        axiosInstance.get(`${API_URL}/eduadmin/users_details/${user_id}`)
        .then(response=>{
            setUser(response.data) 
            setactivebtn(response.data.is_active)
            dispatch(end_loading())
        })
        .catch(error=>{
            dispatch(end_loading())
        })

    },[])
  return (
    <div>
        <div className='ml-56 mr-8 mt-10'>
        <div className='grid grid-cols-3 grid-flow-row-dense mt-4'>
              <div className='mx-16'> 
                <Image
                    width={200}
                    height={200}
                    alt="/profileicon.jpg"
                    src={user.image?`${API_URL}${user.image}`:"/profileicon.jpg"}
                    className='cursor-pointer'
                    onClick=""
             />
             </div> 
             <div className='col-span-2 gap-4 grid grid-cols-2 '>
                <div><Input label="First Name" value={user.first_name} type='text'/></div>
                <div><Input label="Last Name" value={user.last_name} type='text'/></div>
                <div><Input label="Headline" value={user.headline?user.headline:'Not Added'} type='text'/></div>
                <div><Input label='Email' value={user.email}  type='text'/></div>
                <div><Input label='Phone' value={user.phone?user.phone:'Not Added'} type='text'/></div>
                <div><Input label='Social Link' value={user.social_link?user.social_link:'Not Added'}   type='text'/></div>
                <div><Input label='Joined On' value={StripDate(user.created_at)}  type='text'/></div>
                <div><Textarea  label="Bio" value={user.bio?user.bio:'Not Added'} /></div>
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

export default AdminUserView
