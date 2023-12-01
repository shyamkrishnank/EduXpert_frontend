import axios from "axios"
import { API_URL } from "../../constants/url"

export const courseChapterSubmit = (obj) => {
    const formData = new FormData()
    obj.forEach((data,index )=> {
        Object.entries(data).forEach(([key,value])=>{
            formData.append(`${key}_${index}`,value)
        })     
    })
    axios.post(`${API_URL}/course/chapter_upload`,formData)
    .then(response=>{

    })
    .catch(error=>{
        
    })
    return formData
    

}


