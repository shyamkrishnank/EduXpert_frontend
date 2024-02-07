import React, { useEffect, useRef, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea} from "@nextui-org/react";
import ReactPlayer from 'react-player';
import { API_URL } from '../../constants/url';
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/AxiosInstance';
import { useDispatch } from 'react-redux';
import { end_loading, loading } from '../../Slices/LodingSlice';



function ChapterEditModal({editchapter,closefun, setCourse}) {
    const {isOpen,onClose, onOpen, onOpenChange} = useDisclosure();
    const [chapter,setEditChapter] = useState(editchapter)
    const imgRef = useRef(" ")
    const dispatch = useDispatch()
    const [video,setVideo] = useState("")
    const handleSubmit = ()=>{
        if (chapter.title == "" || chapter.description == ""){
            toast.error('Please complete the fields!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });     
        }
        else{
            handleClose() 
            dispatch(loading())
            const formFields = new FormData
            formFields.append('title',chapter.title)
            formFields.append('description',chapter.description)
            if (video){
                console.log(video)
                formFields.append('video',video)
            }
            axiosInstance.post(`/course/edit_chapter/${chapter.id}`,formFields)
            .then(response=>{
                setCourse(prev=>({...prev,initial_chapter:response.data}))
                dispatch(end_loading())
                toast.success('Chapter Edited Succesfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });  
                    

            })
            .then(error=>{
                dispatch(end_loading())
                console.log(error)
            })
        }

    }
    const handleClose = () =>{
        closefun(false)
        onClose()
    }
    const handleClick = () =>{
        imgRef.current.click()
     }
    useEffect(()=>{
        onOpen()
    },[])

  return (
    <div>
    <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size={'4xl'} 
        hideCloseButton={true}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
          <ModalContent>
          {
            <>
              <ModalHeader className="flex flex-col gap-1">{chapter.title}</ModalHeader>
              <ModalBody>
              <div  className='grid grid-cols-12 gap-4 mt-6 ml-2 mr-3'>
              <div className='col-span-5'>
                <Input
                isRequired
                type="text"
                name='title'
                label="Chapter Heading"
                value={chapter.title}
                onChange={e=>setEditChapter(prev=>({...prev,title:e.target.value}))}
                className='text-xl my-4'
                size={'lg'}
                /> 
                <Textarea
                isRequired
                label="Discription"
                name='description'
                placeholder="Enter your description"
                className='text-xl my-6'
                value={chapter.description}
                onChange={e=>setEditChapter(prev=>({...prev,description:e.target.value}))}
                size={'lg'}
                />
                </div>
            <div className='col-span-5 flex gap-2'>
            <ReactPlayer  height="30vh" width="auto" url={video ? URL.createObjectURL(video ):`${API_URL}${chapter.video}`} controls/>
            <FaEdit size={30} onClick={handleClick}/>
            </div> 
            <input name='video' accept="video/*"  value={""} onChange={e=>setVideo(e.target.files[0])} ref={imgRef} hidden type='file'/>
        </div>      
              </ModalBody>
              <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Save Chapter
                </Button>
              </ModalFooter>
            </>
           }
        </ModalContent>
      </Modal>

      
    </div>
  )
}

export default ChapterEditModal
