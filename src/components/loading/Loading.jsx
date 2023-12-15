import React from 'react'
import {Spinner} from "@nextui-org/react";


function Loading() {
  return (
    <div className='bg-zinc-300 justify-center items-center flex h-screen w-100'>
          <Spinner size='lg'  color="success" />
          <h2 className='text-4xl ml-5'>Please Wait...</h2>
    </div>
  )
}

export default Loading
