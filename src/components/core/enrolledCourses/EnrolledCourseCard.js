import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import { useSelector } from 'react-redux'
import { getCourseProgress } from '../../../services/operations/courseProgressAPI'


function EnrolledCourseCard({course}) {
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)
    const [totalLectures , setTotalLectures] = useState(null)
    const [progress , setProgress] = useState(null)
    const handleCourseProgress = async()=>{
      const result = await getCourseProgress( course._id , token)
      if(result?.length !== 0){
        let total = 0
        const completedLectures = result.length
      
        for (const section of course?.courseContent) {
          total += section?.subSection?.length
        }
        console.log("total lecture" , total )
        console.log("completed lecture" , completedLectures)
        const progressPrercentrage = completedLectures / total
        setProgress(progressPrercentrage * 100)
        console.log("%" , progressPrercentrage)
    }
   
    
  }
  useEffect(()=>{
    handleCourseProgress()
  },[])
  return (
    <Link to={`/dashboard/mycourses/${course?.courseName.split(" ").join("-").toString()}/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`} className='text-white'>
        <div>
            <div  className=' flex flex-row gap-[24px]  justify-between'>
                <div><img  className='w-[52px] h-[52px] rounded-md object-cover ' src={course?.thumbnail}></img></div>
                <div className='flex flex-col w-[487px]'>
                   
                     <p className='text-[500] text-[16px] leading-[24px] text-richblack-5'>{course?.courseName}</p>
                        <p className='text-[400] text-[14px] leading-[24px] text-richblack-400 ' >
                        {
                            
                          course.courseDesc.length > 50
                            ? `${course.courseDesc.slice(0, 50)}...`
                            : course.courseDesc
                        }
                        </p>
                </div>
                <div>
                <p className='text-[600] text-[12px] leading-[20px] text-richblack-400'>Progress : {progress|| 0}%</p>
                <ProgressBar
                  completed={progress || 0}
                  height="8px"
                  isLabelVisible={false}
                />
                </div>
            </div>
        </div>
    </Link>
  )
}

export default EnrolledCourseCard

                            