import React from 'react'
import {GoogleLogin } from "@react-oauth/google"
import {jwtDecode} from "jwt-decode"

function GoogleBtn() {
  return (
    <div>
        <GoogleLogin 
        onSuccess={(response)=>{
            const credential = jwtDecode(response.credential)
            console.log(credential)
        }
         }
        onError={()=>{
            console.log("error occured")}

        } 
        />

      
    </div>
  )
}

export default GoogleBtn
