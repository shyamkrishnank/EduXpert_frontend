import React, { useState } from 'react'
import Navbar1 from '../../components/user/Navbar'
import {CardHeader,RadioGroup, Radio, Input ,Card, CardBody} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {API_URL} from "../../constants/url"
import GoogleBtn from '../../components/google/GoogleBtn';
import axiosInstance from '../../axios/AxiosInstance';
import { useDispatch } from 'react-redux';
import { end_loading, loading } from '../../Slices/LodingSlice';


function SignupPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
      dispatch(loading())
      const data = {
        "first_name":f_name,
        "last_name" :l_name,
        "email" : email,
        "password" : password,
        "is_staff" : staff
      }
      axiosInstance.post(`${API_URL}/users/register/`,data)
      .then(()=>{
        dispatch(end_loading())
        toast.success('OTP has been sented to your mail!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          navigate('otp',{state:{'email':email}})  
      })
      .catch((error)=>{
        dispatch(end_loading())
        console.log(error)
        toast.error(error.response.data.message, {
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
    <div className='flex justify-center items-center min-h-screen bg-[url("/loginbackground.jpg")] bg-no-repeat bg-cover'>
      <Card className='max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md'>
        <CardHeader>
          <h1 className='font-bold text-2xl text-center text-blue-600 mb-2'>Sign Up</h1>
        </CardHeader>
        <CardBody>
          <Input className='my-1' value={f_name} onChange={e=>setF_name(e.target.value.trim())} size={'md'} type="text" label="First Name" required/>
          <Input className='my-1' value= {l_name} onChange={e=>setL_name(e.target.value.trim())} size={'md'} type="text" label="Last Name" required />
          <Input className='my-1'value= {email} onChange={e=>setEmail(e.target.value.trim())}  size={'md'} type="email" label="Email" required/>
          <Input className='my-1' value= {password} onChange={e=>setPassword(e.target.value.trim())}  size={'md'} type="password" label="Password" required/>
          <Input className='my-1'value= {c_password} onChange={e=>setCpassword(e.target.value.trim())}  size={'md'} type="password" label="Confirm Password" required/>
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
          <h1>Or</h1>
          <GoogleBtn url={'/users/googlesignup/'} isLogin={false} />         
        </div>
      </Card>
    </div>
    </>
  )
}

export default SignupPage
