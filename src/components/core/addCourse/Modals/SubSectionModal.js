import { toast } from 'react-hot-toast'
import React from 'react'
import { useEffect } from 'react'
import {useForm} from "react-hook-form"
import Upload from '../Uploads'
import FileInputExample from './VideoUpload'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { createsubSection , updateSubSection} from '../../../../services/operations/CourseApi'
import { setCourse } from '../../../../slices/courseSlice'
import {AiFillCloseSquare} from "react-icons/ai"
function SubSectionModal({modalData , setModalData , add=false , view = false , edit = false }) {
    const {register , handleSubmit , getValues , setValue , formState : {errors} } = useForm()
    const {token} = useSelector((state)=>state.auth)
    const {course} = useSelector((state)=>state.course)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(view || edit){
            setValue("title",modalData.title)
            setValue("description" , modalData.description)
            setValue("video" , modalData.videoUrl)
        }
    },[])
    const isformUpdated = ()=>{
        const currentValue = getValues()
        if(currentValue.description !== modalData.description || currentValue.video !== modalData.videoUrl || currentValue.title !== modalData.title){
            return true
        }
        else{
            return false
        }
    }
    const handleEditSubSection = async (data)=>{
        // const currentValues = getValues()
        
        // if(currentValues.description !== data.description){
        //     const description = data.description 
        // }
        // if(currentValues.video !== data.video){
        //     const video  = data.video
        // }
        // if(currentValues.title !== data.title)
        // {
        //     const title = data.title
        // }
        const formData = {
            "subSectionId" : modalData.subSectionId,
            "sectionId" : modalData.sectionId,
            "description" : data.description,
            "video" : data.video,
            "title" : data.title
        }
        console.log("formdata" , formData)
        // call for api and set course
        const response = await updateSubSection(formData , token )
        if(response){
           const updatedCourseContent =  course?.courseContent?.map((section)=>section._id === modalData.sectionId ? response : section)
           const updatedCourse = {...course , courseContent : updatedCourseContent}
           dispatch(setCourse(updatedCourse))
           console.log("course after updation" , course)
        }  
        // setModal Data null
        setModalData(null)
    }
    const onSubmit = async(data)=>{
        if(view){
            return
        }
        if(edit){
            if(!isformUpdated){
                toast.error("No changes so far...")
            }
            else{
                // handleditsubsection
              await handleEditSubSection(data)
            }
            return;
        }
        const formdata = {
            "description" : data.description,
            "video" : data.video,
            "sectionId" : modalData,
            "courseId" : course._id,
            "title" : data.title
        }
        console.log("formdata : " , formdata)
        
        // create api and call 
        const response = await createsubSection(formdata , token , dispatch)
        console.log("course after creating section...." , course)
        setModalData(null)
        // /setcourse response
        // setMODalData : null
    }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm ">
        <div  className='w-[665px] flex flex-col gap-[16px] items-start  justify-between'>
            <div className='flex flex-row w-full text-richblack-50 justify-between items-start '>
                <p className='text-3xl text-white leading-[32px] text-[600]'>{view && "Viewing "} {edit && "Edit"} {add && "Add"}</p>
                <button className=' text-xl  ' onClick={()=>setModalData(null)}><AiFillCloseSquare/></button>
            </div>
            <div  className='flex flex-col gap-[16px] items-start justify-between' >
                <div className='w-full'>
                    <Upload name={"video"} label={"Lecture Video"} register={register} setValue={setValue} errors={errors} video={true}  viewData={view ? modalData.videoUrl : null} editData={edit ? modalData.videoUrl : null}/>
                 
                </div>
                <div className='flex flex-col gap-2 w-[100%]'>
                    <label className='text-[400] leading-[22px] w-full text-[14px] text-richblack-50 '  htmlFor='title'>Title <sup className='text-pink-300 '>*</sup></label>
                    <input className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-50 bg-richblack-700  formshadow rounded-md ' type='text' {...register("title",{required : true})} placeholder='Enter Lecture Title' name='title'></input>
                    <p className="ml-2 text-xs tracking-wide text-pink-200">
                    {
                        errors.title && (<span>Required Field</span>)
                    }
                </p>
                </div>
                <div  className='flex flex-col gap-2 w-[100%]' >
                    <label  className='text-[400] leading-[22px] w-full text-[14px] text-richblack-50 ' htmlFor='description'>Description <sup className='text-pink-300 '>*</sup></label>
                    <textarea className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-50 bg-richblack-700  formshadow rounded-md '  name='description' {...register("description",{required : true}) } placeholder='Enter Lecture Description'></textarea>
                    <p className="ml-2 text-xs tracking-wide text-pink-200">
                    {
                        errors.description && (<span>Required Field</span>)
                    }
                    </p>
                </div>
                <button onClick={handleSubmit(onSubmit)} type='submit'>
                    {
                        !view && (
                            <div  className={"text-black bg-yellow-100 p-2 rounded-md text-[16px] text-[600] leading-[24px] " }>
                             {
                                edit ? "Save Changes" : "Save"
                             }
                            </div>
                        )
                    }
                </button>
            </div>
        </div>
    </div>
  )
}

export default SubSectionModal