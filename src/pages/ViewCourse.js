import React, { useEffect } from 'react'
import VideoDetailSideBar from '../components/core/viewLecture/VideoDetailSideBar'
import { Outlet, useParams } from 'react-router-dom'
import ReviewModal from '../components/core/viewLecture/ReviewModal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../services/operations/CourseApi'
import { setCourseSectionData ,setEntireCourseData , setCompletedLectures , setTotalNoOfLectures } from '../slices/viewCourseSlice'
function ViewCourse() {
    const [modal , setModal] = useState(null)
    const {courseId} = useParams()
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const {courseSectionData ,courseEntireData , completedLectures , totalNoOfLectures } = useSelector((state)=>state.viewCourse)
    const setCourseSpecificDetails = async()=>{
        const response = await getCourseDetails(courseId)

        // console.log("response from view course api " , response)
        dispatch(setCourseSectionData(response?.courseContent))
        // console.log("courseSectionData" , courseSectionData )
        dispatch(setEntireCourseData(response))
        dispatch(setCompletedLectures(response?.courseProgress))
        let lecture = 0
        response?.courseContent?.forEach(section => {
            lecture += section?.subSection?.length
        });
        dispatch(setTotalNoOfLectures(lecture))
    }
    useEffect(()=>{
        setCourseSpecificDetails()
    },[])
  return (
    <div className='text-white'>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]"   >
           
                <VideoDetailSideBar setModal={setModal} />
           
            <div className='mx-auto w-[75%]' >
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
        {
            modal && <ReviewModal setModal={setModal}/>
        }
    </div>
  )
}
export default ViewCourse