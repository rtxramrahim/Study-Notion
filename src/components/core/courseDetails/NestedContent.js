import React from 'react'

function NestedContent({courseContent}) {
  return (
    <details className='w-[729px] '>
        <summary className='flex flex-row rounded-md w-[100%] bg-richblack-600 justify-between py-[16px] px-[32px] '>
            <p className='text-[500] text-[14px] leading-[22px] text-richblack-5  '>{courseContent?.sectionName}</p>
            <div>
                <p className='text-[500] text-[14px] leading-[22px] text-yellow-100'>{courseContent?.subSection?.length} {courseContent?.subSection?.length > 1 ? "lectures" : "lecture"} </p>
            </div>
        </summary>
        <div className='py-[16px] px-[32px] flex flex-col gap-[12px]'>
            {
                courseContent?.subSection?.length > 0 && courseContent?.subSection?.map((lecture , index)=>{
                    return <div key={index} className='flex flex-row justify-evenly items-start'>
                                <div className='flex flex-col w-[677px] gap-[14px]'>
                                    <p className='text-[500] text-[14px] leading-[14px] text-richblack-5'>{lecture.title}</p>
                                    <p className='text-[500] text-[14px] leading-[14px] text-richblack-50'>{lecture.description}</p>
                                </div>
                                <p className='text-[400] text-[14px] leading-[22px] text-richblack-25 '>{Math.floor(lecture.duration)}:00</p>
                               
                           </div>
                })
            }
        </div>
    </details>
  )
}

export default NestedContent