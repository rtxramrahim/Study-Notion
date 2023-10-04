import React from 'react'
import { getRatings } from '../../services/operations/RatingsAndReviews'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import { useState } from 'react'
import ReactStars from 'react-stars'
import { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'

function RatingsAndReviews() {
    const [reviews , setReview ] = useState(null)
    const handleRatings = async()=>{
        const response = await getRatings()
        if(response?.length > 0){
            setReview(response)
        }
    }
    useEffect(()=>{
        handleRatings()
    },[])
  return (
    <div>
        {
            reviews &&
            <Swiper 
            slidesPerView={3}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            pagination
            autoplay={{
                delay: 2500,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className='w-full mx-auto'>
                {
                    reviews?.map((review , index)=>{
                        return <SwiperSlide key={index} className='text-white w-[250px] h-[200px] flex flex-col items-start gap-5 bg-richblack-800 p-2 rounded-md'>
                        <div className='w-[200px] h-[200px]'>
                        <div className='flex flex-row gap-4 items-center capitalize text-[400] text-[14px] leading-[22px] text-richblack-100  mb-2'>
                                <img
                                    src={review?.userId?.image
                                    ? review?.userId?.image
                                    : `https://api.dicebear.com/5.x/initials/svg/seed=${review?.userId?.firstname}%20${review?.userId?.lastname}`}
                                    alt='Profile Pic'
                                    className='h-9 w-9 object-cover rounded-full'
                                    />
                                <p>{review?.userId?.firstname} {review?.userId?.lastname}</p>
                        </div>
                            <p className='text-[500] text-[14px] leading-[22px] text-richblack-50'>{review?.course?.courseName}</p>
                            <p className='text-[400] w-[200px]  text-[14px] leading-[22px] text-richblack-50 capitalize'>{review?.reviews} </p>
                        <div className='flex flex-row gap-3 items-center'>
                            <p className='text-[500] text-[16px] leading-[22px] text-yellow-50'>{review?.rating.toFixed(1)}</p>
                            <ReactStars 
                                count={5}
                                value={review.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                            />
                        </div>   
                        </div>         
                        </SwiperSlide>
                    }) 
                }
            </Swiper>
        }
        
    </div>
  )
}

export default RatingsAndReviews