import React from 'react'
import { LiaHomeSolid } from "react-icons/lia";
import { GiBlackBook,GiThumbUp,GiTakeMyMoney } from "react-icons/gi";
import { PiChatsLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


function Sidebar() {
    const navigate = useNavigate()
    const url = '/instructor/'
  return (
    <div className='bg-black w-24 h-screen fixed hover:w-50'>
        <ul className='list-none w=100 justify-items-center grid my-20 space-y-10'>
            <li> <LiaHomeSolid size={40} onClick={()=>navigate(`${url}`)} className='cursor-pointer' color='white' /></li>
            <li onClick={()=>navigate(`${url}course`)}><GiBlackBook size={40}color='white' className='cursor-pointer'/></li>
            <li onClick={()=>navigate(`${url}chats`)}> <PiChatsLight size={40} color='white' className='cursor-pointer' /> </li>  
            <li onClick={()=>navigate(`${url}orders`)} ><GiTakeMyMoney size={40} color='white'className='cursor-pointer'  /></li>
            <li onClick={()=>navigate(`${url}reviews`)}><GiThumbUp  size={40} color='white'className='cursor-pointer' /></li>
        </ul>
       
    </div>
  )
}

export default Sidebar
