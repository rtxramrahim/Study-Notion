import React from 'react'
import { AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import { useState } from 'react'
import {useForm} from "react-hook-form"
import { changePassword } from '../../../services/operations/updateProfileApi'
import { useSelector } from 'react-redux'
function PasswordForm() {
    const {register,handleSubmit,reset,formState : {errors,isSubmitSuccessfull}} = useForm()
    const [showpassword,setshowPassword] = useState(false)
    const [confirmpass , setConfirmPass] = useState(false)
    const [oldPassword , setOldPassword ] = useState(false)
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)
    const handleChangePassword = async(data)=>{
       const email = user?.email
       const oldPassword = data?.oldPassword
       const newpassword = data?.newpassword
       const confirmPassword = data?.confirmPassword
       const response = await changePassword(oldPassword , newpassword ,confirmPassword , token)
       if(response){
            console.log("Password changed")
       }
    }
  return (
    <div>
        <form onSubmit={handleSubmit(handleChangePassword)}>
            <div className='flex  flex-row items-center gap-[24px]'>
                <label className='relative'>
                    <p className='font-400   text-[14px] leading-[22px] text-richblack-5'>Current Password</p>
                    <input className='rounded-md  p-[4px] bg-richblack-700 formshadow text-richblack-100' type={oldPassword ? "text" : "password"} name='Oldpassword' {...register("oldPassword" )}></input>
                    <span className="absolute right-2 top-[30px] cursor-pointer text-richblack-25" onClick={()=>setshowPassword(!oldPassword)}>
                        {oldPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </span>
                </label>
                <label className='relative'>
                    <p className='font-400   text-[14px] leading-[22px] text-richblack-5'>New Password</p>
                    <input className='rounded-md  p-[4px] bg-richblack-700 formshadow text-richblack-100' type={showpassword ? "text" : "password"} name='newpassword' {...register("newpassword" )}></input>
                    <span className="absolute right-2 top-[30px] cursor-pointer text-richblack-25" onClick={()=>setshowPassword(!showpassword)}>
                        {showpassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </span>
                </label>
                <label className='relative'>
                    <p className='font-400 text-[14px] leading-[22px] text-richblack-5'>Confirm Password</p>
                    <input className='rounded-md  p-[4px] bg-richblack-700 formshadow text-richblack-100' type={confirmpass ? "text" : "password"} name='confirmPass' {...register("confirmPassword")}></input>
                    <span onClick={()=>setConfirmPass(!confirmpass)} className="absolute text-richblack-25 right-2 top-[30px] cursor-pointer">
                        {
                            confirmpass ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                        }
                    </span>
                </label>
            </div>
           <div>
            <div className='flex flex-row gap-1 justify-end mt-5'>
                    <div className='w-[96px] h-[36px]'>
                        <button type='submit' className='bg-yellow-50 text-black py-[6px] px-[18px] rounded-md '>Change</button>
                    </div>
            </div>
           </div>
        </form>
    </div>
  )
}

export default PasswordForm