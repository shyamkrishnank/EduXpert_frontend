import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { IoSend } from "react-icons/io5";
import axiosInstance from '../../axios/AxiosInstance';
import { IoIosSend } from 'react-icons/io';

function InsChatModal({setChatActive,instructor_id}) {
 const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const scrollContainerRef = useRef();
  const [message, setMessage] = useState()
  const token = useSelector(state=>state.auth.user.access_token)
  const [chats, setChats] = useState([])
  const socket = useRef("")

  useEffect(()=>{
    onOpen()
    axiosInstance.get(`chat/${instructor_id}`)
    .then(response=>{
      setChats(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
    socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${token}&chat_with=${instructor_id}`)
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
      console.log(e)
      setChats(prev=>[...prev,JSON.parse(e.data)])    
     }
     return () => {
      socket.current.close();
    };
  },[])

 

    const handleSubmit = () =>{
          socket.current.send(JSON.stringify(
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
    <Modal className='fixed bottom-0 right-1 transform translate-x-1 translate-y-1' onClose={()=>setChatActive(false)} isOpen={isOpen} onOpenChange={onOpenChange}>
   <ModalContent>
       <>
         <ModalHeader className="flex  gap-1">MESSAGE</ModalHeader>
         <ModalBody >
           <div className='h-96 overflow-y-auto' ref={scrollContainerRef}>
               {chats && chats.map((data, index)=>{
                   return(
                       <div key={index} className={`w-full px-3 ${data.user === instructor_id ? 'flex flex-row' : 'flex flex-row-reverse'} mb-2`}><div className={`rounded-lg ${data.user === instructor_id ? 'bg-success-500' : 'bg-primary'} text-sm  text-white  p-1`}>{data.content}</div></div>
                       
                       )
               })}
           </div>
         </ModalBody>
         <ModalFooter>
            <Input color='success' value={message}  onChange={e=>setMessage(e.target.value)} size='lg' variant="bordered" endContent={<IoIosSend onClick={handleSubmit} className='cursor-pointer' size={40} />} />
         </ModalFooter>
       </>
   </ModalContent>
 </Modal>
 
</div>
  )
}

export default InsChatModal
