import React from 'react'
import InstructorNav from '../../../components/InstructorNav'
import Sidebar from '../../../components/Sidebar'
import {Image,Input,Button} from '@nextui-org/react'

function Profile() {
  return (
    <div>
        <InstructorNav />
        <Sidebar />
        <div className='mt-6 mx-28'>
            <h1 className='text-2xl mb-4 italic font-bold'>Personal Info</h1>
            <p>You can edit your personal informations here</p>
            <div className='grid grid-cols-3 grid-flow-row-dense mt-4'>
              <div className='mx-16'><Image
                    width={200}
                    height={200}
                    alt="NextUI hero Image with delay"
                    src="/profileicon.jpg"
             /></div>
             <div className='col-span-2 gap-4 grid grid-cols-2 '>
                <div><Input label="First Name" defaultValue='hello' type='text'/></div>
                <div><Input label="Last Name" defaultValue='hello' type='text'/></div>
                <div><Input label="Email" placeholder='hello' type='email'/></div>
             </div>
             <div className='col-start-1 col-end-7 justify-self-center'>
                <Button color="primary" variant="bordered" >Save Changes</Button>
                <h1>change</h1>
                </div>
            </div> 
            <div>
            </div>
        </div>
    </div>
  )
}

export default Profile
