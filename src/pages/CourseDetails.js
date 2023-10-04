import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAvgRating } from '../components/core/Ratings/GetAvgRating'
import RatingStars from '../components/core/Ratings/RatingStars';
import { useState } from 'react';
import { useEffect } from 'react';
import CourseCartSection from '../components/core/courseDetails/CourseCartSection';
import {BiWorld} from 'react-icons/bi'
import { useParams } from 'react-router-dom';
import {getCourseDetails} from '../services/operations/CourseApi'
import { setCourse } from '../slices/courseSlice';
import NestedContent from '../components/core/courseDetails/NestedContent';
import Footer from '../components/core/homepage/Footer'
import RatingsAndReviews from '../components/common/RatingsAndReviews';
function CourseDetails() {
  const {courseId} = useParams()  
  const {course} = useSelector((state)=>state.course) 
  const [avgReviewCount , setAvgReviewCount] = useState(null)
 

  const dispatch = useDispatch()
  useEffect(()=>{
    const count =  GetAvgRating(course?.ratingsAndReviews)
    setAvgReviewCount(count)
  },[course])
  const handleSelectedCourse = async()=>{
        try{
            const response = await getCourseDetails(courseId)
            if(response){
                dispatch(setCourse(response))
            }
        }catch(err){
            console.log("error from frontend course details request" , err)
        }
  }
  useEffect(()=>{
    if(courseId){
        handleSelectedCourse()
        
    }
  },[])

  return (
    <div className='text-white w-[1440px] '>
        {/* section one introduction and couseCart */}
        <div className='px-[90px] py-[32px]  bg-richblack-800 flex flex-row h-[225px]'>
            <div className='w-[788px] flex flex-col gap-[12px]'>
                <p className='text-[400] text-[14px] leading-[22px] text-[#838894]'>Home / Learning / <span className='text-yellow-100' >{course?.courseName}</span></p>
                <p className='text-[500] text-[30px] leading-[38px] text-[#F1F2FF]'>{course?.courseName}</p>
                <div className='flex flex-row gap-x-3'>
                    <span className='text-[600] text-[16px] leading-[24px] text-yellow-100'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                   
                    <p className='text-[600] text-[16px] leading-[24px] text-richblack-400'>{`(${course?.ratingAndReviews?.length} ratings)`} </p>
                    <p className='text-[600] text-[16px] leading-[24px] text-richblack-400'> {course?.studentEnrolled?.length} {`students`}</p>
                    
                </div>
                <p className='text-[400] text-[16px] leading-[24px] text-richblack-25 capitalize  '>Created by {course?.instructor?.firstname} {course?.instructor?.lastname}</p>
                <div className='flex flex-row gap-2 text-[400] text-[16px] leading-[24px] text-[#DBDDEA] items-center'><span><BiWorld/></span>English</div>    
            </div>
            

            <div className='relative'>
                <CourseCartSection course={course}/>
            </div>
        </div>
        {/* section two */}
        <div className='w-[792px] py-[32px] px-[90px] '>
            <div className='flex flex-col gap-[24px] '>
                <p className='text-[500] text-[30px] leading-[38px] text-richblack-5 '>Course Description</p> 
                <p className='text-[500] text-[14px] leading-[22px] text-richblack-50'>{course?.courseDesc}</p>
            </div>
        </div>
        {/* section three */}
        <div className='w-[792px] py-[32px] px-[90px] flex flex-col gap-[16px]'>
            {/* section and courseContent */}
            <div>
                <p className='text-[600] text-[24px] leading-[32px] text-richblack-5'>Course Content</p>
            </div>
            {
                course?.courseContent?.map((content , index)=>{
                    return <div key={index}>
                                <NestedContent courseContent={content}/>
                            </div>
                })
            }
        </div>
        <div className='w-[792px] py-[32px] px-[90px] flex flex-col gap-[16px]'>
            <p className='text-[600] text-[24px] leading-[32px] text-richblack-5'>Course Benefits</p>
            <p className='text-[500] text-[14px] leading-[22px] text-richblack-50'>{course?.whatYouWillLearn}</p>
        </div>
        <div className='w-[792px] py-[32px] px-[90px] flex flex-col gap-[16px]' >
            <p className='text-[600] text-[24px] leading-[32px] text-richblack-5'>Author</p>
            <div className='flex flex-col gap-[12px]'>
                <div className='flex flex-row gap-[12px] items-baseline'>
                        <div className='w-[52px] h-[52px]'>
                            <img className='w-[100%] h-[100%] rounded-full object-cover ' src={course?.instructor?.image}></img>
                        </div>
                        <p className='capitalize  text-[500] text-[16px] leading-[24px] text-[#C5C7D4] '>{course?.instructor?.firstname} {course?.instructor?.lastname} </p>
                </div>
                <p className='text-[400] text-[14px] leading-[22px] text-[#C5C7D4]'>{course?.instructor?.additionalDetails?.bio ? (`${course?.instructor?.additionalDetails?.bio}`) : ("")}</p>
            </div>
        </div>
        <div className='w-11/12 py-[32px] px-[90px] mb-5'>
            <RatingsAndReviews/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default CourseDetails