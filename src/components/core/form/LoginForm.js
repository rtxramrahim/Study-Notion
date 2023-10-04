import React from 'react'
import Template from './Template'
import { useState } from 'react'
import CTAButton from '../homepage/CTAButton'
import { AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/operations/AuthApi'
import { Link } from 'react-router-dom'
function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formdata ,setFormdata] = useState({email : "" , password : ""})
  const [accType,setaccType] = useState("Student")
  const[showpassword,setshowPassword]=useState(false)
   
  const changeHandler = (event)=>{
    const {name , value} = event.target
    setFormdata((prev)=>(
      {
        ...prev,
        [name] : value
      }
    ))
  }
  const submitHandler = (event)=>{
    event.preventDefault()
    console.log(formdata)
    console.log(accType)
    dispatch(login(formdata.email,formdata.password,navigate))
}
  return (
    <div className='flex flex-col w-[100%] items-start  gap-4 '>
      {/* <div className='flex flex-row bg-richblack-700 shadow-md gap-1 justify-between rounded-full items-start'>
            <div onClick={()=>setaccType("Student")} className={`rounded-full py-[6px] px-[18px] w-[50%] text-[16px] text-center leading-[24px] text-richblack-200 ${accType === "Student" ? `bg-richblack-800 text-richblack-50` : `bg-richblack-700`}`}>Student</div>
            <div onClick={()=>setaccType("Instructor")} className={`rounded-full  py-[6px] px-[18px] w-[50%] text-[16px] text-center leading-[24px] text-richblack-200 ${accType=== "Instructor" ? `bg-richblack-800 text-richblack-50` : `bg-richblack-700` }`}>Instructor</div>
      </div> */}
      <form onSubmit={submitHandler} className='flex flex-col w-[60%] gap-4'>
        <label>
          <p className='text-richblack-25'>Email Address <span className='text-pink-300'>*</span> </p>
          <input  className='bg-richblack-800 w-full formshadow rounded-sm text-richblack-200 py-1 px-1 leading-tight'  onChange={changeHandler} type='email' name='email' value={formdata.email}></input>
        </label>
        <label className='relative'>
          <p className='text-richblack-25'>Password <span className='text-pink-300'>*</span></p>
          <input  className='bg-richblack-800 w-full formshadow rounded-sm text-richblack-200 py-1 px-1 leading-tight'  onChange={changeHandler} type={`${showpassword ? "text" : "password"}`} name='password' value={formdata.password}></input>
          <span className="absolute right-2 top-[30px] cursor-pointer" onClick={()=>setshowPassword(!showpassword)}>
                        {
                            showpassword ? <AiOutlineEyeInvisible  fontSize={18} fill="#AFB2BF"/> : <AiOutlineEye  fontSize={18} fill="#AFB2BF"/>
                        }
                    </span>
        </label>
        <span className='text-right -mt-2 text-blue-300 text-[12px] italic'><Link to="/forgot-password">forgot password </Link></span>
        <button  className='mx-auto p-[10px] text-center text-[16px] leading-[24px]  font-[500] py-[10px] px-[22px] rounded-md font-inter bg-yellow-50 transition-all duration-200 text-black hover:scale-105'>
            Sign In
        </button>
        
      </form>
    </div>
  )
}

export default LoginForm
