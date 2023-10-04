import React, { useEffect } from 'react'
import IconBtn from './IconBtn'
import { useDispatch } from 'react-redux'
import { setToken } from '../../slices/AuthSlice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../slices/ProfileSlice'
function ConfirmationModal({modalData}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = ()=>{
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("logged out successfully")
    navigate("/")
  }
 
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm ">
        <div className='flex flex-col bg-richblack-800 p-3 rounded-md gap-2 items-start '>
            <p className='text-[600] leading-[38px] text-richblack-50 text-[30px]'>{modalData.text1}</p>
            <p className='text-[400] leading-[26px] text-richblack-100 text-[18px]'>{modalData.text2}</p>
            <div className='flex felx-row items-center justify-between gap-3'>
                <div className='text-[500] text-[16px] leading-[24px] text-black px-2 rounded-md py-1 bg-yellow-50 ' onClick={()=>logout()}>
                  <IconBtn  text={modalData.btn1Text}></IconBtn>
                </div>
                <button className='text-[500] text-[16px] leading-[24px] text-richblack-25  px-2 rounded-md py-1 bg-richblack-600 ' onClick={modalData.btn2Handler}>{modalData.btn2Text}</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal