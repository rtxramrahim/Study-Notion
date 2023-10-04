import { apiConnector } from "../ApiConnector";
import { courseProgress } from "../apis";
import toast from "react-hot-toast";
export const setcourseProgress = async (courseId , subSectionId , token  )=>{
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" ,courseProgress.setcourseProgress , {
            courseId : courseId,
            subSectionId : subSectionId
        } ,
        {
            Authorisation: `Bearer ${token}`
        } )
        if(!response.data.success){
            toast.error("Something Went Wrong!")
            // console.log("response from course progress api " , response.data.message)
            toast.dismiss(toastId)
            return false
        }
        toast.success("Marked As Completed!")
        toast.dismiss(toastId)
        return true
    }catch(err){
        console.log("error from courseProgress" ,err)
        
    } 
    toast.dismiss(toastId)
}
export const getCourseProgress = async(courseId , token)=>{
    try{
        const response = await apiConnector("POST" , courseProgress.getcourseProgress , {
            courseId : courseId
        },{
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            console.log("error from getcourseprogress" , response)
        }
        // console.log("ressult fro, get course progress api " , result)
        const result = response?.data?.data?.completedVideos
        // console.log("result from courseProgress api" , response?.data?.data?.completedVideos)
        return result
    }catch(err){
        console.log("error from getcourseprogress" , err)
    }
   
}