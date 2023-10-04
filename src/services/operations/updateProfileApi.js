import { setting } from '../apis'
import toast from 'react-hot-toast'
import { apiConnector } from '../ApiConnector'
import {setUser} from "../../slices/ProfileSlice"
export async function getProfileDetails(token){
    try{
        const response = await apiConnector("GET" , setting.getDetails , null ,
        {
            Authorisation : `Bearer ${token}`
        } )
        if(!response?.data?.success){
            return new Error(" respones from getProfile Details api " , response)
        }
        const result = response?.data?.details
        console.log("result " ,  result)
        return result
    }catch(err){
        console.log("error from profile api " , err)
    }
}
export async function updateProfilePhoto(file , token){
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("PUT" , setting.updateProfilePhoto , {
            file : file
        } , 
        {
            "Content-Type": "multipart/form-data",
            Authorisation : `Bearer ${token}`
        })
        if(!response?.data?.success){
            toast.error(response?.data?.message)
            return new Error("error from update photo api " , response?.data)
        }
        toast.success("Profile Updated!")
        const user = response?.data?.updatedProfile
        localStorage.setItem("user", JSON.stringify(user))      

        const result = response?.data?.url
        console.log("response from result api " , result)
        toast.dismiss(toastId)
        return result
    }catch(err){
        console.log("error from update photo api " , err)
    }
}
export async function updateProfile(bodyData , token , dispatch){
    
    try{
        const toastId = toast.loading("Loading...")
        const response = await apiConnector("PUT" , setting.updateProfile , {
            gender : bodyData.gender,
            dateOfBirth : bodyData.dateOfBirth,
            phoneNumber : bodyData.phoneNumber,
            bio : bodyData?.bio
        }, {
            Authorisation : `Bearer ${token}`
        })
        if(!response?.data?.success){
            toast.error("Not able to update")
            console.log("response from update profile api " , response?.data)
            toast.dismiss(toastId)
            return false
        }
        toast.success("Profile Updated!")
        
        const user = response?.data?.user
        localStorage.setItem("user", JSON.stringify(user))        
        dispatch(setUser(user))
        toast.dismiss(toastId)
        
    }catch(err){
        toast.error("Something went wrong!")
        console.log("error from updateprofile api " , err.message)
        return false
    }
}
export async function changePassword( oldPassword , newpassword  ,confirmPassword,token){
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("POST" , setting.changePassword , {
             oldPassword , newpassword , confirmPassword
        } , 
        {
            Authorisation : `Bearer ${token}`
        })
        if(!response?.data?.success){
            toast.error(response?.data?.message)
            console.log(response)
            toast.dismiss(toastId)
            return
        }
        toast.success(response?.data?.message)
        toast.dismiss(toastId)
        return true

    }catch(err){
        toast.error("Something went wrong")
        console.log(err.message)
    }
}