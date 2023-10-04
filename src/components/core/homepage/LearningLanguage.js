import React from 'react'
import HighlightedText from './HighlightedText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import {FaArrowRight} from "react-icons/fa"
import CTAButton from './CTAButton'
function LearningLanguage() {
  return (
    <div className='w-11/12 flex flex-col gap-12 px-[90px] mx-auto items-center   py-[120px]'>
        <div className='flex flex-col gap-3'>
            <div className=''>
                <div className='flex flex-row gap-4 items-center'>
                    <p className='font-inter text-[36px] font-[600] leading-[44px]'>Your swiss knife for</p>
                  <div>
                    <HighlightedText text={"learning any language"}/>
                  </div>
                </div>
                <p className='font-inter font-[500] leading-[24px] mt-4 text-[18px] '>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, 
                progress tracking, custom schedule and more.</p>
            </div>
        </div>
        <div className='w-[1102px] h-[468px] relative  flex flex-row '>
            <div>
            <img src={Know_your_progress} className='absolute h-[350px]  w-[341px]  left-[88px]'></img>
            </div>
            <div>
            <img src={Compare_with_others} className='absolute h-[408px] w-[341px] top-[65px] left-[358px]'></img>
            </div>
            <div>
            <img src={Plan_your_lessons} className='absolute h-[346px]  w-[341px] top-[15.34px] left-[600px]'></img>
            </div>

            
        </div>
        <CTAButton active={true} linkto={"/signup"} >
            <div className='flex flex-row items-center gap-1'>
                Learn More
                <FaArrowRight/>
            </div>
        </CTAButton>
      
    </div>
  )
}

export default LearningLanguage