import React, { useState } from 'react'

import { apiConnector } from '../../../services/ApiConnector'
import { useSelector } from 'react-redux'
import { stats } from '../../../services/apis'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import InstructorChart from '../instructorDashboard/InstructorChart'
function MainDashboard() {
  const [loading , setLoading] = useState(false)
  const {token} = useSelector((state)=>state.auth)
  const [instructorData , setInstructorData ] = useState(null)
  const [courses , setCourses] = useState([])
  const {user} = useSelector((state)=>state.profile)
  const hanldeInstructorData = async ()=>{
   try{
    setLoading(true)
    const response = await apiConnector("GET" , stats.getInstructorStats ,null ,{
      Authorisation :  `Bearer ${token}`
    })
    if(!response.data.success){
      console.log("error occured in fetching data " , response.data)
      return
    }
    else{
      const dataforStats = response?.data?.stats
      const dataforUser = response?.data?.user
      const courseDetails = response?.data?.courses
      setInstructorData(dataforStats)
      setCourses(courseDetails)
      setLoading(false)
    }
   }catch(err){
    console.log("error" , err)
   }
  
  }
  const totalAmount = instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated , 0);
  const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudents , 0 )
  useEffect(()=>{
    hanldeInstructorData()
   },[])
  return (
    <div className='w-11/12 flex flex-col gap-[24px] px-[90px] py-[24px] text-white'>
        <div className='w-[100%] text-[500] text-[30px] leading-[38px] '>
          <p className='capitalize '>Hi👋! {user?.firstname}</p>
          <p>Let's Start Something New</p>
        </div>
        {
          loading ? <p>Spinner</p> : 
          <div className='flex flex-row w-[100%] justify-between gap-6  '>
          {/* flex row upper div */}
            <div className='w-[70%]'>
            <InstructorChart courses={instructorData}></InstructorChart>
            </div>
            <div className='w-[30%] flex flex-col h-[300px] p-3 bg-richblack-800 rounded-md  gap-2 '>
              <p className={`text-[600] text-[18px] leading-[26px] mb-3 text-richblack-25 `}>Statistics</p>
              <div className={`text-[600] text-[18px] leading-[26px] mb-3 text-richblack-25 `}>
                <p>Total Courses</p>
                <p>{courses?.length}</p>
              </div>
              <div className={`text-[600] text-[18px] leading-[26px] mb-3 text-richblack-25 `}>
                <p>Total Students</p>
                <p>{totalStudents}</p>
              </div>
              <div className={`text-[600] text-[18px] leading-[26px] mb-3 text-richblack-25 `}>
                <p>Total Amount</p>
                <p>₹{totalAmount}</p>
              </div>
            </div>
          </div>
        }
        {/* flex col */}
        <div className='bg-richblack-800 rounded-md w-[100%]  p-2'>

          <div className='flex flex-row justify-between p-2' > 
            <p className={`text-[600] text-[18px] leading-[26px] mb-3 text-richblack-50 `}>Your Courses</p>
            <Link className={`text-[600] text-[18px] leading-[26px] mb-3 text-richblack-50 `} to={"/dashboard/my-courses"}>View All</Link>
          </div>
          <div className='flex flex-row justify-between w-[100%] '>
          {
           !courses?.length==0 ? courses?.slice(0,3)?.map((course , index)=>{
              return <div>
               <div className='w-[250px]  rounded-md flex flex-col gap-[20px] items-start p-2 ' >
                  <img width={250}  className='rounded-md' src={course?.thumbnail}/>
                    <p className='text-[500] text-[16px] leading-[24px] text-richblack-25'>{course?.courseName}</p>

                    {/* <p className='text-[400] text-[16px] leading-[24px] text-richblack-200'>{course?.courseDesc}</p> */}
                    <div className='text-[400] text-[16px] leading-[24px] text-[#838894] flex flex-col gap-x-4'>

                        <div>
                          <p>Total Students {course?.studentEnrolled?.length}</p>
                        
                        </div>
                  
                        <div>
                          <p>Price {course?.price}</p>
                          <p></p>
                        </div>
                    </div>
               </div>
              </div>
            } ) : 
            <div>
              <p>You have not created any course</p>
              <Link to={"/dashboard/add-course"}>Create Course</Link>
            </div>
          }
          </div> 
        </div>
    </div>
  )
}

export default MainDashboard