import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from "../../../common/IconBtn"
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import { toast } from 'react-hot-toast'
import NestedView from '../NestedView'
import { createSection , updateSection } from '../../../../services/operations/CourseApi'
import {IoAddCircle} from "react-icons/io5"
import {GrAddCircle} from "react-icons/gr"


function SectionAddingForm() {
    const {register , handleSubmit , setValue, getValues , formState : {errors}} = useForm()
    const dispatch =  useDispatch()
    const [editSectionName,setEditSectionName] = useState(false)
    const cancelEdit = ()=>{
        setEditSectionName(false)
        setValue("sectionName","")
    }
    const {token} = useSelector((state)=>state.auth)
    const {course,editCourse} = useSelector((state)=>state.course)
    
    const goBack = ()=>{
        dispatch(setEditCourse(true))
        dispatch(setStep(1))
        console.log("edit course activated")
    }
    const goToNext = ()=>{
        if(course?.courseContent.length === 0){
            toast.error("Please add atleast one Section to proceed")
            return
        }
        if(course?.courseContent.some((section)=>section.subSection.length === 0)){
            toast.error("Please add atleast one lecture to proceed")
            return
        }
        dispatch(setStep(3))
        console.log("ek or bhasad")
    }
    const onSubmit = async (data)=>{
        if(editSectionName){
            const formdata = {
                sectionId : editSectionName,
                sectionName : data.sectionName,
                courseId : course._id
            }
            console.log("course before update section" , course)
            // make a call to update section api
            // console.log("formdata from udpata section : " , formdata)
            const result = await updateSection( formdata , token , dispatch )
            dispatch(setCourse(result))
            console.log("course after updating section :" , course)
    }       
        else{
          
            // make a call to create section api
            const formData = {
                sectionName : data.sectionName,
                courseId : course?._id
            }
            console.log("formdata : " , formData)
            const response = await createSection(formData , token , dispatch)
        }
        setEditSectionName(null)
        setValue("sectionName" , "")
    }
    const handleChangeEditSection = (sectionId , sectionName)=>{
        if(editSectionName === sectionId){
            cancelEdit()
            return
        }
        setEditSectionName(sectionId)
        setValue("sectionName",sectionName)
    }

  return (
    <div className='w-[665px] flex flex-col items-start gap-4 '>  
        <p className='text-white text-2xl'>Course Builder</p>
        <form className='w-11/12 p-[24px] flex flex-col items-start gap-3 border border-richblack-500 bg-richblack-800' onSubmit={handleSubmit(onSubmit)}>


           <div className='w-[100%]'>
                    <div className='flex flex-col gap-2 w-[100%]  '>
                            <label className='text-[400] leading-[22px] w-full text-[14px] text-richblack-50 ' htmlFor='sectionName'>Section Name</label>
                            <input  className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-100 bg-richblack-700  formshadow rounded-md ' name='sectionName' placeholder='Add Section To Build Your Course' {...register("sectionName",{required : true})}></input>
                            <p className="ml-2 text-xs tracking-wide text-pink-200">
                                {
                                    errors.sectionName && (<span>Required Field</span>)
                                }
                            </p>
                        </div>
                        <div className={"flex flex-row items-center justify-between bg-richblack-900 text-yellow-50 font-bold border border-yellow-900 w-[20%]  rounded-md"}>
                        
                            <button className='mx-auto'>
                                <IconBtn 
                                    type='submit'
                                    text={editSectionName ? "Edit Section" : "Create"}
                                    // onClick={handleSubmit()}
                                    
                                />
                            </button>
                        
                        </div>
                    </div>
            <div className='text-white w-11/12'>
                    {  course ?.courseContent?.length > 0 && (
                        <NestedView handleChangeEditSection={handleChangeEditSection}/>
                    )}
                    
            </div>
        </form>
        {/* {editSectionName && <button type='button' onClick={()=>cancelEdit}>Cancel Edit</button>} */}
        <div className='flex flex-row gap-5 items-center'>
            <button className='text-richblack-100 text-[600] text-[16px] leading-[24px] ' onClick={goBack}>Back</button>
            <button className='bg-yellow-50 rounded-md text-[500] text-[16px] leading-[24px] py-[8px] px-[20px] text-black hover:scale-105 transition-all duration-200' onClick={goToNext}>Next</button>       
           
        </div>
    </div>
  )
}

export default SectionAddingForm