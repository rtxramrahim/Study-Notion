import React, { useEffect } from 'react'
import { GetAvgRating } from '../Ratings/GetAvgRating'
import RatingStars from '../Ratings/RatingStars'
import { useState } from 'react'
import { removeFromCart } from '../../../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../slices/courseSlice'
function CourseAddedInCart({course , setCourses , index , }) {
    const [avgReviewCount , setAvgReviewCount] = useState(null)
    const dispatch = useDispatch()
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count)
    },[course]) 
    const handleRemoveFromCart = ()=>{
        console.log("this is running")
        dispatch(removeFromCart(course._id))
    }
    return (
    <div className='w-[792px] flex flex-row gap-[20px] py-[24px]    '>
        <div className='w-[185px] '>
            <img className='w-[100%] rounded-md object-cover' src={course?.thumbnail}/>
        </div>
        <div className='w-[408px] flex flex-col items-start gap-[9px]'>
            <p className='text-[500] text-[18px] leading-[26px] text-richblack-5 '>{course?.courseName}</p>
            <p className='text-[400] text-[16px] leading-[24px] text-richblack-300 capitalize'>By - {course?.instructor?.firstname}</p>
            <div className='flex flex-row gap-x-3'>
                <span className='text-[600] text-[16px] leading-[24px] text-yellow-100'>{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
                <span className='text-[600] text-[16px] leading-[24px] text-richblack-600'>{course?.ratingAndReviews?.length} Ratings</span>
            </div>
        </div>
        <div className='flex flex-col gap-3'>
            <button className='text-[500] text-[16px] leading-[24px] text-pink-300 p-2 bg-richblack-700 rounded-md' onClick={()=>handleRemoveFromCart()}>Remove</button>
            <p className='text-[600] text-[24px] leading-[32px] text-yellow-50'>₹{course?.price}</p>
        </div>
        
    </div>
    
  )
}

export default CourseAddedInCart