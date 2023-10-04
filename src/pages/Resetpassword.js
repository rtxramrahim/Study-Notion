import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { getResetpasswordToken } from '../services/operations/AuthApi'
import CTAButton from '../components/core/homepage/CTAButton'
import {BsArrowLeft} from "react-icons/bs"
import { toast } from 'react-hot-toast'
import { SetEmail } from '../slices/AuthSlice'
function Resetpassword() {
    
    const {loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const [emailSent,setEmailSent] = useState(false)
    const [email,setEmail] = useState([])
    
   
    const handleOnSubmit = (e)=>{
        console.log("event : ",e)
        if(email.length==0){
            toast.error("enter your email first")
            return
        }
        e.preventDefault()
        console.log("email from resetpassword : " , email )
    
        dispatch(getResetpasswordToken(email,setEmailSent))
    }
    
  return (
    <div className='w-11/12 mx-auto'>
        <div className='flex flex-col p-10 w-[550px] mx-auto items-center justify-center gap-8 text-richblack-5'>
           {
            loading ? (<div>Loading</div>) : 
            (<div>
                <h2 className='text-richblack-5 text-[30px] leading-[38px] font-[600]'>
                    {
                        !emailSent ? ("Reset Your Password") : ("Check Mail")
                    }
                </h2>
                <p className='font-[400] text-[16px] text-richblack-200  leading-[26px] '>
                    {
                        !emailSent ? (`Have no fear. We'll email you instructions to reset your password. 
                        If you dont have access to your email we can try account recovery`) :
                        (`We have sent the reset email to
                        ${email}`)
                    }
                </p>
                <form onSubmit={handleOnSubmit} className='flex mt-3 w-full flex-col items-start justify-between gap-5'>
                    
                    {
                        !emailSent && (<div>
                            <label>
                                <p className='text-richblack-25 text-[14px]'>Email Address <span className='text-pink-300 '>*</span></p>
                                <input className='bg-richblack-800 w-[300px] formshadow rounded-sm text-richblack-200 py-1 px-1 leading-tight text-[16px]' required="true" type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email address' value={email} name='email' ></input>
                            </label>
                        </div>)
                    }
                   
                   {
                    emailSent ? (<button type='submit'>
                        Resend Mail
                    </button>) : (<button type='submit'>Reset Password</button>)
                   }
                   <div className='flex flex-row items-center gap-2'>
                 
                        <BsArrowLeft/>
                    <Link to="/login" >
                        <p className='text-richblack-100 '> Back To Login</p>
                    </Link>
                </div>
                </form>
               

            </div>)
           }
        </div>
    </div>
  )
}

export default Resetpassword