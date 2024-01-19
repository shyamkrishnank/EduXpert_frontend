import axios from "axios"


const token = localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')).access_token:null
const cookies = localStorage.getItem('refresh_token')?JSON.parse(localStorage.getItem('refresh_token')):null

const axiosInstance=axios.create(
    {
        baseURL:"http://127.0.0.1:8000",
        headers:{
            'Authorization':token?`Bearer ${token}`:null,
            'Accept':'application/json',
            'Refresh-token':cookies
        },
        withCredentials: true
    }
)

 
axiosInstance.interceptors.request.use((request)=>{
    console.log('request',request)
    return request
})

axiosInstance.interceptors.response.use(
    (response)=>{
        console.log('response',response)
        if (response.headers['refresh_token']){
            localStorage.setItem('refresh_token',JSON.stringify(response.headers['refresh_token']))
            localStorage.setItem('auth_token',JSON.stringify(response.data))
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`
            axiosInstance.defaults.headers['Refresh-token'] = response.headers['refresh_token']
            delete axiosInstance.defaults.headers.refresh_token
        }
        if (response.headers['access_token']){
            console.log('new access',response.headers['access_token'])
            const auth_token = localStorage.getItem('auth_token')
            const auth_token_str = JSON.parse(auth_token)
            auth_token_str.access_token = response.headers['access_token']
            console.log("access token",auth_token_str)
            localStorage.setItem('auth_token',JSON.stringify(auth_token_str))
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${auth_token_str.access_token}`
            delete axiosInstance.defaults.headers.access_token
            console.log('added new access')
        }
    return response
    },
    (error)=>{
          if (error.response.status == 401){
            if (error.response.headers['access_token']){
            console.log('new acccess in error',error.response.headers['access_token'])
            const auth_token = localStorage.getItem('auth_token')
            const auth_token_str =JSON.parse(auth_token)
            auth_token_str.access_token = error.response.headers['access_token']
            console.log(error.response.headers['access_token'])
            localStorage.setItem('auth_token',JSON.stringify(auth_token_str))
            console.log(error.response.headers)
            error.response.headers['Authorization'] =  `Bearer ${JSON.stringify(auth_token_str)}`
            error.response.headers['Refresh-token'] = localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')).refresh_token:null;
            console.log(error.response.headers)
            console.log(axiosInstance.headers)
            }
          }
            
        return Promise.reject(error)
    }   
)

export default axiosInstance  
