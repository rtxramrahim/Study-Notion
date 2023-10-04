import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../services/operations/CourseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { removeFromCart, resetCart } from '../slices/cartSlice'
import CourseAddedInCart from '../components/core/cart/CourseAddedInCart'
import { buyCourse } from '../services/operations/paymentGateWay'
import { useNavigate } from 'react-router-dom'
function CartPage() {
  const {cart , total, totalItems} = useSelector((state)=>state.cart)
  const {user} = useSelector((state)=>state.profile)
  const {token} = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const [courses , setCourses] = useState(null)
  const [courseId , setCourseId] = useState(null)
  const [avgReview , setAvgReview] = useState(0)
  const dispatch = useDispatch()
 
  const handleBuyCourse = async()=>{
      if(courses?.length > 0 ){
        let courseArray = []
        for(const course of courses){
          courseArray.push(course._id)
        }
      
        if(token){
          const response = await buyCourse(courseArray , token , user , navigate , dispatch)
        }
       
      }
      else{
        toast.error("No Course To Buy !")
      }
  }
  const handleCartChanges = ()=>{
    setCourses(cart)
  }
  useEffect(()=>{
    handleCartChanges()
  },[cart])
  
  
  return (
    <div className='text-white w-11/12  px-[90px] py-[24px] '>
      <div className='w-[1073px] flex flex-col gap-[12px]'>
        <p className='text-[400] text-[14px] leading-[22px] text-richblack-300 '>Home / Dashbboard / <span className='text-yellow-50'>Cart</span></p>
        <p className='text-[500] text-[30px] leading-[38px] text-richblack-5'>My Cart</p>
      </div>
      <div>
        <p className='text-[600] text-[16px] leading-[24px] text-richblack-400'>{courses?.length} Courses in Cart</p>
      </div>
      <div className='flex flex-row justify-between items-center'>
          <div className='py-[24px] flex flex-col gap-[33px] items-start w-[792px]'>
            
            {
              courses?.length > 0  &&  courses?.map((course , index)=>{
                return (
                  <div key={index}>
                    <CourseAddedInCart course={course} index={index}  setCourses={setCourses} />
                  </div>
                )
              })
            }
            {
              courses?.length == 0 && <span className='text-2xl text-center'>Your Cart Is Empty !</span>
            }
          </div>
          
      </div>
      <div className=' p-[24px] rounded-xl gap-[16px] border-richblack-400 bg-richblack-700 w-[50%] flex flex-col items-start'>
              <p className='text-[600] text-[14px] leading-[22px] text-richblack-300'>Total Items {totalItems} </p>
              <p className='text-[600] text-[14px] leading-[22px] text-richblack-300 '>Total :</p>
              <p className='text-[600] text-[24px] leading-[32px] text-yellow-100'>₹{total}</p>
              <p className='text-[600] text-[14px] leading-[22px] text-richblack-300 line-through'>₹{ total==0 ? 0 : total + 499}</p>
              <button onClick={()=>handleBuyCourse()} className='bg-yellow-100 p-3 text-black rounded-lg'>Buy Now</button>
      </div>
    </div>
  )
}

export default CartPage

