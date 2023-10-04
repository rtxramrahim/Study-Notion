import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../services/apis'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import {BsArrowLeft} from "react-icons/bs"
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { resetPassword } from '../services/operations/AuthApi';
import CTAButton from '../components/core/homepage/CTAButton';
import { useNavigate } from 'react-router-dom';
function UpdatePassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [formData , setFormData] = useState({password : "",confirmPassword : ""})
    const [showpassword,setshowPassword] = useState(false)
    const [showconfirmpass,setshowconfirmPass] = useState(false)
    const [pass,setPassword] = useState("")
    const [newpassword,setNewPassword] = useState("")
    const {loading} = useSelector((state)=>state.auth);
    
    
   
    const {password,confirmPassword} = formData
    const handleonChange = (event)=>{
        const {name,value} = event.target
        setFormData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    const handleOnSubmit = (event)=>{
        event.preventDefault()
        // if(formData.password==formData.confirmPassword){
        //     toast.error("same password as previous")
        //     return
        // }
        console.log("password : ",password)
        console.log("confirmPassword : ",confirmPassword)
        const token = location.pathname.split("/").at(-1)
        
        console.log("token : ",token)
        dispatch(resetPassword(password,confirmPassword,token,navigate))
    }
  return (
    <div>
        {
            loading ? (<div></div>) : 
            (<div className='w-[550px] flex flex-col mx-auto p-10 gap-2 items-start justify-between'>
                <h2 className='text-richblack-5 text-[30px] leading-[38px] font-[600]'>Choose a New Password</h2>
                <p className='font-[400] text-[16px] leading-[26px] text-richblack-100 ' >Almost done. Enter your new password and youre all set.</p>
                <form onSubmit={handleOnSubmit} className='flex flex-col items-start justify-between gap-2'>
                    <label className='relative'>
                        <p className='text-richblack-25'>New password <span className='text-pink-300'>*</span></p>
                        <input className='bg-richblack-800 w-[200px] formshadow rounded-sm text-richblack-200 py-1 px-1 leading-tight' onChange={handleonChange} type={showpassword ? 'text' : 'password'} value={password}  name='password'>
                            
                        </input>
                        <span className='absolute right-3 top-7' onClick={()=>setshowPassword((prev=>(!prev)))}>{showpassword ? <AiOutlineEyeInvisible color='white'/>:<AiOutlineEye color='white'/>}</span>
                    </label>
                    <label className='relative'>
                        <p className='text-richblack-25'>Confirm password <span className='text-pink-300'>*</span></p>
                        <input className='bg-richblack-800 w-[200px] formshadow rounded-sm text-richblack-200 py-1 px-1 leading-tight' onChange={handleonChange} type={showconfirmpass ? 'text' : 'password'} value={confirmPassword}  name='confirmPassword'>
                            
                        </input>
                        <span className='absolute right-3 top-7' onClick={()=>setshowconfirmPass((prev)=>!prev)}>{showconfirmpass ? <AiOutlineEyeInvisible color='white'/>:<AiOutlineEye color='white'/>}</span>
                    </label>

                    <button className='text-white' type='submit'>Reset Password</button>
                    <div className='text-richblack-200 flex flex-row items-center justify-between gap-2 '>
                            <BsArrowLeft/>
                        <Link to={"/login"}>Back to login</Link>
                    </div>
                </form>
            </div>)
        }
    </div>
  )
}

export default UpdatePassword