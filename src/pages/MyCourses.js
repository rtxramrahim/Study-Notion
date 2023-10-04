import React from 'react'
import { useState } from 'react'
import { getallCreatedCourse } from '../services/operations/CourseApi'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineDelete , AiOutlineEdit} from "react-icons/ai"
import { deleteCourse } from '../services/operations/CourseApi'
import ConfirmationModal from '../components/core/addCourse/ConfirmationModal'
import { setCourse,setEditCourse } from '../slices/courseSlice'
import { Link, useNavigate } from 'react-router-dom'

function MyCourses() {
  const [courses ,setCourses] = useState(null)
  const {course} = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const {token} = useSelector((state)=>state.auth)
  const {user} = useSelector((state)=>state.profile)
  const dispatch = useDispatch()
  // console.log("user " , user._id)
  const getAllCourses = async()=>{
    const userId = user._id
    const response = await getallCreatedCourse( userId ,token)
    if(response){
      setCourses(response)
    }
  }
 

  const [deleteModal , setDeleteModal ] = useState(null)
  useEffect(()=>{
    getAllCourses()
  },[])
  const handleEditCourse = (course)=>{
      console.log("course " , course)
      dispatch(setCourse(course))
      dispatch(setEditCourse(true))
      console.log("course set for editing , " , course)
      navigate("/dashboard/add-course")
  }
  const handleDeleteCourse = async(userId , courseId , categoryId)=>{
    const formdata = {
     "userId" : userId,
      "courseId" : courseId,
      "categoryId" : categoryId
    }
    const response = await deleteCourse(formdata , token)
    if(response){
      // need to handle this

        const updatedCourse = courses.filter((course) => course._id !== courseId)
        console.log("courses after delettion" , updatedCourse)
        setCourses(updatedCourse)
        setDeleteModal(null)
    }
  }
 
  return (
    <div className='w-11/12' >
          <div className='py-[24px] px-[90px]'>
              <p className=' text-richblack-25 leading-[38px] text-[30px] text-[500] '>My Courses</p>
          </div>
          {
            courses?.length === 0 &&
            <div className='flex flex-col gap-5'>
                <div className='w-[1073px] px-[90px] text-richblack-50 mx-auto text-2xl'>{`No Courses Found :)`}</div>
                <div className='w-[1073px] px-[90px]'>
                <Link to={"/dashboard/add-course"} className="  py-[8px] px-[20px] text-black bg-yellow-100 text-[500] text-[16px] leading-[26px] rounded-md">Create</Link>
                </div>
            </div>
          }
          {
            courses!= null && courses.map((course)=>{
              return (
                <div className='w-[1073px] px-[90px] flex flex-row justify-between gap-4 mb-5 '>
                    <div className='w-[767px] flex flex-row items-center gap-[24px]  justify-between'>
                        <div className='w-[221px] h-[148px]'>
                          <img className='w-[100%] h-[100%] rounded-md object-cover' src={course.thumbnail}></img>
                        </div>
                        <div className='flex flex-col  items-start w-[490px] gap-[12px]'>
                              <p className='text-[600] text-richblack-50 text-[20px] leading-[28px]'>{course.courseName}</p>
                              <p className='text-[400] text-richblack-100 text-[14px] leading-[22px]'>{course.courseDesc}</p>
                              <p className=' bg-richblack-500 text-yellow-50 text-[500] text-[12px] leading-[20px] rounded-md p-2'>{course.status}</p>
                        </div>
                    </div>
                    <div className='w-[204px] flex flex-row  text-richblack-100 text-[500] text-[14px] leading-[22px] items-center justify-between gap-[10px]'>
                        <p className='w-[50%]'>₹{course.price}</p>
                        <div className='w-[50%] flex  flex-row gap-3'>
                            <button onClick={()=>handleEditCourse(course)} ><AiOutlineEdit/></button>
                            <button onClick={()=>{
                                          setDeleteModal({
                                          text1 : "Delete this Course",
                                          text2 : "All the content in this course will be deleted",
                                          btn1Text : "Delete",
                                          btn2Text : "Cancel",
                                          btn1Handler : () => handleDeleteCourse(user._id, course._id , course.category),
                                          btn2Handler : () =>setDeleteModal(null)
                              })
                            }}><AiOutlineDelete/></button>
                        </div>
                    </div>
                </div>
              )
            })
          }
          <div className='text-white' > 
            { deleteModal && <ConfirmationModal modalData={deleteModal} /> }
          </div>
    </div>
  )
}

export default MyCourses
