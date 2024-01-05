import React, { useEffect, useMemo, useState } from "react";
import {Navbar, Input, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, NavbarMenuItem} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Slices/AuthSlice";
import { API_URL } from "../../constants/url";
import axiosInstance from "../../axios/AxiosInstance";



 function Navbar1() {
  const user = useSelector(state=>state.auth.user)
  const [category,setCategory] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = () =>{
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        axiosInstance.defaults.headers['Authorization'] = null
        axiosInstance.defaults.headers['Refresh-token'] = null
        dispatch(logout())
        navigate('/login') 
  }
  const handleCourse = (key,value) =>{
    navigate(`/user/course/${[value]}`)   
  }
  const handleLearning =(key,value)=>{
    navigate(`/user/mylearning/`)
  }
  useMemo(()=>{
    axiosInstance.get(`${API_URL}/course/course_category`)
    .then(response=>{
      setCategory(response.data.data)
    })
    .catch(error=>{
      console.log(error.message)
    })

  },[])
  return (
    <Navbar className="">
      <NavbarBrand>
        <img  onClick={()=>navigate("/home")} className="w-20 cursor-pointer " src={'/logo.png'} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
        <Dropdown >
      <DropdownTrigger>
        <Button     
        >
          Courses
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions" >
      {Object.entries(category).map(([key,value])=>(
          <DropdownItem onClick={()=>handleCourse(key,value)} key={value}>{key}</DropdownItem>
        
      ))}
      </DropdownMenu>
    </Dropdown>
          
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
          placeholder="Search courses..."
          size="sm"
          startContent={<CiSearch size={18} />}
          type="search"
        />
        </NavbarItem>
      </NavbarContent>
      {user?
      <NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem onClick={()=>navigate('/user/profile')} key="settings">My Profile</DropdownItem>
            <DropdownItem onClick={handleLearning} key="mylearnings" color="danger">
              My Learnings
            </DropdownItem>
            <DropdownItem onClick={handleClick} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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