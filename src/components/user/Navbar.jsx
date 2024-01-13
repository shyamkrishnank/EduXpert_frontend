import React, { useEffect, useMemo, useState } from "react";
import {Navbar, Input, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, NavbarMenuItem, Badge, DropdownSection} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Slices/AuthSlice";
import { API_URL } from "../../constants/url";
import axiosInstance from "../../axios/AxiosInstance";
import UseNotification from "../../hooks/UseNotification";
import { MdNotifications} from "react-icons/md";
import { useRef } from "react";
import { StripTime } from "../../contents/dateStrip/utilities";
import { FaRobot } from "react-icons/fa";
import ChatbotModal from "../../contents/modals/ChatbotModal";





 function Navbar1() {
  const user = useSelector(state=>state.auth.user)
  const [notifications,setNotification] = UseNotification()
  const [chatbot,setChatbot] = useState(false)
  const [category,setCategory] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const socket = useRef("")
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

  const handlenotification = (notification) =>{
    if (notification.notification_type == 'message'){
      axiosInstance.get(`/notifications/status/${notification.user}`)
      .then(response=>{
        setNotification(response.data)
      })
      .then(error=>{
        console.log(error)
      })
      navigate(`/user/chat/${notification.user}`)
    }
  }
  useEffect(()=>{
    axiosInstance.get(`${API_URL}/course/course_category`)
    .then(response=>{
      setCategory(response.data.data)
    })
    .catch(error=>{
      console.log(error.message)
    })
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
    <>
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
      <>  
    <NavbarContent justify="end" className="gap-6">
     <NavbarItem>
         <FaRobot onClick={()=>setChatbot(true)} className="text-success-500 cursor-pointer" size={30} />
     </NavbarItem>
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
    </NavbarContent>
    </>
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
    {chatbot && <ChatbotModal setChatbot={setChatbot} />}
   
    </>

  );
}

export default Navbar1