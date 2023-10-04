import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { getCourseProgress } from '../../../services/operations/courseProgressAPI'
function VideoDetailSideBar({setModal}) {
  const {courseSectionData , courseEntireData , completedLectures , totalNoOfLectures , } = useSelector((state)=>state.viewCourse)
  const [activeStatus , setSectiontActiveStatus] = useState(null)
  const [videoStatus , setVideoStatus] = useState(null)
  const {courseId , sectionId , subSectionId} = useParams()
  const [marksAsCompleted , setMarkAsCompleted] = useState(false)
  const {token} = useSelector((state)=>state.auth)
  const location = useLocation()
  const navigate = useNavigate()
 
  const handleCourseProgress = async()=>{
    const result = await getCourseProgress(courseId , token)
    if(result?.length !== 0){
      if(result?.includes(subSectionId)){
        setMarkAsCompleted(true)
      }
    }
}
  const setActiveStatus = ()=>{ 
      if(courseSectionData?.length == 0)
      return 
      const courseSectionIndex = courseSectionData?.findIndex((section)=>section._id === sectionId)
      const courseSectionId = courseSectionData?.[courseSectionIndex]?._id
      setSectiontActiveStatus(courseSectionId)
      const coursesubSectionIndex = courseSectionData?.[courseSectionIndex]?.subSection?.findIndex((subSection)=>subSection._id === subSectionId)
      const coursesubSectionId = courseSectionData?.[courseSectionIndex]?.subSection?.[coursesubSectionIndex]?._id
      setVideoStatus(coursesubSectionId)
      
  }
  
  useEffect(()=>{
    setActiveStatus()
    handleCourseProgress()
  },[courseSectionData , courseEntireData , location.pathname ])
  return (
    <div className='text-white   w-[300px] bg-richblack-800   gap-[10px] flex flex-col items-start'>
     
        <div className='flex flex-col w-[100%] px-[30px]  mt-5 gap-1'>
          <div className='flex flex-row justify-between mb-3 items-center '>
              <button className='text-[600] text-[16px] leading-[24px] text-richblack-25 ' onClick={()=>navigate("/dashboard/enrolled-courses")}> Back</button>
              <button className='text-[600] text-[16px] leading-[24px] p-1 rounded-md bg-yellow-100 text-black' onClick={()=>setModal(true)}>Add Review</button>
          </div>
          <div>
            <p  className='text-[700] text-[18px] leading-[26px] text-richblack-25 ' >{courseEntireData?.courseName}</p>
            <p  className='text-[600] text-[14px] leading-[22px] text-richblack-200 ' >{completedLectures?.length} / {totalNoOfLectures}</p>
          </div>

        </div>
   
      <div className='w-[100%]'>
          {
            courseSectionData?.map((section , index)=>{
              return <div className='w-[100%]' key={index}>
                <p className='w-[100%] px-[30px] py-[8px] studentSideBarBorder  bg-richblack-700 text-[500] text-[14px] leading-[24px] text-richblack-5 studentSideBarSectionBorder ' onClick={()=>setSectiontActiveStatus(section?._id)}>{section.sectionName}</p>
       
                {
                  activeStatus === section?._id && 
                  <div className='w-[100%] flex flex-col gap-2'>
                      {
                        section?.subSection?.map((subSection , index)=>{
                          return <div className={`w-[100%] flex flex-row gap-5 ${videoStatus === subSection?._id ? "bg-yellow-700 text-yellow-50 profilebtnborder" : "bg-opacity-0 text-richblack-100"} px-[30px] py-[8px] text-[500] text-[14px] leading-[24px]`} key={index}>
                            <input type='checkbox' checked={completedLectures?.includes(subSection._id)}/>
                            <p className={``} onClick={()=>
                                {
                                  setVideoStatus(subSection?._id)
                                  navigate(`/dashboard/mycourses/${courseEntireData.courseName}/${courseId}/section/${section._id}/sub-section/${subSection._id}`)
                                }}>
                                {subSection?.title}
                            </p>
                          </div>
                        })
                      }
                  </div>
                }

              </div>
            })
          }
      </div>  
    </div>
  )
}

export default VideoDetailSideBar