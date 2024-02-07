import React from 'react'
import axiosInstance from '../../axios/AxiosInstance'
import { toast } from 'react-toastify'

async function RazorPay(data,RazorPay,user_id){
    return new Promise((resolve, reject) => {
    const options = {
        "key": `${data.razor_key}`, // Enter the Key ID generated from the Dashboard
        "amount": `${data.payment.amount}` , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "EduXpert",
        "description": "Transaction",
        "image": "/logo.png",
        "theme": {
            "color": "#3399cc"
        },
        "order_id": `${data.payment.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

        "handler": function (response){
           const order_data = {
                'user' : user_id,
                'course':data.id,
                'amount': data.payment.amount/100,
                'payment_id' : response.razorpay_payment_id,
                'order_id' : response.razorpay_order_id,
                'signature' : response.razorpay_signature
            }
            axiosInstance.post(`/order/save`,order_data)
            .then(response=>{
                resolve(true) 
            })
            .catch(error=>{
                reject(false)
            })

        }
       
    }

    const rzp1 = new RazorPay(options)
    rzp1.on('payment.failed', function (response){
        toast.error('Something went wrong!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
    })
    rzp1.open()
})
}

export default RazorPay


