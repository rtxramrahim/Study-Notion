import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../ApiConnector";
import { courses } from "../apis";
import { toast } from "react-hot-toast";
import { Section , subSection } from "../apis";
import { setCourse } from "../../slices/courseSlice";


// create course
 async function createCourse(data,token,dispatch){
    
    const toastId = toast.loading("Loading..")
    try{
        const response = await apiConnector("POST",courses.CREATE_COURSES_API, data , {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
          })
        if(!response.data.success){
            toast.error("Error While Creating Course")
            toast.dismiss(toastId)
            console.log("response from course api... " , response)
            return
        }
        toast.success("Updated!")
        toast.dismiss(toastId)
        const result = response.data.createdCourse
      
        // localStorage.setItem("course" , result)
        dispatch(setCourse(result))
        // console.log("response from course apii : " , result)
       
        
        return result
    }catch(err){
        console.log("fat gaya " , err)
        toast.error("Something Went Wrong")
    }
    toast.dismiss(toastId)
}
export default createCourse

// update course
export async function updateCourse(data,token, dispatch , publish){
    const toastId = toast.loading("Loading..")
    try{
        const response = await apiConnector("PUT" , courses.UPDATE_COURSE_API , data ,
        {
            "Content-Type": "multipart/form-data",
             Authorisation: `Bearer ${token}`,
        })
        if(!response.data.success){
            toast.error("not able to update course")
            toast.dismiss(toastId)
            console.log("response from course updated api : " , response)
        }
       !publish ?  toast.success("course updated successfully") : toast.success("Course is published successfully")
        toast.dismiss(toastId)
        const result = response.data.updatedCourse
        dispatch(setCourse(result))
        console.log("result from course update api... " , result)
        return result
    }catch(err){
        console.log(err)
        toast.error("Something Went Wrong")
        toast.dismiss(toastId)
    }
  
}

// get all created courses 
export async function getallCreatedCourse (data ,token){
    const toastId = toast.loading("Loading...")
    try{
       
        const response = await apiConnector("GET" , courses.GET_ALL_PUBLISHED_COURSES , data ,
        {
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            toast.error("Not able to fetch courses")
            console.log("response from published course api " , response)
            toast.dismiss(toastId)
            return
        }
        const result = response.data.courses
        console.log("response from published course api" , result)
        // toast.success("All Courses Fetched!")
        toast.dismiss(toastId)
        return result
    }catch(err){
        toast.error("Somethin went wrong")
        toast.dismiss(toastId)
        console.log("error : " , err)
    }
}
// delete course
export async function deleteCourse(data, token){
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("DELETE" , courses.DELETE_COURSE , data , {
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            toast.error(response.data.message)
            console.log("response from delete course api " , response)
            toast.dismiss(toastId)
            return
        }
        toast.success(response.data.message)
        toast.dismiss(toastId)
        return true
    }catch(err){
        toast.error("Something Went Wrong")
        console.log("error" , err)
        toast.dismiss(toastId)
    }
}


// create section
export async function createSection(data,token , dispatch){
    const toastId = toast.loading("Loading...")
    try{
       
        const response = await apiConnector("POST" , Section.ADD_SECTION_API , data , {
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            console.log("response from section api : " , response)
            toast.dismiss(toastId)
            return
        }
        const result = response.data.section
        console.log("response from section  api.... " , result)
        
        // localStorage.setItem("course" , result)
        dispatch(setCourse(result))
        toast.success("Section Created")
        toast.dismiss(toastId)
        return result
    }catch(err){
        toast.error("Not able to create Section")
        toast.dismiss(toastId)
    }
   
}

// update section
export async function updateSection(data,token , dispatch){
    
    const toastId = toast.loading("Loading...")
    try{
            const response = await apiConnector("PUT" , Section.UPDATE_SECTION_API , data , {
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            console.log("response from update section api : " , response)
            toast.error("Not able to update Section")
            toast.dismiss(toastId)
            return
        }
        const result = response.data.section
        console.log("response from updated Section api " , result)
        toast.success("Section Updated")
        toast.dismiss(toastId)  
        // dispatch(setCourse(result))
        return result
        
    }catch(err){
        toast.error("Not able to create Section")
        toast.dismiss(toastId)
    }
}
// DELETE SECTION HERE
export async function deleteSection(data,token,dispatch){
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("DELETE" , Section. DELETE_SECTION_API, data , {
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            console.log("response from delete Section api " , response)
            toast.error("Not able to Delete Section")
            toast.dismiss(toastId)
            return
        }
        const result = response.data.updatedCourse
        toast.success(response.data.message)
        dispatch(setCourse(result))
        toast.dismiss(toastId)
        console.log("response from delete section api" , result)
    }catch(err){
        toast.error("Something went Wrong")
        toast.dismiss(toastId)
        console.log("error" , err)
    }
}

// create subSection 
export const createsubSection = async (data,token,dispatch) =>{
    const toastId = toast.loading("Loading..")
    try{
        const response = await apiConnector("POST" , subSection.ADD_subSECTION_API , data , {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        } )
        if(!response.data.success){
            toast.error("Not Able To Create Lecture...")
            toast.dismiss(toastId)
            console.log("response from addSubSection api " , response)
            return
        }
        const result = response.data.updatedCourse
        // localStorage.setItem("course" , result)
        dispatch(setCourse(result))
        toast.success("Lecture Added Successfully")
        toast.dismiss(toastId)
        console.log("response from addSubSection api " , result)
        return result

    }catch(err){
        console.log("err" , err)
        toast.error("something went wrong")
        toast.dismiss(toastId)
    }
    
}

// Edit SubSection
export const updateSubSection = async(data,token)=>{
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("PUT" ,subSection.UPDATE_subSECTION_API , data , {
            "Content-Type": "multipart/form-data",
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            toast.error(response.data.message)
            toast.dismiss(toastId)
            console.log("response from update subsection api " , response.data)
        }
        toast.success("Updated Successfully")
        const result = response.data.updatedSection
        console.log("response from updated subsection api " , result) 
        toast.dismiss(toastId)
        return result
    }catch(err){
        toast.error("Something Went Wrong")
        toast.dismiss(toastId)
        console.log("error " , err)
    }
}
// delete subsection
export const deletesubSection = async(data,token)=>{
    const toastId =  toast.loading("Loading...")
    try{
        const response = await apiConnector("DELETE" , subSection.DELETE_subSECTION_API , data , {
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            console.log("response from delete section api : " , response)
            toast.error(response.data.message)
            toast.dismiss(toastId)
            return
        }
        const result = response.data.updatedSection
        toast.success("Lecture Deleted Succesfully")
        toast.dismiss(toastId)
        return result
    }catch(err){
        toast.error("something went wrong")
        toast.dismiss(toastId)
        console.log("error " , err)
    }
}

// get Course Details
export const getCourseDetails = async(courseId)=>{
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , courses.GET_COURSE_DETAILS , {
            courseId : courseId
        })
        if(!response.data.success){
            toast.error("Service failed!!")
            console.log("response from course details api " , response)
            toast.dismiss(toastId)
        }
        toast.dismiss(toastId)
        const result = response.data.data
        console.log("response from details course" , result)
        return result
    }catch(err){
        toast.error("Something went wrong!")
        console.log("error from course detaild api" , err)
        toast.dismiss(toastId)        
    }
}