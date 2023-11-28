import React, { useState } from 'react'
import {CardHeader, Input ,Card, CardBody} from "@nextui-org/react";import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from '../../components/admin/AdminNav';


function AdminLogin() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleSubmit = () =>{
        

    }
  return (
    <div>
      <AdminNav />
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <Card className='max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md'>
        <CardHeader>
          <h1 className='font-bold text-2xl text-center text-blue-600 mb-4'>Login</h1>
        </CardHeader>
        <CardBody>
          <Input className='my-1'value= {email} onChange={e=>setEmail(e.target.value)}  size={'md'} type="email" label="Email" required/>
          <Input className='my-1' value= {password} onChange={e=>setPassword(e.target.value)}  size={'md'} type="password" label="Password" required/>
        </CardBody>
        <div className='mt-6'>
          <button onClick={handleSubmit}
            className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
            type='button'
          >
            Log In
          </button>
        </div>
        
      </Card>
    </div>
    <ToastContainer
   position="top-center"
   autoClose={3000}
   hideProgressBar={false}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   pauseOnFocusLoss
   draggable
   pauseOnHover
   theme="colored"
     />
    </div>
  )
}

export default AdminLogin