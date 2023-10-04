import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CTAButton from '../components/core/homepage/CTAButton'
import { useDispatch } from 'react-redux'
import OTPInput from 'react-otp-input'
import { sendOtp, signup } from '../services/operations/AuthApi'
import { useSelector } from 'react-redux'
import { useState } from 'react'
function VerificationEmail() {
  const [otp , setOtp] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {signupData} = useSelector((state)=>state.auth)
  
  const {firstname , lastname , email , password , confirmPassword , accountType , contactNumber } = signupData
  
  const submitHandler = async(e)=>{
    console.log("data " , signupData)
    e.preventDefault()
    console.log("from emailverifcation : ", otp)
    await signup(firstname,lastname,email,password,confirmPassword,accountType,contactNumber,otp, navigate , dispatch)
  }
 
 
  return (
    <div className='w-[550px] mx-auto p-[30px] mt-5'>
        <div className='flex flex-col gap-4 item-center justify-center'>
          <h2 className='text-richblack-5 font-[600] text-[30px] leading-[38px] '>Verify email</h2>
          <p className='text-[400] text-[18px] leading-[26px] text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={submitHandler}>
            <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} 
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50" />}
            />
            <button type='submit' className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Verify Email</button>
          </form>
          
          <div className='flex flex-row justify-between'>
            <Link className='text-richblack-5 ' to={"/login"}>Back to Login</Link>
            <button onClick={()=>dispatch(sendOtp(email))} className='text-blue-400'>Resend It</button>
           </div>
        </div>
    </div>
  )
}

export default VerificationEmail