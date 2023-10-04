import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'
import { setcourseProgress } from '../../../services/operations/courseProgressAPI'
import { Player } from 'video-react'

function ViewCourseDetails() {
  const {courseSectionData,courseEntireData,completedLectures} = useSelector((state)=>state.viewCourse)
  const {courseId ,sectionId , subSectionId } = useParams()
  const location = useLocation()
  const videoRef = useRef()
  const [isVideoEnded , setIsVideoEnded] = useState()
  const [videoData ,setVideoData ] = useState(false)
  const navigate = useNavigate()
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  // setting up subsectionid to display course
  const hanldeSpecificCourse = ()=>{
    if(!courseSectionData.length)
    return
    if(!courseId || !sectionId || !subSectionId ){
      navigate("/dashboard/enrolled-courses")
    }
    const filterData = courseSectionData?.filter((section)=>section?._id === sectionId)
    const filterVideoData = filterData?.[0]?.subSection?.filter((subSection)=>subSection?._id === subSectionId)
    setVideoData(filterVideoData?.[0])
    setIsVideoEnded(false)
  }
  // play , pause for video
  
  useEffect(()=>{
    hanldeSpecificCourse()
    
  },[courseSectionData,courseEntireData , location.pathname ])
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Add an event listener for the 'ended' event
      const handleVideoEnded = () => {
        setIsVideoEnded(true);
      };

      // Attach the event listener to the video element
      videoElement.addEventListener('ended', handleVideoEnded);

      // Clean up the event listener when the component unmounts
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, []);

  const isFirstVideo = ()=>{
    // when section index and subSection Index are same
    const sectionIndex = courseSectionData?.findIndex((section)=>section?._id === sectionId)
    const subSectionIndex = courseSectionData?.[sectionIndex]?.subSection?.findIndex((subSection)=> subSection?._id === subSectionId)

    if(sectionIndex === 0  &&  subSectionIndex === 0)
      return true
    else{
      return false
    }
  }
  const goToNextVideo = ()=>{
    // find current section and subSection
    const currerntSectionIndex = courseSectionData?.findIndex((section)=>section?._id === sectionId)
    const currentSubSectionIndex = courseSectionData?.[currerntSectionIndex]?.subSection?.findIndex((subSection)=>subSection?._id === subSectionId)

    const totalNoOfVideos = courseSectionData?.[currerntSectionIndex]?.subSection?.length

    if(currentSubSectionIndex !== totalNoOfVideos - 1){
      // move to same section next video
      const nextsubSectionId =  courseSectionData?.[currerntSectionIndex]?.subSection?.[currentSubSectionIndex + 1 ]?._id
      navigate(`/dashboard/mycourses/${courseEntireData?.courseName}/${courseId}/section/${sectionId}/sub-section/${nextsubSectionId}`)
      
    }
    else{
      // move to next section first video
      const nextSectionId = courseSectionData?.[currerntSectionIndex + 1]?._id
      const nextsubSectionId = courseSectionData?.[currerntSectionIndex + 1]?.subSection?.[0]?._id
      console.log( "heeieieie" , nextSectionId , nextsubSectionId)
      navigate(`/dashboard/mycourses/${courseEntireData?.courseName}/${courseId}/section/${nextSectionId}/sub-section/${nextsubSectionId}`)
    }
  }
 
  const goToPrevVideo = ()=>{
    const currerntSectionIndex = courseSectionData?.findIndex((section)=>section?._id === sectionId)
    const currentSubSectionIndex = courseSectionData?.[currerntSectionIndex]?.subSection?.findIndex((subSection)=>subSection?._id === subSectionId)
    if(currentSubSectionIndex !== 0 ){
      // go to same section previous video
      const prevSubSectionId = courseSectionData?.[ currerntSectionIndex ]?.subSection?.[currentSubSectionIndex - 1]._id
      navigate(`/dashboard/mycourses/${courseEntireData?.courseName}/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else{
      // move to prev section last video
      const prevSectionId = courseSectionData?.[currerntSectionIndex - 1]?._id
      const prevSubSectionLength = courseSectionData?.[currerntSectionIndex - 1]?.subSection?.length
      const prevSubSectionId = courseSectionData?.[currerntSectionIndex - 1]?.subSection?.[prevSubSectionLength - 1]._id
      navigate(`/dashboard/mycourses/${courseEntireData?.courseName}/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }

  } 
  const isLastVideo = ()=>{
    const currerntSectionIndex = courseSectionData?.findIndex((section)=>section?._id === sectionId)
    const currentSubSectionIndex = courseSectionData?.[currerntSectionIndex]?.subSection?.findIndex((subSection)=>subSection?._id === subSectionId)

    const totalNoOfVideos = courseSectionData?.[currerntSectionIndex]?.subSection?.length

    if( currerntSectionIndex === courseSectionData?.length - 1  && currentSubSectionIndex === totalNoOfVideos - 1 ){
      return true
    }
    else{
      return false
    }
  }
  const handleMarkAsComplete = async()=>{
    const response = await setcourseProgress(courseId , subSectionId , token)
    if(response){
      dispatch(updateCompletedLectures(subSectionId))
    }
  }
  return (
    <div className='w-11/12 flex flex-col items-start gap-5 px-[24px] py-[90px] '>
      {
        isVideoEnded && 
        <div className='flex flex-row gap-5 items-start'>
            {
              !completedLectures.includes(subSectionId) && 
              <button
              onClick={()=>{
                handleMarkAsComplete()
              }}
              className='blackButton text-yellow-100'>Mark As Complete</button>
            }
           
            {
              (!isFirstVideo()) && <button onClick={()=>goToPrevVideo()} className='blackButton'>Prev</button>
            }
            {
              (!isLastVideo())  && <button onClick={()=>goToNextVideo()} className='blackButton'>Next</button>
            }
        </div>
      }
      <video className='w-[100%] rounded-md' ref={videoRef} src={videoData?.videoUrl} controls={true}>
      
      </video>
      <div>
          <h2 className="mt-4 text-3xl font-semibold text-richblack-50">{courseEntireData?.courseName}</h2>
          <p className="pt-2 pb-6 text-richblack-50">{videoData?.description}</p>
      </div>
    </div>
  )
}

export default ViewCourseDetails









