import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar1 from '../../../components/user/Navbar'
import Footer from '../../../components/user/Footer'
import { Button, Chip, Input } from '@nextui-org/react'
import axiosInstance from '../../../axios/AxiosInstance'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoSend } from "react-icons/io5";



function ChatPage() {
  const {instructor_id}= useParams()
  const scrollContainerRef = useRef();
  const [message, setMessage] = useState()
  const token = useSelector(state=>state.auth.user.access_token)
  const socket = useMemo(()=>new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${token}&chat_with=${instructor_id}`),[])
  const [chats, setChats] = useState([])
  socket.onopen = () =>{
    console.log('connected successfully')
  }
  socket.onclose = () =>{
    console.log('connection lost');
  }
  socket.onerror = (e) =>{
    console.log(e)
  }
  socket.onmessage = (e)=>{
    console.log(e)
    setChats(prev=>[...prev,JSON.parse(e.data)])    
   }
    useEffect(()=>{
       axiosInstance.get(`chat/${instructor_id}`)
      .then(response=>{
        setChats(response.data)
      })
      .catch(error=>{
        console.log(error)
      })
    },[])

    const handleSubmit = () =>{
          socket.send(JSON.stringify(
            {
              'message':message,
            }
          ))
          setMessage(" ")
    }
    const scrollToBottom = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    };

    useEffect(() => {
      scrollToBottom();
    });

  return (
    <div>
      <Navbar1 />
      <div className='px-14 mt-8'>
        <div className='flex flex-row h-96'>
          <div className='basis-1/4'> 
            <div>

            </div>
          </div>
          <div className='basis-3/4 relative h-full'>
            <div className='w-3/6 h-5/6 overflow-y-auto' ref={scrollContainerRef}>
            {chats && chats.map((data, index) => {return (
                    <div key={index} className={`w-full px-8 ${data.user === instructor_id ? 'flex flex-row' : 'flex flex-row-reverse'} mb-2`}><Chip color={`${data.user === instructor_id ?"secondary":"primary"}`}>{data.content}</Chip></div>
                );
              })}
              <div className="absolute flex row gap-2 inset-x-0 bottom-0">
                 <div className='self-center h-3/12 w-6/12'><Input value={message} onChange={e=>setMessage(e.target.value)}  variant='bordered' /></div>
                 <div className='self-center'><IoSend onClick={handleSubmit} className='cursor-pointer' size={25}/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
        
    </div>
  )
}

export default ChatPage

