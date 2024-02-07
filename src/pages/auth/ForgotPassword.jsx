import React, { useEffect, useState } from 'react'
import Navbar1 from '../../components/user/Navbar'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import axiosInstance from '../../axios/AxiosInstance'
import { useDispatch } from 'react-redux'
import { end_loading, loading } from '../../Slices/LodingSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [email,setEmail] = useState()
    const [remainingTime, setRemainingTime] = useState(60)
    const [resend,setResend] = useState(false)
    const [otpsend,setOtpSend] = useState(false)
    const [otp,setOtp] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate ()

    const handleSubmit = () =>{
        const data = {
            'email':email
        }
        dispatch(loading())
        axiosInstance.post('/users/forget_password/', data)
        .then(response=>{
            console.log(response)
            setRemainingTime(60)
            setOtpSend(true)
            dispatch(end_loading())
            

        })
        .catch(error=>{
            toast.error(`${error.response.data.message}`, {
                position: "top-center",
                autoClose: 2000,
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

   


      const handleResend = () =>{
        dispatch(loading())
        const data = {
          'email' : email
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

      const handleOtpSubmit = () =>{
       const data = {
        'email':email,
        'otp':otp
       }
       dispatch(loading())
       axiosInstance.post(`/users/otp/`,data)
       .then(response=>{
        dispatch(end_loading())
        navigate('/new_password',{state:{'email':response.data.email}})

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

  return (
    <div>
          <Navbar1 />
          <div className={`flex justify-center items-center min-h-screen bg-[url("https://eduxpert.cloud/static/loginbackground.jpg")] bg-no-repeat bg-cover`}>
        {otpsend?
        <div>

       <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
          <div className="mb-4">
            <label for="otp" className="block text-gray-600 text-sm font-medium mb-1">OTP</label>
            <input type="text" id="otp" maxlength="4" value={otp} onChange={e=>setOtp(e.target.value.trim())} name="otp" className="w-full p-2 border text-center text-2xl border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <Button type="button" isDisabled={resend?true:false} onClick={handleOtpSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Submit
          </Button>
          {resend? 
           <div className='flex justify-center pt-2' ><Button onClick={handleResend}  size='sm' className='text-white' color='success'>Resend Otp</Button></div>
          :
          <div className='flex justify-center pt-2 text-danger-500'><p>Remaining Time: {remainingTime} seconds</p></div>

          }
        </div>

        </div>
            :
      <Card className='max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md'>
        <CardHeader>
          <h1 className='font-bold text-2xl text-center text-blue-600 mb-4'>Enter the Registered Email</h1>
        </CardHeader>
        <CardBody>
          <Input className='my-1' value={email} onChange={e=>setEmail(e.target.value)}  size={'md'} type="email" label="Email" required/>
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
      }
    </div>
      
    </div>
  )
}

export default ForgotPassword
