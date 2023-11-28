import React from 'react'
import { ToastContainer } from 'react-toastify';

function ToastDiv() {
  return (
    <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
          />
      
    </div>
  )
}

export default ToastDiv
