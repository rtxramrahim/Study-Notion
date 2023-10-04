import React from 'react'

function Section3() {
  return (
    <div className='w-11/12 mx-auto py-[120px] px-[90px]'>
        <div className='flex flex-row items-center justify-between'>
            <div className='w-[40%] flex flex-col items-start gap-3 '>
                <p className='font-[600] text-[36px] leading-[44px] text-yellow-50'>Our Vision</p>
                <p className='text-[16px] leading-[24px] text-richblack-300 '>
                   With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn.
                   Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with
                   engaging content, fostering a dynamic and interactive learning experience.
                </p>
            </div>
            <div className='w-[40%] flex flex-col items-start gap-3 '>
                <p className='text-[36px] font-[600] leading-[44px] text-blue-200'>Our Mission</p>
                <p className='text-[16px] leading-[24px] text-richblack-300 '>
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another.
                    We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Section3