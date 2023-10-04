import React from 'react'
import {Swiper , SwiperSlide} from 'swiper/react'
import CourseCard from './CourseCard'
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import 'swiper/css/bundle'
function CourseSlider({Courses}) {
  return (
    <div className='mx-auto'>
            <Swiper
                    loop={true}
                    spaceBetween={10}
                    pagination={false}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper"
                    autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:3,}
                    }}
                    >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide  key={index}>
                                <CourseCard course={course}/>
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
    </div>
  )
}

export default CourseSlider