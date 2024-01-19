import React, { useState } from 'react'
import Navbar1 from '../../components/user/Navbar'
import { Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../axios/AxiosInstance'
import { useDispatch } from 'react-redux'
import { end_loading, loading } from '../../Slices/LodingSlice'

function EnterNewPassword() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const email = location.state && location.state.email
    const [password , setPassword] = useState()
    const [c_password, setC_password] = useState()

    const handleSubmit = () =>{
        if (password !== c_password){
            toast.error("Password didn't matched!", {
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
            dispatch(loading())
            const data = {
                'email':email,
                'password':password
            }
            axiosInstance.post('/users/set_password/',data)
            .then(response=>{
                dispatch(end_loading())
                toast.success('Changed password successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });   
                navigate('/login',{state:{'data':response.data}})
            })
            .catch(error=>{
                dispatch(end_loading())
                toast.error(`${error.response.data.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });    

            })
        }
    }

  return (
    <div>
        <Navbar1 />
    <div className='flex justify-center items-center min-h-screen bg-[url("/loginbackground.jpg")] bg-no-repeat bg-cover'>
      <Card className='max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md'>
        <CardHeader>
          <h1 className='font-bold text-2xl text-center text-blue-600 mb-4'>Enter New Password</h1>
        </CardHeader>
        <CardBody>
          <Input className='my-1' value={password} onChange={e=>setPassword(e.target.value)}     size={'md'} type="password" label="New Password" required/>
          <Input className='my-1' value={c_password} onChange={e=>setC_password(e.target.value)}  size={'md'} type="password" label="Confirm Password" required/>
        </CardBody>
        <div className='mt-6'>
          <button onClick={handleSubmit}
            className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
            type='button'
          >
            Submit
          </button>
        </div>
        
      </Card>
    </div>
      
    </div>
  )
}

export default EnterNewPassword
