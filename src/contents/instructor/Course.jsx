import { API_URL } from "../../constants/url"
import { toast } from "react-toastify"
import axiosInstance from "../../axios/AxiosInstance"

export function courseChapterSubmit(obj,extra,navigate) {
    const formData = new FormData()
    obj.forEach((data,index )=> {
        Object.entries(data).forEach(([key,value])=>{
            formData.append(`${key}_${index}`,value)
        })     
    })
    formData.append('user_id',extra.user_id,)
    formData.append('course_id', extra.course_id)
    axiosInstance.post(`${API_URL}/course/chapter_upload`,formData)
    .then(response=>{
        toast.success('Chapter Addedd Successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        return navigate('/instructor/course')
    })
    .catch(error=>{

    })  

}

export const courseDelete = (course_id,navigate,dispatch) => {
       const id = course_id
        axiosInstance.get(`${API_URL}/course/delete_course/${id}`)
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
            console.log(error.response)
            toast.error(error.response.data.message, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true, 
                progress: undefined,
                theme: "colored",
                })

        })
}


