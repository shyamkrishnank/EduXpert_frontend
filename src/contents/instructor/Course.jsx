import axios from "axios"
import { API_URL } from "../../constants/url"
import { deleteCourse } from "../../Slices/CourseIdSlice"
import { toast } from "react-toastify"

export function courseChapterSubmit(obj,extra,navigate) {
    const formData = new FormData()
    obj.forEach((data,index )=> {
        Object.entries(data).forEach(([key,value])=>{
            formData.append(`${key}_${index}`,value)
        })     
    })
    formData.append('user_id',extra.user_id,)
    formData.append('course_id', extra.course_id)
    axios.post(`${API_URL}/course/chapter_upload`,formData)
    .then(response=>{
        localStorage.removeItem('current_course')
        return navigate('/instructor/course')
    })
    .catch(error=>{

    })  

}

export const courseDelete = (navigate,dispatch) => {
        const id = localStorage.getItem('course_id')
        console.log(id)
        axios.get(`${API_URL}/course/delete_course/${id}`)
        .then(response=>{
            toast.success('Course Deleted', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })
            dispatch(deleteCourse())
            navigate('/instructor/course')

        })
        .catch(error=>{

        })
}


