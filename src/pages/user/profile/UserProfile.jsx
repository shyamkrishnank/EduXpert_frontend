import React, { useRef, useState } from 'react'
import Navbar1 from '../../../components/user/Navbar'
import UseProfile from '../../../hooks/UseProfile'
import { API_URL } from '../../../constants/url'
import { Button, Image, Input, Textarea } from '@nextui-org/react'
import ObjectToForm from '../../instructor/util/ObjectToForm'
import { toast } from 'react-toastify'
import axiosInstance from '../../../axios/AxiosInstance'

function UserProfile() {
const [image,setImage] = useState('')
  const imageRef = useRef('')
  const [user,setUser] = UseProfile()
  const handleImage = (e) =>{
        imageRef.current.click()
  }
  const handleSubmit = () =>{
    if (user.first_name == "" || user.last_name == "" ){
      toast.error('First name and Last name should be filled!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    else{
    const id = user.id
    const data = ObjectToForm(user)
    if (image){
      data.append('image',image)
    }
    axiosInstance.post(`${API_URL}/users/profile/${id}`,data)
    .then(()=>{
      toast.success('Profile Edited Successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
    .catch(error=>{
      console.log(error.message)
    })
   }

  }

  return (
    <div>
        <Navbar1 />
        <div className='mt-6 mx-28'>
            <h1 className='text-2xl mb-4 italic font-bold'>Personal Info</h1>
            <p>You can edit your personal informations here</p>
            <div className='grid grid-cols-3 grid-flow-row-dense mt-4'>
              <div className='mx-16'> 
              <input type='file' value={''} onChange={e=>{setImage(e.target.files[0])}}  ref={imageRef} className='hidden' />
                <Image
                    width={200}
                    height={200}
                    alt="/profileicon.jpg"
                    src={image?URL.createObjectURL(image):`${API_URL}${user.image}`}
                    className='cursor-pointer'
                    onClick={handleImage}
             />
             </div> 
             <div className='col-span-2 gap-4 grid grid-cols-2 '>
                <div><Input label="First Name" onChange={e=>setUser(prev=>({...prev,first_name : e.target.value}))} value={user.first_name} type='text'/></div>
                <div><Input label="Last Name" onChange={e=>setUser(prev=>({...prev,last_name: e.target.value}))} value={user.last_name} type='text'/></div>
                <div><Input label="Headline" value={user.headline?user.headline:null}  onChange={e=>setUser(prev=>({...prev,headline : e.target.value?e.target.value:null}))} type='text'/></div>
                <div><Input label='Email' value={user.email}  type='text'/></div>
                <div><Input label='Phone'  value={user.phone?user.phone:null} onChange={e=>setUser(prev=>({...prev,phone:e.target.value?e.target.value:null}))} type='text'/></div>
                <div><Input label='Social Link'  value={user.sociallink?user.sociallink:null} onChange={e=>setUser(prev=>({...prev,sociallink:e.target.value?e.target.value:null}))} type='text'/></div>
                <div><Textarea  label="Bio"  value={user.bio?user.bio:null} onChange={e=>setUser(prev=>({...prev,bio:e.target.value}))} /></div>

             </div>
               <div className='col-start-1 mt-6 col-end-7 justify-self-center'>
                 <Button onClick={handleSubmit} color="success" variant="bordered" >Save Changes</Button>
                 <h1 className='mt-3 text-danger cursor-pointer'>Change Password ?</h1>
                </div>
            </div> 
            <div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile
