import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Chip} from "@nextui-org/react";
import axiosInstance from '../../axios/AxiosInstance';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logged } from '../../Slices/AuthSlice'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

 

function IsStaffModal({userdetails}) {
    const {isOpen, onOpen,onClose, onOpenChange} = useDisclosure();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user_id = jwtDecode(userdetails.access_token).user_id
    console.log(user_id)
    const [isStaff,setIsstaff] = useState(true)
    useEffect(()=>{
        onOpen()
        return(onClose)
    },[])

    const handleChange = () =>{
        console.log(isStaff)
        setIsstaff(prev=>!prev)
    }
    const handleSubmit = () =>{
        axiosInstance.get(`/users/is_staff/${isStaff}/${user_id}`)
        .then(response =>{
            toast.success('Successfully Signed In', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            userdetails.is_staff = response.data.is_staff
            dispatch(logged(userdetails))
            if (response.data.is_staff){
                navigate('/instructor')
            }
            else{
                navigate('/user')
            }
        })
        .error(error=>{
            console.log(error)
        })

    }

  return (
    <div>
        <Modal hideCloseButton={true} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent  >
          {(onClose) => (
            <>
            <ModalHeader>You want to signup as..?</ModalHeader>
              <ModalBody >
               <div className="flex gap-6 justify-center mt-5">
                  <Checkbox color='success'  onChange={handleChange} isSelected={isStaff}  size="lg"><Chip>Instructor</Chip></Checkbox>
                  <Checkbox color='success'  onChange={handleChange} isSelected={!isStaff} size="lg"><Chip>Student</Chip></Checkbox>
                </div>  
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleSubmit} color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>   
    </div>
  )
}

export default IsStaffModal
