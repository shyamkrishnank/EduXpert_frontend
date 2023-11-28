import React from 'react'
import {Navbar, Input, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


function AdminNav() {
  return (
    <Navbar className="">
    <NavbarBrand>
      <img  onClick={()=>navigate("/")} className="w-20 cursor-pointer " src={'/logo.png'} />
    </NavbarBrand>
     
  </Navbar>
);
} 

export default AdminNav
