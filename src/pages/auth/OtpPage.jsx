import React, { useEffect, useState } from 'react'
import Navbar1 from '../../components/user/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_URL } from '../../constants/url';
import { useLocation, useNavigate } from 'react-router-dom';


function OtpPage(prop) {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [otp,setOtp] = useState("")
    const handleSubmit = ()=>{
        const data = {
            'email' : state['email'],
            'otp' : otp
        }
       axios.post(`${API_URL}/users/otp/`,data)
       .then(response=>{
          if (response.data.message === 'success'){
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
             navigate('/login')
          }
          else{
            toast.error(`${response.data.message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

          }
       })
       .catch(error=>{
        console.log(error)
       })
    }


  return (
    <div>
        <Navbar1 />
        <div className="flex justify-center items-center mt-28">
  <div className="bg-white p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
    <div className="mb-4">
      <label for="otp" className="block text-gray-600 text-sm font-medium mb-1">OTP</label>
      <input type="text" id="otp" value={otp} onChange={e=>setOtp(e.target.value)} name="otp" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
    </div>

    <button type="button" onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
      Submit
    </button>
  </div>
</div>
        </div>
  )
}

export default OtpPage
