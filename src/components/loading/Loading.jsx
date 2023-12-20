import React from 'react'
import {Spinner} from "@nextui-org/react";


function Loading() {
  return (
    <div className='flex flex-col '>
         <div><Spinner size='lg'  color="success" /></div>
         <div><h2 className='text-4xl ml-5'>Please Wait...</h2></div>
    </div>
  )
}

export default Loading
