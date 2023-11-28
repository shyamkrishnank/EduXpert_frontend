import React, { useState } from 'react'
import Navbar1 from '../../components/Navbar'
import {CardHeader,RadioGroup, Radio, Input ,Card, CardBody} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {API_URL} from "../../constants/url"


function SignupPage() {
  const navigate = useNavigate()
  const[f_name,setF_name] = useState("")
  const[l_name,setL_name] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[c_password,setCpassword] = useState("")
  const[staff,setStaff] = useState('0')
  const handleSubmit = () =>{
    const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const check = validateEmail(email)
    if (f_name === "" || l_name == "" || email === "" || password === "" || c_password === ""){
      toast.error('All fields required!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
     }
    else if (password !== c_password){
      toast.error('Wrong Password!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    }
    else if(!check){
      toast.error('Enter the valid email!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    }
    else{
      const data = {
        "first_name":f_name,
        "last_name" :l_name,
        "email" : email,
        "password" : password,
        "is_staff" : staff
      }
      axios.post(`${API_URL}/users/register/`,data)
      .then(()=>{
        navigate('otp',{state:{'email':email}})  
      })
      .catch(()=>{
        toast.error('Something Went Wrong!', {
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
    <>
    <Navbar1 />
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <Card className='max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md'>
        <CardHeader>
          <h1 className='font-bold text-2xl text-center text-blue-600 mb-4'>Sign Up</h1>
        </CardHeader>
        <CardBody>
          <Input className='my-1' value={f_name} onChange={e=>setF_name(e.target.value)} size={'md'} type="text" label="First Name" required/>
          <Input className='my-1' value= {l_name} onChange={e=>setL_name(e.target.value)} size={'md'} type="text" label="Last Name" required />
          <Input className='my-1'value= {email} onChange={e=>setEmail(e.target.value)}  size={'md'} type="email" label="Email" required/>
          <Input className='my-1' value= {password} onChange={e=>setPassword(e.target.value)}  size={'md'} type="password" label="Password" required/>
          <Input className='my-1'value= {c_password} onChange={e=>setCpassword(e.target.value)}  size={'md'} type="password" label="Confirm Password" required/>
          <RadioGroup
          className='mt-3'
          value={staff}
          onValueChange={setStaff}
      orientation="horizontal">
      <Radio value='0'>Student</Radio>
      <Radio value="1">Instructor</Radio>
    </RadioGroup>
        </CardBody>
        <div className='mt-6'>
          <button onClick={handleSubmit}
            className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
            type='button'>
            Sign Up
          </button>
         
        </div>
      </Card>
    </div>
    </>
  )
}

export default SignupPage
