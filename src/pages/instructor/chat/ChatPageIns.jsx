import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import InstructorNav from '../../../components/instructor/InstructorNav'
import Sidebar from '../../../components/instructor/Sidebar'
import axiosInstance from '../../../axios/AxiosInstance'
import { Chip, Input } from '@nextui-org/react'
import { IoSend } from 'react-icons/io5'
import {User} from "@nextui-org/react";
import { API_URL } from '../../../constants/url'



function ChatPageIns() {
    const [message, setMessage] = useState()
    const scrollContainerRef = useRef();
    const instructor_id = useSelector(state=>state.auth.id)
    const token = useSelector(state=>state.auth.user.access_token)
    const [id,setId] = useState("")
    const [chats, setChats] = useState([])
    const [users,setUsers] = useState([])
    const socket = useRef(null);

      useEffect(()=>{
         axiosInstance.get(`chat/data/${instructor_id}`)
        .then(response=>{
          setUsers(response.data)
          console.log(response.data)
          if (response.data.length > 0){
            setId(response.data[0].id)
                          }
          console.log(response.data)
        })
        .catch(error=>{
          console.log(error)
        })
       },[])


      const handleClick = (user_id) =>{
        setId(user_id)
        axiosInstance.get(`chat/${user_id}`)
        .then(response=>{ 
            setChats(response.data)
            console.log(response.data)
          })
          .catch(error=>{
            console.log(error)
          })

      }



      useEffect(()=>{
        socket.current  = new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${token}&chat_with=${id}`)
        socket.current.onopen = () =>{
          console.log('connected successfully')
        }
       socket.current.onclose = () =>{
          console.log('connection lost');
        }
       socket.current.onerror = (e) =>{
          console.log(e)
        }
       socket.current.onmessage = (e)=>{
        setChats(prev=>[...prev,JSON.parse(e.data)])    
        console.log(e)  
         }
         return () => {
          socket.current.close();
        };
      },[id])
     


      const handleSubmit = () =>{
        if (message){
          socket.current.send(JSON.stringify(
            {
              'message':message,
            }
          ))
          setMessage("")    
        } 
      }


      
      const scrollToBottom = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      };


      useEffect(() => {
        scrollToBottom();
      })

    
  
    return (
      <div >
         <InstructorNav />
         <Sidebar /> 
         <div className='ml-28 flex mt-4'>
            <div className='w-4/5'><span className='text-4xl italic font-bold'>Messages</span></div>
        </div>
            {users.length > 0 ? 
            <div className='px-14 mt-8 ml-14 '>
            <div className='flex flex-row h-96'>
              <div className='basis-1/4'> 
                {
                  users && users.map((user=>{
                    return(
                    <div className='flex flex-row mb-5'>
                      <User 
                      className='cursor-pointer' 
                      onClick={()=>handleClick(user.id)} 
                      name={user.get_full_name}
                      avatarProps={{
                        src: user.image ? `${API_URL}${user.image}`:null
                      }}
                    />
                  </div>
                  )
                  })) 
                }
              </div>
              <div className='basis-3/4 relative h-full'>
                <div className='w-3/6 h-5/6 grid gap-3 overflow-y-auto' ref={scrollContainerRef}>
                  <div >
                   {chats && chats.map((data, index) => {return (
                    <div key={index} className={`w-full px-8 ${data.user === instructor_id ? 'flex flex-row-reverse' : 'flex flex-row'} mb-2`}><Chip color={`${data.user === instructor_id ?"primary":"secondary"}`}>{data.content}</Chip></div>
                      );
                    })}
                    </div>
                  <div className="absolute flex row gap-2 h-4 inset-x-0 bottom-0">
                     <div className='self-center h-3/12 w-6/12'><Input value={message} onChange={e=>setMessage(e.target.value)}  variant='bordered' /></div>
                     <div className='self-center'><IoSend onClick={handleSubmit} className='cursor-pointer' size={25}/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            :
            <div className='w-3/6 h-6/12 flex justify-center items-center'>No Chats Available !</div>
            }
          </div>
    )
  }
  
  export default ChatPageIns
  
