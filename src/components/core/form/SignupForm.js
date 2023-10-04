import { sendOtp } from '../../../services/operations/AuthApi'
import CTAButton from '../homepage/CTAButton'
import { AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { setSignupData } from '../../../slices/AuthSlice'
import React from 'react'
function SignupForm(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {signUpData} = useSelector((state)=> state.auth)
    const [Formdata,setFormData] = useState({firstname : ""  , lastname : "", email : "", contactNumber : "" , password : "" , confirmPassword: ""})
    const changeHandler = (event)=>{
        const {value,name}=event.target
        setFormData((prev)=>(
            {
                ...prev,
                [name] : value
            }
            
        )
        )
        
    }
    const [accountType,setaccountType] = useState("Student")
    const [showpassword,setshowPassword] = useState(false)
    const [confirmpassword,setconfirmPass] = useState(false)
    const submitHandler = (event)=>{
        event.preventDefault()
     
        
        if(Formdata.password!==Formdata.confirmPassword){
            toast.error("Passwords Do Not Match")
            return
        }
        const signUpData = {
            ...Formdata,
            accountType
        }
        console.log("signup data : " , signUpData)
        
        try{
            
            dispatch(setSignupData(signUpData))
            console.log("signup data after setting : " , signUpData)
            dispatch(sendOtp(Formdata.email , navigate))
        }catch(e){
            console.log("error : " , e)
        }

        // setFormData({
        //     firstname : "" , lastname : "", email : "", phnNumber : "" , password : "" , confirmpass : ""
        // })
        // setaccType("Student")

    }
    
    
return(
    <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-row bg-richblack-700 shadow-md gap-1 justify-between rounded-full items-start'>
                <button onClick={()=>setaccountType("Student")} className={`rounded-full py-[6px] px-[18px] w-[50%] text-[16px] text-center leading-[24px] text-richblack-200 ${accountType === "Student" ? `bg-richblack-800 text-richblack-50` : `bg-richblack-700`}`}>Student</button>
                <button onClick={()=>setaccountType("Instructor")} className={`rounded-full  py-[6px] px-[18px] w-[50%] text-[16px] text-center leading-[24px] text-richblack-200 ${accountType=== "Instructor" ? `bg-richblack-800 text-richblack-50` : `bg-richblack-700` }`}>Instructor</button>
        </div>
        <form onSubmit={submitHandler} className='flex flex-col items-start gap-4'>
            <div className='flex flex-row items-start gap-4'>
                <label className='text-richblack-25  '>
                        <p>First Name <span className='text-pink-300'>*</span> </p>
                        <input className='bg-richblack-800 formshadow w-full rounded-sm text-richblack-200 py-1 px-1 leading-tight ' type='text'  value={Formdata.firstname} name='firstname' onChange={changeHandler} required />
                </label>
                <label  className='text-richblack-25 '>
                    <p>Last Name <span  className='text-pink-300'>*</span></p>
                    <input className='bg-richblack-800 w-full formshadow  rounded-sm text-richblack-200 py-1 px-1 leading-tight ' type='text'  value={Formdata.lastname} name='lastname' onChange={changeHandler} required />
                </label>
            </div>
            <label className='text-richblack-25  w-full'>
                <p>Email Address <span className='text-pink-300'>*</span></p>
                <input className='bg-richblack-800 w-full  formshadow rounded-sm text-richblack-200 py-1 px-1 leading-tight ' type='email'  value={Formdata.email} name='email' onChange={changeHandler} required />
            </label>
            <div>
                <label>
                    <p className='text-richblack-25'>Contact Number<span className='text-pink-300'>*</span></p>
                    <div className='flex flex-row gap-3 '>
                        <select  className='bg-richblack-800 formshadow  rounded-sm text-richblack-200 py-1 px-1 leading-tight '>
                            <option>+91</option>
                            <option>+71</option>
                            <option>+51</option>
                            <option>+41</option>
                            <option>+21</option>
                        </select>
                    <input className='bg-richblack-800 formshadow p-[12px] rounded-sm text-richblack-200 py-1 px-1 leading-tight' onChange={changeHandler} name='contactNumber' value={Formdata.contactNumber}></input>
                    </div>
                </label>
            </div>
            <div className='flex flex-row gap-3'>
                <label className='relative'>
                    <p className='text-richblack-25'>Create Password</p>
                    <input className={`bg-richblack-800 formshadow rounded-sm text-richblack-200 py-1 px-1 leading-tight`} type={`${showpassword ? "text":"password"}`}  onChange={changeHandler} value={Formdata.password} name='password'></input>
                    <span className="absolute right-2 top-[30px] cursor-pointer" onClick={()=>setshowPassword(!showpassword)}>
                        {
                            showpassword ? <AiOutlineEyeInvisible  fontSize={18} fill="#AFB2BF"/> : <AiOutlineEye  fontSize={18} fill="#AFB2BF"/>
                        }
                    </span>
                </label>
                <label className='relative'>
                    <p className='text-richblack-25'>Confirm Password</p>
                    <input  className='bg-richblack-800 formshadow rounded-sm text-richblack-200 py-1 px-1 leading-tight' type={`${confirmpassword ? "text":"password"}`} onChange={changeHandler} value={Formdata.confirmPassword} name='confirmPassword'></input>
                    <span className="absolute right-2 top-[30px] cursor-pointer" onClick={()=>setconfirmPass(!confirmpassword)}>
                        {
                            confirmpassword ? <AiOutlineEyeInvisible  fontSize={18} fill="#AFB2BF"/> : <AiOutlineEye  fontSize={18} fill="#AFB2BF"/>
                        }
                    </span>
                </label>

            </div>
       
            <button className='mx-auto p-[10px] text-center text-[16px] leading-[24px]  font-[500] py-[10px] px-[22px] rounded-md font-inter bg-yellow-50 transition-all duration-200 text-black hover:scale-105'>Create Account</button>
            {/* <CTAButton active={true}>Create Account</CTAButton> */}
           
                   
        </form>
    </div>
)
}

export default SignupForm