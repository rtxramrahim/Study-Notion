import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateCourse } from '../../../../services/operations/CourseApi'
import { resetCourse, setCourse } from '../../../../slices/courseSlice'
function PublishCourseForm() {
    const {setValue , getValues , register , formState : {errors} , handleSubmit } = useForm()
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const {course} = useSelector((state)=>state.course)
    const navigate = useNavigate()
    useEffect(()=>{
        if(course?.status === "Published"){
            setValue("public" , true) 
        }
    },[])
    const gotoCourse = ()=>{
        dispatch(resetCourse())
        navigate("/dashboard/my-courses")
    }
    const handleCoursePublish = async(data)=>{
        if((course?.status === "Published" && getValues("public") === true) || (course?.status === "Draft" && getValues("public") === false) ){
            // form  is not updated move to my courses
            gotoCourse()
            return
        }
        else{
            const status = getValues("public") === true ? "Published" : "Draft"
            console.log("published status" , data.public)
            const formdata = {
                "courseId" : course._id,
                "status" : status
            }
            console.log("formdata for updating status" , formdata)
            let publish = "Varpublish"
            const response = await updateCourse(formdata , token , dispatch  , publish)
            if(response){
                gotoCourse()
            }
        }   
    }   
  return (
    <div className='text-white w-[665px] p-[24px] flex flex-col gap-4 items-start border border-richblack-50 rounded-md'>
     <p className='text-richblack-100 text-4xl'>Publish</p>
        <div className='flex flex-col gap-3 '>
           
            <form className='flex flex-col gap-3 justify-between items-start' onSubmit={handleSubmit(handleCoursePublish)}>
               <label className='flex flex-row gap-2 items-baseline'>
                    <input type='checkbox' {...register('public', {required : true})}></input>
                    <span className='text-richblack-200 text-[600] leading-[24px] text-[16px] '>Make This Course Public</span>
               </label>
               <button className='bg-yellow-50 text-black text-[16px] text-semibold p-2 rounded-md'>Save Changes</button>
            </form>
        </div>
    </div>
  )
}

export default PublishCourseForm