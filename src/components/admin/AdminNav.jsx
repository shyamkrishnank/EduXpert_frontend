import React from 'react'
import {Navbar, Input, NavbarBrand, NavbarContent, NavbarItem, Link, Button, useSelect} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";



function AdminNav() {
  const check = useSelector(state=>state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = () =>{
    localStorage.removeItem('auth_token')
    dispatch(logout())
    navigate('/admin')
  }
  return (
    <Navbar className="shadow-lg">
    <NavbarBrand>
      <img  onClick={()=>navigate("/")} className="w-20 cursor-pointer " src={'/logo.png'} />
    </NavbarBrand>
    <NavbarItem>
      {check && <AiOutlineLogout onClick={handleClick} className='text-red-600 cursor-pointer '  size={25}/>}
    </NavbarItem>
  </Navbar>
);
} 

export default AdminNav
