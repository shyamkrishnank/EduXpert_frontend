import React from "react";
import {Navbar, Input, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Slices/AuthSlice";



 function Navbar1() {
  const user = useSelector(state=>state.auth.isLogged)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = () =>{
    localStorage.removeItem('auth_token')
    dispatch(logout())
    navigate('/login')
    
  }
  return (
    <Navbar className="">
      <NavbarBrand>
        <img  onClick={()=>navigate("/")} className="w-20 cursor-pointer " src={'/logo.png'} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch size={18} />}
          type="search"
        />
        </NavbarItem>
      </NavbarContent>
      {user?
      <NavbarItem>
      <Button as={Link} color="primary" onClick={handleClick} variant="flat">
        Log Out
      </Button>
    </NavbarItem>
        :
      <NavbarContent justify="end">
      <NavbarItem className=" lg:flex">
        <Link href="/login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/signup" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>

     }
     
       
    </Navbar>
  );
}

export default Navbar1