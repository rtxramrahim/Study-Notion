
import { setLoading } from "../../slices/AuthSlice";
import { apiConnector } from "../ApiConnector";
import { courses } from "../apis";
import { toast } from "react-hot-toast";
import { profile } from "../apis";

export async function getEnrolledCourse(token){
        
  
    // const toastId = toast.loading("Loading...")
    let result = []
    try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      profile.GET_ENROLLED_COURSE,
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
 
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.courses
    // if(result.length===0){
    //     toast.error("you have not enrolled in any course")
    // }
    // else{
    //     toast.success("courses fetched successfully")
    // }
    console.log("result from api " , result)
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  // toast.dismiss(toastId)
  return result
    
}