import { toast } from "react-toastify"
import axiosInstance from "../../axios/AxiosInstance"
import { end_loading, loading } from "../../Slices/LodingSlice"

export function courseChapterSubmit(obj,extra,navigate,dispatch) {
    dispatch(loading())
    const formData = new FormData()
    obj.forEach((data,index )=> {
        Object.entries(data).forEach(([key,value])=>{
            formData.append(`${key}_${index}`,value)
        })     
    })
    formData.append('user_id',extra.user_id,)
    formData.append('course_id', extra.course_id)
    axiosInstance.post(`/course/chapter_upload`,formData)
    .then(response=>{
        dispatch(end_loading())
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
        dispatch(end_loading())

    })  

}

export const courseDelete = (course_id,navigate) => {
       const id = course_id
        axiosInstance.get(`/course/delete_course/${id}`)
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


