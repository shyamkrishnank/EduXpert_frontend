import React, { useEffect, useRef, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Chip} from "@nextui-org/react";
import { FaRobot } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import axiosInstance from '../../axios/AxiosInstance';




function ChatbotModal({setChatbot}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const scrollContainerRef = useRef();
    const [conversation,setConverstion] = useState(["Hi There! How can i help you?"])
    const [message,setMessage] = useState("")
    const handleClick = () =>{
        const data = {
            'message':message
        }
        setConverstion(prev=>[...prev,message])
        axiosInstance.post('/chatbot',data)
        .then(response=>{
            if (response.data.message){
                console.log(response.data.message)
                setConverstion(prev=>[...prev,response.data.message])
            }  
        })
        .catch(error=>{
            console.log(error.message)
        })
        setMessage("")
        
    }
    useEffect(()=>{
        onOpen()
    },[])



     
    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      };


      useEffect(() => {
        scrollToBottom();
      })

  return (
    <div>
         <Modal className='fixed bottom-0 right-1 transform translate-x-1 translate-y-1' onClose={()=>setChatbot(false)} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <>
              <ModalHeader className="flex  gap-1"><FaRobot  className='text-success mr-3' size={30}/>Edu Bot</ModalHeader>
              <ModalBody >
                <div className='h-96 overflow-y-auto' ref={scrollContainerRef}>
                    {conversation && conversation.map((msg,index)=>{
                        return(
                            <div key={index} className={`w-full px-3 ${index % 2 == 1 ? 'flex flex-row' : 'flex flex-row-reverse'} mb-2`}><div className={`rounded-lg ${index % 2 == 1 ? 'bg-success-500' : 'bg-primary'} text-sm  text-white  p-1`}>{msg}</div></div>
                            
                            )
                    })}
                </div>
              </ModalBody>
              <ModalFooter>
                 <Input color='success' value={message} onChange={e=>setMessage(e.target.value)} size='lg' variant="bordered" endContent={<IoIosSend onClick={handleClick} className='cursor-pointer' size={40} />} />
              </ModalFooter>
            </>
        </ModalContent>
      </Modal>
      
    </div>
  )
}

export default ChatbotModal
