import React, { useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

function SuccessModal({prop:setModal}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const navigate = useNavigate()

  const handleClose =()=> {
    setModal(false)
    navigate('/user/mylearning')
  }

  useEffect(()=>{
    onOpen()
  },[])

  return (
    <div>
      <Modal size={'2xl'} onClose={handleClose} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1 text-green-600 font-serif text-3xl font-bold text-center">WELL DONE</ModalHeader>
              <ModalBody >
                <div className='flex flex-col'>
                   <div className='grid'>
                        <div className='justify-self-center'>
                            <Image width={200} src='/success.jpg' />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='justify-self-center'>
                            <h1 className='font-bold text-green-600 '>You have successfully purchased the course</h1>
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='justify-self-center'>
                            <h1 className='font-bold text-3xl drop-shadow-lg text-green-600 '>HAPPY LEARNING!</h1>
                        </div>
                    </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button  color="primary" onPress={()=>navigate('/user/mylearning')}>
                  View Course
                </Button>
              </ModalFooter>
            </>
        </ModalContent>
      </Modal>
      
    </div>
  )
}

export default SuccessModal
