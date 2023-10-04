import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {useForm} from "react-hook-form"
import countrycode from "../../../src/data/countrycode.json"
function ContactUsForm() {
    const [loading,setLoading] = useState(false)
    const {register,handleSubmit,reset,formState : {errors,isSubmitSuccessful}} = useForm();
    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email : "",
                firstname : "",
                lastname : "",
                message : "",
                phoneNo : ""
            })
        } 
    },[reset,isSubmitSuccessful])

    const submitContactForm = async(data)=>{
        console.log("form data : ", data)
        const response =  {status : "OK"}
        console.log("reponse : ",response)
      
    }
    
  return (
    <form  onSubmit={handleSubmit(submitContactForm)} className='flex flex-col items-start'>
        <div className='flex flex-row items-center gap-4 '>
            <div>
                <label className='p-[12px] flex flex-col gap-2'>
                    <p className='font-[400] text-[14px] leading-[22px] text-richblack-5'>First Name</p>
                    <input  name='firstname' type='text'  className='text-richblack-200 formshadow bg-richblack-800 p-[3px] font-[500] text-[16px] leading-[24px] rounded-md' {...register("firstname",{require :{value : true,message:"please enter your first name"}})}></input>
                    {
                    errors.firstname && (<span>{errors.firstname.message}</span>)
                }
                </label>
              
            </div>
            <div>
                <label className='p-[12px] flex flex-col gap-2'>
                    <p className='font-[400] text-[14px] leading-[22px] text-richblack-5'>Last Name</p>
                    <input name='lastname' type='text' className='text-richblack-200 formshadow bg-richblack-800 p-[3px] font-[500] text-[16px] leading-[24px] rounded-md' {...register("lastname",{require : true,message : "Please enter your lastname"})}></input>
                    
                </label>
                {
                    errors.lastname && (<span>{errors.lastname.message}</span>)
                }
            </div>
        </div>
        <div>
            <label className='p-[12px] flex flex-col gap-2'>
                <p className='font-[400] text-[14px] leading-[22px] text-richblack-5'>Email</p>
                <input name='email' type='email' className='text-richblack-200 formshadow bg-richblack-800 p-[3px] font-[500] text-[16px] leading-[24px] rounded-md'  {...register("email",{require : true, message : "Please enter your email"})}></input>
                   
            </label>
            {
                errors.email && (<span>{errors.email.message}</span>)
            }
        </div>
        <div>
            <label className='p-[12px] flex flex-col gap-2'>
                <p className='font-[400] text-[14px] leading-[22px] text-richblack-5'>ContactNo.</p>
                <div className='flex flex-row gap-2'>
                    <select  className='text-richblack-200 bg-richblack-800 p-[3px] font-[500] text-[16px] leading-[24px] rounded-md w-[60px]'  name='countrycode' {...register("countrycode",{required:true})}>
                        {
                            countrycode.map((element,index)=>{
                                return (
                                    <option key={index} value={element.code}>
                                        {element.code} - {element.country}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <input className='text-richblack-200 formshadow bg-richblack-800 p-[3px] font-[500] text-[16px] leading-[24px] rounded-md' type='text' name='phoneNo' {...register("phoneNo",{required:{value : true,message:"please enter phone number"},
                                                                              maxLength:{value : 10 , message:"Invalid phone number"},
                                                                              minLength:{value : 8 , message:"Invalid phone number"}})}>
                    </input>
                    {
                        errors.phoneNo && (<span>{errors.phoneNo.message}</span>)
                    } 
                </div>
            </label>
        </div>
        <div>
            <label className='p-[12px] flex flex-col gap-2'>
                <p className='font-[400] text-[14px] leading-[22px] text-richblack-5'>Message</p>
                <textarea className='text-richblack-200 bg-richblack-800 p-[3px] font-[500] text-[16px] formshadow leading-[24px] rounded-md' rows={"7"} cols={"50"}  name='message' {...register("message",{required : true}) }></textarea>
                {
                    errors.message && (<span>Please enter your message</span>)
                }
            </label>
        </div>
        <div className='p-[12px] mx-auto '>
        <button className='text-black bg-yellow-50 p-[12px] rounded-md hover:scale-105 transition-all duration-200' type='submit'>Send Message</button>
        </div>
    </form>
  )
}

export default ContactUsForm