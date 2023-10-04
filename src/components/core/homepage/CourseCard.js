import React from 'react'

function CourseCard({props , currentCard , setCurrentCard}) {
   const courseHeading = props.heading
   const courseDesc = props.description
   const courseLevel = props.level
   const courseLessons = props.lessionNumber
   const CurrentCard = ()=>{
    setCurrentCard(courseHeading)
   }
  return (
    <div onClick={()=>{ CurrentCard() }} className={`flex ${currentCard===courseHeading ? "bg-white shadowYellow" : "bg-richblack-700"} flex-col items-start gap-2 transition-all dueation-100  `}>
        <div className='pt-[32px] pb-[52px]  px-[24px]'>
            <div className={`font-inter leading-[28px] ${currentCard===courseHeading ? "text-richblack-800" : "text-richblack-200"} text-[20px] font-[600]`}>{courseHeading}</div>
            <div className={`font-inter mt-4 leading-[24px]  ${currentCard===courseHeading ? "text-richblack-500" : "text-richblack-200"} text-[16px] font-[400] `}>{courseDesc}</div>
       
        </div>
        <div className={`py-[16px] px-[24px] ${currentCard===courseHeading ? "text-blue-400 border-dashed border-t-2  border-richblack-200" : "text-richblack-200 border-dashed border-t-2  border-richblack-500"} flex flex-row justify-between w-[100%]`}>
            <div className='text-[500] font-semibold leading-[24px]  font-inter text-[16px]'>
                {courseLevel}
            </div>
            <div className='text-[500] font-semibold leading-[24px]  font-inter text-[16px]'>
                {courseLessons} Lessons
            </div>
        </div>
    </div>
  )
}

export default CourseCard