import React, { useEffect, useState } from 'react'
import Navbar1 from '../../components/user/Navbar'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../constants/url';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/AxiosInstance';
import { useDispatch } from 'react-redux';
import { end_loading, loading } from '../../Slices/LodingSlice';
import { Button } from '@nextui-org/react';


function OtpPage() {
    const { state } = useLocation()
    const [remainingTime, setRemainingTime] = useState(60)
    const [resend,setResend] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp,setOtp] = useState("")
    const handleSubmit = ()=>{
        const data = {
            'email' : state['email'],
            'otp' : otp
        }
      dispatch(loading())
       axiosInstance.post(`${API_URL}/users/otp/`,data)
       .then(response=>{
          dispatch(end_loading())
            toast.success('Please Login to Enter!', {
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
        console.log(error)
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
       })
    }

    const handleResend = () =>{
      dispatch(loading())
      const data = {
        'email' : state['email']
      }
      axiosInstance.post('/users/resend_otp/',data)
      .then(response=>{
        dispatch(end_loading())
        setRemainingTime(60)
        toast.success(`${response.data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setResend(false)

      })
      .catch(error=>{
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
          dispatch(end_loading())
          
      })
    }
    
    useEffect(() => {
      if (remainingTime <= 0) {
        return setResend(true)
      }
  
      const timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
  
      return () =>{
        clearInterval(timerInterval)
      } ;
    }, [remainingTime])
  
    
  return (
    <div >
     <Navbar1 />
      <div className="flex justify-center items-center min-h-screen bg-[url('/loginbackground.jpg')] bg-no-repeat bg-cover">
         <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
          <div className="mb-4">
            <label for="otp" className="block text-gray-600 text-sm font-medium mb-1">OTP</label>
            <input type="text" id="otp" maxlength="4" value={otp} onChange={e=>setOtp(e.target.value.trim())} name="otp" className="w-full p-2 border text-center text-2xl border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <Button type="button" isDisabled={resend?true:false} onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Submit
          </Button>
          {resend? 
           <div className='flex justify-center pt-2' ><Button onClick={handleResend}  size='sm' className='text-white' color='success'>Resend Otp</Button></div>
          :
          <div className='flex justify-center pt-2 text-danger-500'><p>Remaining Time: {remainingTime} seconds</p></div>

          }
        </div>
       </div>
        </div>
  )
}

export default OtpPage
