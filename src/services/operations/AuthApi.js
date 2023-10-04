import React from 'react'
import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../../slices/AuthSlice'
import { apiConnector } from '../ApiConnector'
import { auth } from '../apis'
import { setUser } from '../../slices/ProfileSlice'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const {SIGNUP_API,LOGIN_API,OTP_API,RESETPASSWORD_API,resetPassword_API} = auth

export async function signup(firstname, lastname , email , password , confirmPassword , accountType ,contactNumber , otp , navigate ,dispatch){

    const toastId  =  toast.loading("Loading..")
    dispatch(setLoading(true))
  
    try{
      const response = await apiConnector("POST" , SIGNUP_API, {firstname : firstname
        , lastname : lastname , email : email , password : password , confirmPassword : confirmPassword , 
        accountType : accountType ,
        contactNumber : contactNumber ,
        otp : otp 
      },{
        "Content-Type": "multipart/form-data"
      })
      if(!response.data.success){
        toast.error("not able to signup")
        toast.dismiss(toastId)
        throw new Error("message from server : " , response.data.message)
      }
      toast.success("Welcome to Study Notion.. Happy Learing")
      navigate("/login")
    }catch(err){
      toast.error("signup failed")
      console.log("signup failed : ",err)
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  
}

export function sendOtp(email,navigate){
  console.log("email from formdata : ", email)
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
   
    try{
     
      const response = await apiConnector("POST", OTP_API , {email})
      if(!response.data.success){
        toast.error("Not able to sent otp")
        toast.dismiss(toastId)
        throw new Error("Error while sending otp : " , response.data.message)
        
      }
      toast.success("otp sent successfully!")
      console.log("message from server...",response.data.message)
      console.log("otp from otpApi : ", response.data.otp)
     
      
      navigate("/verify-email")
      
    }catch(err){
      toast.error("not able to sent otp")
      console.log("error while sending otp", err)
      navigate("/")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function login(email,password,navigate){
  
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    
    dispatch(setLoading(true))
    try{
      const response = await apiConnector("POST",LOGIN_API,{
        email , password
      })
      console.log("response : ", response)
      if(!response.data.success){
        throw new Error("Not able to login.. ", response.data.message)
      }
      toast.success("logged In successfully")
      
      // setting token
      const token = response.data.token
      dispatch(setToken(response.data.token))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      console.log("token : " , token)
      // setting user
      const user = response.data.existUser
        
    
      localStorage.setItem("user", JSON.stringify(user))
      dispatch(setUser(user))
      
      navigate("/dashboard/my-profile")
    }catch(err){
      console.log("error while logging " , err)
      toast.error("not able to login ")
      navigate("/")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}
export function getResetpasswordToken(email,setEmailSent){
  return async(dispatch)=>{
    const toastId = toast.loading("Loding..")
   
    dispatch(setLoading(true))
      try{
        const response = await apiConnector("POST", RESETPASSWORD_API , {email} )
        console.log("Reset Password token : ", response.data.message)
        if(!response.data.success){
          throw new Error("Reset Password token not send ", response.data.message)
        }
        toast.success("Reset email sent")
        setEmailSent(true)

      }catch(error){
        console.log(error)
        toast.error("not able to send email")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
  }
}
export function resetPassword(password,confirmpassword,token,navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading..")
    dispatch(setLoading(true))
    
    try{
      const response = await apiConnector("PUT", resetPassword_API , {password,confirmpassword,token})
      if(!response.data.success){
        toast.error("not able to reset password")
        console.log("error : " , response.data)
      
      }
      console.log("response : ", response.data)
      toast.success("Password Reset Successfully")
      navigate("/")
    }catch(err){  
      console.log("error...",err)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}