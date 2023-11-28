import React, { useState } from 'react'
import InstructorNav from '../../../../components/InstructorNav'
import Sidebar from '../../../../components/Sidebar'
import { Input,Textarea,Image } from "@nextui-org/react"
import ReactPlayer from 'react-player'

function AddChapters() {
    const [video , setVedio] = useState("")
  return (
    <div>
        <InstructorNav />
        <Sidebar /> 
        <div className='grid grid-cols-2 gap-4 mt-6 mx-28'>
        <div className=''>
            <h1 className='text-2xl italic font-bold'>Chapters</h1>
            <Input
            isRequired
            type="email"
            label="Chapter Heading"
            defaultValue=""
            value=""
            className='text-xl my-4'
            size={'lg'}
            /> 
             <Textarea
            isRequired
            label="Discription"
            placeholder="Enter your description"
            className='text-xl my-6'
            value={""}
            onChange={""}
            size={'lg'}
            />
        </div>
        <div className='mt-12'>
          {video?<ReactPlayer  height="30vh" width="auto"  url={URL.createObjectURL(video)}/>:
              <Image
                width={400}
                height={100}
                src="/uploadimage.jpg"
                className='mt-3'
              />}
            {/* <ReactPlayer height="40vh" width="auto" url={video?URL.createObjectURL(video):"/uploadimage.jpg"} controls /> */}
          <input onChange={e=>setVedio(e.target.files[0])} type='file'/>
        </div> 
        <button>hello</button>
     </div>
    </div>
  )
}

export default AddChapters
