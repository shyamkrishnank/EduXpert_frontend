import React, { useEffect, useRef } from "react";
import {Navbar, NavbarBrand, NavbarContent, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarItem, Badge, DropdownSection} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {  logout } from "../../Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/AxiosInstance";
import UseNotification from "../../hooks/UseNotification";
import { MdNotifications } from "react-icons/md";
import { StripTime } from "../../contents/dateStrip/utilities";

export default function InstructorNav () { 
    const dispatch = useDispatch()
    const user = useSelector(state=>state.auth.user)
    const [notifications,setNotification] = UseNotification()
    let socket = useRef("")
    const navigate = useNavigate()
    const handleClick = () =>{
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        axiosInstance.defaults.headers['Authorization'] = null
        axiosInstance.defaults.headers['Refresh-token'] = null
        dispatch(logout())
        navigate('/login')
    }
    const handlenotification = (notification) =>{
      if (notification.notification_type == 'message'){
        navigate('/instructor/chats')
      }
    }

    useEffect(()=>{
      if (user){
        socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/notification/?token=${user.access_token}`)
      user 
      socket.current.onopen = () =>{
        console.log('NOTIFICATON successfully')
      }
      socket.current.onclose = () =>{
        console.log('connection lost');
      }
      socket.current.onerror = (e) =>{
        console.log(e)
      }
      socket.current.onmessage = (e)=>{
        console.log("notification came")
        console.log(e)
        setNotification(prev=>[...prev,JSON.parse(e.data)])    
       }
       return () => {
        socket.current.close();
      }
    }
    },[])
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
           <img  onClick={()=>navigate("/instructor")} className="w-20 cursor-pointer" src="/logo.png" ></img>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
      <NavbarItem>
      <Dropdown >
        <DropdownTrigger>
          <div as='button' className="cursor-pointer">
           <Badge content={notifications.length>0?notifications.length:null}  shape={notifications.length > 0 ? 'circle':null}  color={notifications.length>0?'danger':null} showOutline={false}>
               <MdNotifications  className=" text-sky-500" size={30} />
           </Badge>
           </div>
        </DropdownTrigger>
        <DropdownMenu   aria-label="Notification Action" variant="flat">
          <DropdownSection>
            <DropdownItem>
              <h1 className="text-lg">Notifications</h1>
            </DropdownItem>
          </DropdownSection> 
          <DropdownSection>
            {notifications.length > 0 ?
            notifications.map((notification) => 
              <DropdownItem textValue='string' onClick={()=>handlenotification(notification)} >
                <div className="flex flex-row gap-6">
                  <div><p className="text-xs">{notification.notification_type}</p></div>
                  <div><h1 className="font-semibold">{notification.content}</h1></div>
                  <div><p className="text-xs">{StripTime(notification.timestamp)}</p></div>
                </div>   
              </DropdownItem>
            ):
             <DropdownItem className="justify-center">
                <p className="">No Notifications!</p>
            </DropdownItem>
             }
          </DropdownSection>
        </DropdownMenu>
       </Dropdown>
      </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user?.name}
              size="sm"
              src=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem onClick={()=>navigate('/instructor/profile')} key="settings">My Profile</DropdownItem>
            <DropdownItem onClick={handleClick} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}


