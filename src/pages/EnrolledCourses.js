import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getEnrolledCourse } from '../services/operations/profileApi'
import EnrolledCourseCard from '../components/core/enrolledCourses/EnrolledCourseCard';
import { useState } from 'react';
function EnrolledCourses() {
  const {token } = useSelector((state)=>state.auth)

  const [courses , setCourses] = useState(null)
  const getEnrolledCourses = async() => {
    try{
        const response = await getEnrolledCourse(token);
        setCourses(response);
    }
    catch(error) {
        console.log("Unable to Fetch Enrolled Courses : ",error);
    }
}

useEffect(()=> {
    getEnrolledCourses();
},[]);

  return (
    <div className='text-white w-11/12 px-[90px] py-[24px] flex flex-col gap-[24px]'>
      <div className='flex flex-col gap-3 '>

        <div className='text-4xl bg-richblack-700 text-white p-3 rounded-md'>EnrolledCourses</div>
        <div>
          <p className='text-[500] text-[14px] leading-[24px] text-richblack-300'>Dashboad / <span className='text-yellow-100 '>Enrolled-Course</span></p>
        </div>
      </div>
      {/* <div className='bg-richblack-800  flex gap-[5px] p-[4px] w-[295px] justify-evenly rounded-md text-[16px] leading-[24px] text-center text-richblack-200 items-center '>
        <p>All</p>
        <p>Pending</p>
        <p>Completed</p>
      </div> */}
      <div>
      {
        courses?.length == 0 && <div className='w-11/12 text-richblack-100 text-2xl'>{`Empty :)`}</div>
      }
        {
          courses?.length > 0 && 
          <div className='w-11/12'>
            <div className='flex flex-col gap-[22px]'>
              {/* <tr className='w-[100%] p-[16px] flex flex-row  text-[500] text-[14px] leading-[22px] text-richblack-50'>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Progress</th>
              </tr> */}
              {
                courses?.map((course , index)=>{
                  return <div key={index}><EnrolledCourseCard course={course} /></div>
                })
              }
            </div>
          </div>
        }
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default EnrolledCourses