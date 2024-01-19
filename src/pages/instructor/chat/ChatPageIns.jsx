import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../axios/AxiosInstance'
import { Chip, Image, Input } from '@nextui-org/react'
import { IoSend } from 'react-icons/io5'
import {User} from "@nextui-org/react";
import { API_URL } from '../../../constants/url'
import { useLocation } from 'react-router-dom'



function ChatPageIns() {
    const location = useLocation()
    const chat_with_id = location.state ? location.state.chat_with_id : null
    const [message, setMessage] = useState()
    const scrollContainerRef = useRef();
    const instructor_id = useSelector(state=>state.auth.id)
    const token = useSelector(state=>state.auth.user.access_token)
    const [id,setId] = useState(chat_with_id)
    const [chats, setChats] = useState()
    const [users,setUsers] = useState([])
    const socket = useRef(null);

      const handleClick = (user_id) =>{
        setId(user_id)
        axiosInstance.get(`chat/${user_id}`)
        .then(response=>{ 
            setChats(response.data)  
          })
          .catch(error=>{
            console.log(error)
          })

      }
      useEffect(()=>{
        if (chat_with_id){
          handleClick(chat_with_id)
        }
        
        axiosInstance.get(`chat/data/${instructor_id}`)
       .then(response=>{
         setUsers(response.data)
       })
       .catch(error=>{
         console.log(error)
       })
      },[])
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
         <div className='ml-28 flex mt-4'>
            <div className='w-4/5'><span className='text-4xl italic font-bold'>Messages</span></div>
        </div>
            {users.length > 0 ? 
            <div className='px-14 mt-8 ml-14 '>
            <div className='flex flex-row h-96 mx-12'>
              <div className='basis-1/6'> 
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
              <div className='basis-5/6 relative h-full'>
                <div className='h-5/6 grid gap-3 overflow-y-auto border-3' ref={scrollContainerRef}>
                  <div >
                   {chats && chats.map((data, index) => {return (
                    <div key={index} className={`w-full px-8 ${data.user === instructor_id ? 'flex flex-row-reverse' : 'flex flex-row'} mb-2`}><Chip color={`${data.user === instructor_id ?"primary":"secondary"}`}>{data.content}</Chip></div>
                      );
                    })}
                  </div>
                  {chats && 
                  <div className="absolute flex justify-center row gap-2 h-4 inset-x-0 bottom-0">
                     <div className='self-center h-3/12 w-full'><Input value={message} onChange={e=>setMessage(e.target.value)}  variant='bordered' endContent={<IoSend onClick={handleSubmit} className='cursor-pointer' size={25}/>} /></div>
                     <div className='self-center'></div>
                  </div>}
                  {!chats && 
                  <div className='flex justify-center'>
                  <Image src='/messageinterface.jpg' width={300} />
                  </div>
                  }
                </div>
                
              </div>
            </div>
          </div>
            :
            <div className='w-full mt-10 flex justify-center items-center text-xl'>No Chats Available !</div>
            }
          </div>
    )
  }
  
  export default ChatPageIns
  
