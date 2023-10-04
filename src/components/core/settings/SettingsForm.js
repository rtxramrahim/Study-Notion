import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import { updateProfile } from '../../../services/operations/updateProfileApi';
function SettingsForm() {

  const {register,handleSubmit, reset, getValues , setValue ,formState : {errors}} = useForm();
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.profile)    
  
  const updateProfileData = async(data)=>{

        const bodyData = {
            "firstname" : data?.firstname,
            "lastname"  : data?.lastname,
            "dateOfBirth" : data?.dateOfBirth,
            "gender"  : data?.gender,
            "phoneNumber" : data?.phoneNumber,
            "bio" : data?.bio
        }
            await updateProfile(bodyData , token , dispatch)
          
}
 
  
  
  return (
    <div className='text-white'>
        <form onSubmit={handleSubmit(updateProfileData)} className='flex flex-col  gap-[20px]'>
            <div className='flex  flex-row items-center gap-[24px]'>
                <label>
                    <p className='font-400 w-full  text-[14px] leading-[22px] text-richblack-5'>First Name</p>
                    <input readOnly={true} className='rounded-md  p-[4px] bg-richblack-700 formshadow text-richblack-100'  type='text' name='firstname' defaultValue={user?.firstname} {...register("firstname" )}></input>
                    
                </label>
                <label>
                    <p className='font-400 text-[14px] leading-[22px] text-richblack-5'>Last Name</p>
                    <input readOnly={true} className='rounded-md  p-[4px] bg-richblack-700 formshadow text-richblack-100'  type='text' name='lastname' defaultValue={user?.lastname}  {...register("lastname")}></input>
                </label>
            </div>

            <div className='flex flex-row w-[360px] items-center gap-[24px]'>
                <label>
                    <p className='font-400 text-[14px] leading-[22px] text-richblack-5' >Date Of Birth</p>
                    <input className='rounded-md p-[4px]  bg-richblack-700 formshadow text-richblack-100'  type='date' name='date' defaultValue={user?.additionalDetails?.dateOfBirth} {...register("dateOfBirth")}></input>
                 
                </label>
                <label>
                    <p className='font-400 text-[14px] leading-[22px] text-richblack-5'>Gender</p>
                    <select name='gender' defaultValue={user?.additionalDetails?.gender} {...register("gender")} className='rounded-md  p-[5px]  bg-richblack-700 formshadow text-richblack-100 flex flex-row justify-between gap-2 '>
                        <option value='male' name='gender'>Male</option>
                        <option value='female' name='gender'>Female</option>
                        <option value='other' name='gender'>Other</option>
                    </select>
                </label>
            </div>

            <div className='flex flex-row items-center gap-[24px]'>
                <label>
                    <p className='font-400 text-[14px] leading-[22px] text-richblack-5'>Phone Number <span className='text-pink-300 '>*</span></p>
                    <div className='flex flex-row gap-2'>
                        <select className='rounded-md p-[4px] bg-richblack-700 formshadow text-richblack-100'>
                            <option>+91</option>
                            <option>+90</option>
                            <option>+91</option>
                            <option>+93</option>
                            <option>+94</option>
                            <option>+95</option>
                        </select>
                        <input className='rounded-md p-[4px] bg-richblack-700 formshadow text-richblack-100' type='text' defaultValue={user?.additionalDetails?.phoneNumber} name='phoneNumber' {...register("phoneNumber")}></input>
                    </div>
                </label>
                <label>
                    <p className='font-400 text-[14px] leading-[22px] text-richblack-5'>About</p>
                    <input  className='rounded-md  p-[5px] bg-richblack-700 formshadow text-richblack-100 flex flex-row justify-between gap-2' defaultValue={user?.additionalDetails?.bio} type='text' name='about' {...register("bio")}></input>
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

export default SettingsForm