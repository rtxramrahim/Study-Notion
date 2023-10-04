import React from 'react'
import foundingStoryImg from "../../../assets/Images/FoundingStory.png"
function Section2() {
  return (
    <div className='w-11/12 mx-auto py-[120px] px-[90px] flex flex-row items-center justify-between'>
        <div className='w-[50%]'>
            <div className='flex flex-col items-start gap-4'>
            <div className='text-pink-300 font-[600] text-[36px]  leading-[44px]'>Our Founding Story</div>
            <div className='text-[16px] leading-[24px] font-[500] text-richblack-300'>
                Our e-learning platform was born out of a shared vision and passion for transforming education.
                It all began with a group of educators, technologists, and lifelong learners who recognized the
                need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </div>
            <div className='text-[16px] leading-[24px] font-[500] text-richblack-300'>
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.
                We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries.
                We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
            </div>
            </div>
        </div>
        <div>
            <img src={foundingStoryImg} className='rounded-md'></img>
        </div>
    </div>
  )
}

export default Section2