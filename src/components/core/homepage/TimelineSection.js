import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImageInage from "../../../assets/Images/TimelineImage.png"
function TimelineSection() {
    const timeline = [{
        logo : logo1,
        heading : "Leadership",
        desc : "Fully committed to the success company"
    },
    {
        logo : logo2,
        heading : "Responsibility",
        desc : "Students will always be our top priority"
    },
    {
        logo : logo3,
        heading : "Flexibility",
        desc : "The ability to switch is an important skills"
    },
    {
        logo : logo4,
        heading : "Solve The Problem",
        desc : "Code your way to a solution"
    },
    
    ]
  return (
    <div className=' px-[90px] py-[120px]'>
        <div className='flex flex-row gap-10 justify-between items-center'>
            <div className='w-[45%] flex flex-col items-start gap-11'>
                    {
                        timeline.map((element,index)=>{
                            return(
                                <div className='flex flex-row gap-2 items-end justify-between mb-4' key={index}>
                                    <div className='bg-white w-[50px] h-[50px]'>
                                        <img src={element.logo}></img>
                                    </div>
                                    <div className=''>
                                        <p className='text-[18px] font-semibold'>{element.heading}</p>
                                        <p className='text-base font-inter'>{element.desc}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
            <div className='relative  '>
                <img src={TimelineImageInage} loading='lazy' className='object-cover rounded-lg timelineGradient timelineshadow w-[714px] h-[545px]'></img>
                <div className='absolute bg-caribbeangreen-700 left-[5%] -translate-y-[50%]  rounded-md flex flex-row justify-evenly   text-white uppercase py-10 gap-[52px] w-[511px] h-[128px]'>
                    <div className='flex flex-row gap-[24px]'>
                        <h2 className='font-inter text-[36px] leading-[44px] font-[700] text-center'>10</h2>
                        <p className='font-inter text-[#05A77B] text-[14px]  leading-[22px] font-[500]'>Years <br/>Experiences</p>
                    </div>
                    <div className='border border-[#05A77B] '></div>
                    <div className='flex flex-row gap-[24px]'>
                        <h2  className='font-inter text-[36px] leading-[44px] font-[700]  text-center'>250</h2>
                        <p className='font-inter text-[14px] text-[#05a791] leading-[22px] font-[500]'>Types of <br/>Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection