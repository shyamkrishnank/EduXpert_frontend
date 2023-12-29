import axios from "axios"
import Cookies from 'js-cookie';


const token = localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')).access_token:null
const axiosInstance=axios.create(
    {
        baseURL:"http://127.0.0.1:8000",
        headers:{
            'Content-Type':'application/json',
            'Authorization': token?`Bearer:${token}`:null,
            accept:'application/json'
        }
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        if (response.ok) {
            const accessToken = response.headers.get('Authorization');
            const token = accessToken ? accessToken.split(' ')[1] : null;
            if (token){
                localStorage.setItem('auth_token', token)
            }

    }
    return response
    },
    (error)=>{
        console.log('erroraa keriii')
        return Promise.reject(error)
    }   
)

export default axiosInstance  
