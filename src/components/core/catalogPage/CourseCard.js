import React from 'react'
import { useEffect } from 'react';
import { GetAvgRating } from '../Ratings/GetAvgRating';
import { useState } from 'react';
import RatingStars from '../Ratings/RatingStars';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCourse } from '../../../slices/courseSlice';
function CourseCard({course}) {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const dispatch = useDispatch()
    // const handleSelectedCourse = (selectedCourse)=>{
    //     dispatch(setCourse(selectedCourse))
    // }
    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])
    
return (
    <div  className='w-[384px]'>
        <Link className='w-[384px]' to={`/courses/${course._id}`}>
            <div className='flex flex-col items-start justify-between gap-6 '>
                <div >
                    <img 
                        src={course?.thumbnail}
                        alt='Image'
                        className={`w-[384] h-[201px] rounded-xl object-cover`}
                    />
                </div>
                <div className='flex flex-col gap-[9px] '>
                    <p className='text-richblack-5 text-[500] text-[16px] leaeding-[24px]'>{course?.courseName}</p>
                    <p className='text-[400] text-[16px] leading-[24px] text-[#838894] capitalize '>By -  {course?.instructor?.firstname} {course?.instructor?.lastname} </p>
                    <div className='flex flex-row  gap-x-3'>
                        <span className='text-[600] text-[16px] leading-[24px] text-yellow-100'>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className='text-[600] text-[16px] leading-[24px] text-richblack-600'>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p className='text-[600] text-[20px] leading-[28px] text-richblack-5'>₹{course?.price}</p>
                </div>
            </div>
        </Link>

      
    </div>
  )
}

export default CourseCard