import React from 'react'
import CTAButton from '../homepage/CTAButton'
import { useSelector } from 'react-redux'
import { buyCourse } from '../../../services/operations/paymentGateWay'
import { useParams } from 'react-router-dom'
import { addToCart , removeFromCart, resetCart} from '../../../slices/cartSlice'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { getCourseDetails } from '../../../services/operations/CourseApi'
function CourseCartSection({course}) {

  
  const instructions = [
    "step 1 : Create an Account" , "step 2 : Log In" , "step 3 : Search for the Course",
    "step 4 : Enroll in the Course" , "step 5 : Payment (If Required)" , "step 6 : Confirm Enrollment",
    "step 7 : Begin Learning",
  ]
  const {courseId} = useParams()
  const {user} = useSelector((state)=>state.profile)
  const [addItemToCart , setaddItemToCart ] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token} = useSelector((state)=>state.auth)
  

  const handleaddtoCart = async()=>{
  if(token===null){
    navigate("/login")
  }  
  else{
    const response = await getCourseDetails(courseId)
    if(addItemToCart!=null){
        dispatch(removeFromCart(response))
        setaddItemToCart(null)
        return    
      }
    dispatch(addToCart(response))
    setaddItemToCart(response)
  }
  }
  
  
 const  handlebuyCourse = async()=>{
    if(token===null){
      navigate("/login")
    }
    else{
      const response = await getCourseDetails(courseId)
      dispatch(addToCart(response))
      navigate("/dashboard/cart/buy")
    }
  }

  
  return (
    <div className='w-[384px] bg-richblack-800 rounded-lg  absolute'>
       <div className='w-[100%]'>
          <img className='rounded-md' src={course?.thumbnail}></img>
        </div>
       <div className='flex flex-col gap-[16px] mt-3 p-[24px] '>
           <p className='text-richblack-5 text-[700] text-[30px] leading-[38px]'>₹{course?.price}</p>
            <div className='w-fill gap-[12px] flex flex-col'>
                <div onClick={()=>handleaddtoCart()}>
                  <button className='text-white'>{addItemToCart==null ? "Add  to Cart" : "Remove from Cart"}</button>
                </div>
                <div onClick={()=>handlebuyCourse()}>
                  <CTAButton active={true} children={"Buy now"}/>
                </div>
                <p className='text-[400] text-[14px] leading-[22px] text-center text-richblack-25 '>30 Day-Money-Back-Guarantee</p>
            </div>
            
            <p className='text-[500] text-[16px] leading-[24px] text-richblack-50 capitalize '>Steps to enroll in course :</p>
            {
            instructions?.map((instruction , index)=>{
              return <li key={index} className='text-[500] text-[14px] leading-[22px] text-[#06D6A0] capitalize '>{instruction}</li>
            })
            }
          </div>
    </div>
  )
}

export default CourseCartSection