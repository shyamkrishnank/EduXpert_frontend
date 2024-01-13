import { Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/AxiosInstance'
import { useSelector } from 'react-redux'

function Wallet() {
    const [wallet,setWallet] = useState()
    const id = useSelector(state=>state.auth.id)
    useEffect(()=>{
        axiosInstance.get(`/order/instructor_wallet/${id}`)
        .then(response=>{
            console.log('wallet',response.data)
            setWallet(response.data)
        })
        .catch(error=>{
            console.log(error)
        })

    } ,[])
  return (
    <div className='mt-6 mx-28 h-96 flex flex-col justify-center'>
        <div className='w-full flex justify-center align-middle'>
           <p className='text-4xl font-semibold mt-4'> My Wallet</p>
           <Image src='/Wallet.jpg'  width={80}/>
        </div>
        <div className='w-full flex justify-center mt-4'>
            {wallet &&  <h1 className='text-2xl'>Available Amount : <span className='text-success'>{wallet.amount}</span></h1>}
        </div>
    </div>
  )
}

export default Wallet
