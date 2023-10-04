import React from 'react'
import { useForm } from 'react-hook-form'
import contactUsSupport from '../../../services/operations/contactUsAPi'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
function ContactUSForm() {
    const {register , handleSubmit , setValue , getValues , reset, formState : { errors , isSubmitSuccessful } } = useForm()
    const onSubmit = async(data)=>{
        const response = await contactUsSupport(data.email , data.firstname , data.lastname , data.message , data.phoneNumber)
        if(response){
            toast.success("Message sent!")
        }
    }
    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            email: "", firstname: "", lastname: "", message: "", phoneNumber: "",
          })
        }
      }, [reset, isSubmitSuccessful])  
  return (
    <div className='text-white w-[698px] p-[52px] flex flex-col contactform rounded-md gap-[32px] bg-richblack-900'>
           <div>
                <p className='text-[600] text-[36px] leading-[44px] text-richblack-5'>Got a Idea? We've got the skills. Let's team up</p>
                <p className='text-[500] text-[16px] leading-[24px] text-richblack-300'>Tell us more about yourself and what you're got in mind.</p>
           </div>

           <form onSubmit={handleSubmit(onSubmit)} className='w-[594px] flex flex-col gap-[20px] items-start'>
                <div className='w-[100%] gap-[20px] flex flex-row'>
                    <label className='flex flex-col gap-1'>
                        <p className='text-[400] text-[14px] leading-[22px] text-richblack-50'>First Name</p>
                        <input className='text-[500] text-[16px] leading-[24px] p-[4px] bg-richblack-700 text-richblack-100 rounded-md' type='text' name='firstname' placeholder='Enter first name' {...register("firstname" , {required : true}) }/>
                        {errors.firstname && <span>This is a required field</span>}
                    </label>
                    <label className='flex flex-col gap-1'>
                        <p className='text-[400] text-[14px] leading-[22px] text-richblack-50'>Last Name</p>
                        <input className='text-[500] text-[16px] leading-[24px] p-[4px] bg-richblack-700 text-richblack-100 rounded-md' type='text' name='lastname' placeholder='Enter last name' {...register("lastname",{required : true})}/>
                        {errors.lastname && <span className='text-[500] text-[16px] leading-[24px] text-pink-200  '>This is a required field</span>}
                    </label>

                </div>
                <div className='w-[100%] gap-[20px] flex flex-row'>
                    <label className='flex flex-col gap-1'>
                        <p  className='text-[400] text-[14px] leading-[22px] text-richblack-50' >Email</p>
                        <input className='text-[500] text-[16px] leading-[24px] p-[4px] bg-richblack-700 text-richblack-100 rounded-md' type='email' name='email' placeholder='Enter your email' {...register("email",{required : true})}></input>
                        {errors.email && <span className='text-[500] text-[16px] leading-[24px] text-pink-200  '>This is a required field</span>}
                    </label>
                </div>
                <div  className='w-[100%] gap-[20px] flex flex-row'>
                    <label className='flex flex-col gap-1'>
                    <p className='text-[400] text-[14px] leading-[22px] text-richblack-50' >Phone Number</p>
                    <div className='flex flex-row gap-[20px]'>
                        <select className='text-[500] text-[16px] leading-[24px] p-[4px] bg-richblack-700 text-richblack-100 rounded-md'>
                            <option>+91</option>
                            <option>+92</option>
                            <option>+94</option>
                            <option>+95</option>
                            <option>+96</option>
                        </select>
                        <input className='text-[500] text-[16px] leading-[24px] p-[4px] bg-richblack-700 text-richblack-100 rounded-md' type='number' name='phoneNumber' placeholder='Enter your phone number' {...register("phoneNumber",{required : true})}></input>
                        { errors.phoneNumber && <span className='text-[500] text-[16px] leading-[24px] text-pink-200  '>This is a required field</span>}
                    </div>
                    </label>
                </div>
                <div  className='w-[100%] gap-[20px] flex flex-row'>
                    <label className='flex flex-col gap-1'>
                        <p className='text-[400] text-[14px] leading-[22px] text-richblack-50'>Message</p>
                        <textarea className='text-[500] text-[16px] leading-[24px] p-[4px] bg-richblack-700 text-richblack-100 rounded-md' name='message' {...register("message" , {required : true})} rows={10} cols={50} placeholder='Enter Email Address'></textarea>
                        { errors.message && <span className='text-[500] text-[16px] leading-[24px] text-pink-200  '>This is a required field</span>}
                    </label>
                </div>   

                <button className='w-[80%] mx-auto hover:bg-yellow-50 transition-all duration-200 bg-yellow-100 text-center p-[4px] rounded-md text-black'>
                    Send Message
                </button> 
           </form>
    </div>
  )
}

export default ContactUSForm