
import React from 'react'

function ObjectToForm(obj) {
    const formData = new FormData()
    for (const key in obj){
        if (key=='image'){
            continue
        }
        formData.append(key,obj[key])
    }
  return formData

}

export default ObjectToForm
