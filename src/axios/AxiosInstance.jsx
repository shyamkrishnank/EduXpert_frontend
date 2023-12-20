import axios from "axios"
import Cookies from 'js-cookie';


const user = localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')):null
const access_token = user?user.access_token:null
const refresh_token = user?user.refresh_token:null
const axiosInstance=axios.create(
    {
        baseURL:"http://127.0.0.1:8000",
        headers:{
            'Content-Type':'application/json',
            'Authorization': user?`Bearer:${access_token} Refresh_token:${refresh_token}`:null,
            accept:'application/json'
        }
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        console.log(response)
        const accessTokenCookie = response.headers.Authorization?response.headers.Authorization.split(":")[1]:null
        if (accessTokenCookie){
            console.log('cookie kitti',accessTokenCookie)
            alert("kitti")
            const user = JSON.parse(localStorage.getItem('auth_token'))
            user.access_token = accessTokenCookie
            localStorage.setItem('auth_token',JSON.stringify(user))
        }
        console.log(response)
        return response
    },
    (error)=>{
        console.log('erroraa keriii')
        return Promise.reject(error)
    }   
)

export default axiosInstance  
