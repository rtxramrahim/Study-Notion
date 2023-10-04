import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import {createRatings} from "../../../services/operations/RatingsAndReviews"
import { useParams } from 'react-router-dom'
import {AiFillCloseSquare} from "react-icons/ai"
function ReviewModal({setModal}) {
  const {register , handleSubmit , setValue , getValues , formState : {errors}} = useForm()
  const {courseEntireData} = useSelector((state)=>state.viewCourse)
  const {token } = useSelector((state)=>state.auth)
  const {user} = useSelector((state)=>state.profile)
  const ratingChanged = (newRatings)=>{
    setValue("courseRatings" , newRatings)
  }
 const {courseId} = useParams()
  useEffect(()=>{
    setValue("courseExperience" , "")
    setValue("courseRatings" , "")
  },[])

  const onSubmit = async()=>{
    const courseExperience =  getValues("courseExperience")
    const courseRatings = getValues("courseRatings")
    const response = await createRatings(courseRatings , courseExperience , courseId  , user._id  , token)
    if(response){
      setModal(false)
    }
    console.log("courseExperience" , courseExperience )
    console.log("courseRatings" , courseRatings )
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm ">
      <div className='w-[665px] rounded-md bg-richblack-800'>
    
    <div className='flex  p-[24px] flex-col gap-[24px]'>
    <div className='flex flex-row justify-end cursor-pointer' onClick={()=>setModal(false)}>
            <AiFillCloseSquare/>
          </div>
      <div className='w-[100%] bg-richblack-600  rounded-md'>
          <button className=' text-[600] text-[18px] leading-[26px] text-richblack-5 p-1'>Add Review</button>
          
      </div>
      {/* Modal Body */}
      <div className='w-[601px] mx-auto gap-3 flex flex-row justify-center  items-center '>
          <div className=''>
            <img className='object-cover w-[52px] h-[52px] rounded-full' src={user.image}  height={52} width={52} alt='image' />
          </div>
          <div>
            <p className='text-[600] text-[16px] leading-[24px] text-richblack-5 capitalize '>{user.firstname} {user.lastname}</p>
            <p className='text-[400] text-[14px] leading-[22px] text-richblack-100 capitalize'> posting publicly</p>
          </div>
      </div>
    </div>
    <form className='w-[601px] flex items-center  flex-col gap-[24px] ' onSubmit={handleSubmit(onSubmit)}>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          color2={'#ffd700'}
        />
        <div className='flex flex-col gap-4'>
          <label className='text-[400] text-[14px] leading-[22px] text-richblack-50' htmlFor='courseExperience'>Add Your Experience</label>
          <textarea className='text-richblack-50 p-[12px] rounded-md bg-richblack-600 text-[500] text-[16px] leading-[24px]' id='courseExperience' rows={8} cols={40} placeholder='Share Details of your own experience for this course' {...register("courseExperience" , {required : true})} ></textarea>
          {
            errors.courseExperience && <span>Please add your experience</span>
          }
        </div>
        <div className='mb-[20px]'>
          
          <button className='text-[500] text-[16px] leading-[24px]   bg-yellow-100 text-black p-1 rounded-md'>Save</button>
        </div>
    </form>
  </div>
    </div>
  )
}

export default ReviewModal