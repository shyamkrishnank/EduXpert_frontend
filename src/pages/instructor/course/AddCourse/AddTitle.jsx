import React, { useState } from 'react'
import Sidebar from '../../../../components/Sidebar'
import {Input, image} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {Button , Image} from "@nextui-org/react";
import InstructorNav from '../../../../components/InstructorNav';



function AddTitle() {
  const [title,setTitle] = useState("")
  const [Discription,setDiscription] = useState("")
  const [category,setCategory] = useState("")
  const [thumbnail,setThumbnail] = useState("")
  return (
    <div className='static'>
        <InstructorNav />
        <Sidebar />
        <div className='absolute left-40 top-28 w-5/6 '>
        <Input
            isRequired
            type="email"
            label="Course titile"
            defaultValue=""
            className='w-6/12 text-xl'
            onChange={e=>setTitle(e.target.value)}
            size={'lg'}
            />
          <Textarea
            isRequired
            label="Discription"
            placeholder="Enter your description"
            className='w-6/12 text-xl my-6'
            onChange={e=>setDiscription(e.target.value)}
            size={'lg'}
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">
                <select className="block w-6/12 mt-1 p-2 bg- rounded-md shadow-sm ">
                    <option value="" disabled selected>Select a category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                </select>
             </label>
             <Image
                width={300}
                height={200}
                src={thumbnail?URL.createObjectURL(thumbnail):"/uploadimage.jpg"}
              />
              <input onChange={e=>setThumbnail(e.target.files[0])} type='file' />
        </div >

        <div className='absolute bottom-28 right-80'>
            <Button color="success">
            Continue
        </Button> 
        </div>
        
      
    </div>
  )
}

export default AddTitle
