import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CTAButton from '../homepage/CTAButton'
import SettingsForm from '../settings/SettingsForm'
import PasswordForm from '../settings/PasswordForm'
import { useState } from 'react'
import { updateProfilePhoto } from '../../../services/operations/updateProfileApi'
import { useEffect } from 'react'

function Setting() {
    const {user} = useSelector((state)=>state.profile)
    const fileInputRef = useRef(null)
    const [previewSource , setPreviewSource] = useState(null)
    const [imageFile , setImageFile] = useState(null)
    const [updateprofile , setUpdateProfile] = useState(false)
    const dispatch = useDispatch()
    const {token } = useSelector((state)=>state.auth)
    const handleClick = async()=>{
        if(updateprofile){
            const file = imageFile
            const updatedProfilePhoto = await updateProfilePhoto(file , token , dispatch)
            setUpdateProfile(false)
            return
        }
        fileInputRef.current.click()
    }
    const handleFileChange = (e)=>{
        const file = e.target.files[0]
        if(file){
            console.log("file image " , file)
            setImageFile(file)
            previewfile(file)
         
       }
    }
    const previewfile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setPreviewSource(reader.result)

        }
        setUpdateProfile(true)
    }
    const handleRemovePhoto = ()=>{
        setPreviewSource(null)
        setUpdateProfile(false)
    }
    useEffect(() => {
        if (imageFile) {
          previewfile(imageFile)
        }
      }, [user])
  return (
    <div className='flex flex-col items-center  py-[20px] gap-[14px]'>
        <div className='w-[729px] mx-auto p-[24px] rounded-md bg-richblack-800 flex flex-row items-start gap-[20px] '>
            <img src={previewSource || user?.image}   className='h-[75px] w-[75px] rounded-full object-cover'></img>
            <div className='flex flex-col gap-[12px]'>
                <input type='file' ref={fileInputRef} className='hidden' onChange={handleFileChange} accept="image/png, image/gif, image/jpeg" />
                <p className='font-[500] text-[16px] leading-[24px] text-richblack-25'>Change Profile Picture</p>
                <div className='flex flex-row gap-1'>
                   <div className='w-[96px] h-[36px]'>
                       <button onClick={handleClick} className='bg-yellow-50 text-black py-[6px] px-[18px] rounded-md '>{updateprofile ? "Update" : "Change"}</button>
                       
                   </div>
                  {
                    updateprofile &&  
                    <div className='w-[96px] h-[36px]'>
                        <button onClick={handleRemovePhoto} className='bg-richblack-600  text-richblack-25  py-[6px] px-[18px] rounded-md '>Remove</button>
                   </div>
                  }
                  
                </div>
            </div>
        </div>
        
       
        <div className='w-[729px] mx-auto p-[24px] rounded-md bg-richblack-800 flex flex-col gap-[24px]'>
            <p className='font-[500] text-[18px] leading-[26px] text-richblack-50'>Profile Information</p>
            <div>
                <SettingsForm></SettingsForm>
               
            </div>
        </div>
        
        
        <div className='w-[729px] mx-auto p-[24px] rounded-md bg-richblack-800 flex flex-col gap-[24px]'>
            <p className='font-[500] text-[18px] leading-[26px] text-richblack-50'>Change Password</p>
            <div>
                <PasswordForm></PasswordForm>
               
            </div>
        </div>

    </div>
  )
}

export default Setting