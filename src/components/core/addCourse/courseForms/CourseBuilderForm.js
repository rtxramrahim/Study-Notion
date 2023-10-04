import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFormState } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../../slices/AuthSlice'
import { categories } from '../../../../services/apis'
import { apiConnector } from '../../../../services/ApiConnector'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {HiCurrencyRupee} from "react-icons/hi"
import RequirementField from '../RequirementField'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import IconBtn from '../../../common/IconBtn'
import { toast } from 'react-hot-toast'
import ChipInput from '../ChipInput'
import Upload from '../Uploads'
import createCourse from '../../../../services/operations/CourseApi'
import { updateCourse } from '../../../../services/operations/CourseApi'
function CourseBuilderForm() {
    const {register , handleSubmit , setValue , getValues , reset ,  formState: { errors }}  = useForm()
    const dispatch = useDispatch()
    const {token} = useSelector((state)=>state.auth)
    const {courseCategory} = useSelector((state)=>state.course)
    const [courseCategories , setCourseCategories] = useState([])
    const {course , editCourse} = useSelector((state)=>state.course)
    // const loading  = useSelector((state)=>state.loading)

    useEffect(()=>{
        const getCategories = async()=>{
            
            const response = await apiConnector("GET" , categories.CATEGORIES_API)
            // console.log("response from category api : " , response?.data?.categories[0]?._id)
            const category = response?.data?.categories
            setCourseCategories(category)
        }
        if(editCourse){
            console.log("course before editing " , course)
            setValue("courseTitle",course.courseName)
            setValue("courseShortDesc",course.courseDesc)
            setValue("coursePrice",course.price)
            setValue("courseCategory",course.category)
            setValue("Tag",course.tag)
            setValue("courseBenefit",course.whatYouWillLearn)
            setValue("courseImage",course.thumbnail)
            setValue("courseRequirement",course.instructions)
        }
        getCategories()
    },[])
    const goToSection = ()=>{
        dispatch(setStep(2))
    }
    // there are 2 cases  , 1 : one in which we have to compare the default data comming from api this is in stringified format (not changed in form   ) 
    // 2 : in which the data is updated and we have to compare default array format with stringified format
    const isformUpdated = ()=>{
        const currentValues = getValues()
        // if (typeof currentValue.Tag == 'string') {
        //     JSON.parse(currentValue.Tag)
        // }
        // if (typeof currentValue.courseRequirement == 'string') {
        //     JSON.parse(currentValue.courseRequirement)
        // }
        // if (typeof course.tag == 'string') {
        //     JSON.parse(currentValue.courseRequirement)
        // }
        // if (typeof course.instructions == 'string') {
        //     JSON.parse(currentValue.courseRequirement)
        // }
        if( currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDesc ||
            currentValues.coursePrice !== course.price ||
            currentValues.Tag.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseRequirements.toString() !==
              course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail){
            // console.log("checking title : " , currentValues.courseTitle !== course.courseName ? "NE" : "E" )
            // console.log("checking desc :" , currentValues.courseShortDesc !== course.courseDesc ? "NE" : "E")
            // console.log("checking Benefit :" , currentValues.courseBenefit !== course.whatYouWillLearn ? "NE" : "E")
            // console.log("checking courseIMage :" , currentValues.courseImage !== course.thumbnail ? "NE" : "E")
            // console.log("checking requiredment :" , currentValues.courseRequirement.toString() !== course.instructions.toString() ? "NE" : "E")
            // console.log("checking tags :  , ", currentValues.Tag.toString() !== course.tag.toString() ? "NE" : "E")
           
            return true
           }
       else{
            return false
        }
    }
    const onSubmitt = async(data)=>{
        
    if(editCourse){
        if(isformUpdated()){
            console.log("form updated ")
            const currentValue = getValues()
            const updatedData = {
                "courseName" : data.courseTitle,
                "courseDesc" : data.courseShortDesc,
                "category" : data.courseCategory,
                "tag" : JSON.stringify(data.Tag),
                "instructions" : JSON.stringify(data.courseRequirement),
                "price" : data.coursePrice,
                "whatYouWillLearn" : data.courseBenefit,
                "status" : "Draft",
                "image" : undefined,
                "courseId" : course._id
            }
            if(currentValue.courseImage !== course.thumbnail){
                console.log("image after image changed")
                const image = data.courseImage
                updatedData.image = image
                console.log("updated data image : " , updatedData.image)
            }
           
            console.log("formdata for updated course ", updatedData)
            const response = await updateCourse(updatedData , token , dispatch)
            if(response){
                dispatch(setEditCourse(false))
                dispatch(setStep(2))
            }
            return
        }
       else{
        toast.error("No changes in form")
       }
    }  
    else{
            const formdata = {
                "courseName" : data.courseTitle,
                "courseDesc" : data.courseShortDesc,
                "category" : data.courseCategory,
                "tag" : JSON.stringify(data.Tag),
                "instructions" :JSON.stringify(data.courseRequirement),
                "price" : data.coursePrice,
                "whatYouWillLearn" : data.courseBenefit,
                "image" : data.courseImage,
                "status" : "Draft",
            }
            const response = await createCourse(formdata,token,dispatch)
            if(response){
                dispatch(setStep(2))
            }
            
            
        }
      
       
        
    
}

  return (
    <div className='w-[665px]  p-[24px] border border-richblack-500'>
        <form className='flex flex-col gap-[16px] items-start w-11/12 justify-between' onSubmit={handleSubmit(onSubmitt)}>
                {/* course title */}
                <div className='flex flex-col gap-2 w-[100%] '>
                    <label className='text-[400] leading-[22px] text-[14px] w-full text-richblack-50 ' htmlFor='courseTitle'>Course Title <sup className='text-pink-300 '>*</sup></label>
                    <input className='p-[8px] text-500 text-[14px] leading-[24px] w-full text-richblack-100 bg-richblack-700  formshadow rounded-md ' type='text' placeholder='Enter Course Title' name='courseTitle' {...register("courseTitle",{required : true})}></input>
                    <p className="ml-2 text-xs tracking-wide text-pink-200">
                        {
                            errors.courseTitle && (<span>Required Field</span>)
                        }
                    </p>
                </div>
                {/* course short desc */}
                <div className='flex flex-col gap-2 w-[100%] '>
                    <label className='text-[400] leading-[22px] w-full text-[14px] text-richblack-50 ' htmlFor='courseShortDesc'>Course Short Description <sup className='text-pink-300 '>*</sup></label>
                    <textarea className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-100 bg-richblack-700  formshadow rounded-md ' rows={4} cols={30} placeholder='Enter Description' name='courseShortDesc' {...register("courseShortDesc",{required : true})}></textarea>
                    <p className="ml-2 text-xs tracking-wide text-pink-200">
                        {
                            errors.courseShortDesc && (<span>Required Field</span>)
                        }
                    </p>
                </div>
                {/* course price */}
                <div  className='flex flex-col gap-2 w-[100%] '>
                    <label  className='text-[400] leading-[22px] w-full text-[14px] text-richblack-50 ' htmlFor='coursePrice'>Course Price <sup className='text-pink-300 '>*</sup></label>
                    <input className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-100 bg-richblack-700  formshadow rounded-md '  type='text' placeholder='Enter Price' name='coursePrice' {...register("coursePrice",{required : true})}></input>
                    <p className="ml-2 text-xs tracking-wide text-pink-200">
                    {
                        errors.coursePrice && (<span>Required Field</span>)
                    }
                    </p>
                </div>
                {/*course category */}
                <div  className='flex flex-col gap-2 w-[100%] '>
                    <label className='text-[400] leading-[22px] text-[14px] text-richblack-50' htmlFor='courseCategory'>Category <sup className='text-pink-300 '>*</sup></label>
                    <select className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-100 bg-richblack-700  formshadow rounded-md ' {...register("courseCategory", { required: true })}  name='courseCategory' >

                        {
                            (
                                courseCategories.map((category,index)=>{
                                    return <option  key={index} value={category._id}>{category.name}</option>
                                })
                            )
                        }
                       
                    </select>
                    <p className="ml-2 text-xs tracking-wide text-pink-200">
                    {
                        errors.courseCategory && (<span>Required Field</span>)
                    }
                    </p>
                </div>
                {/* course tag.. */}
                <div>
                    <ChipInput name={"Tag"}  label={"Tags"}  register={register}  errors={errors}  setValue={setValue}  getValue={getValues}></ChipInput>
                </div>
                {/* create a thumnail */}
                <div className='w-[100%]'>
                    <Upload  name={"courseImage"} register={register} setValue={setValue} errors={errors} video={false} viewData={null} editData={null} />
                </div>
                {/* benefits of course */}
                <div  className='flex flex-col gap-2 w-[100%] '>
                    <label  className='text-[400] leading-[22px] w-full text-[14px] text-richblack-50 '  htmlFor='courseBenefit'>Benefits of Course</label>
                    <textarea className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-100 bg-richblack-700  formshadow rounded-md ' placeholder='Enter Benefits of the course'   rows={4} cols={20} name='courseBenefit' {...register("courseBenefit" , {required : true})}></textarea>
                    <p className='text-[400] leading-[22px] text-[14px] text-pink-300 '>
                        {
                            errors.courseBenefit && (<span>Required Field</span>)
                        }
                    </p>
                </div>
                {/* instructions for course */}
                <div className='w-[100%]'>
                    <RequirementField name={"courseRequirement"} register={register} setValue={setValue} getValue={getValues}/>
                </div>
               <div className='w-[100%]'>
                    <button className='bg-yellow-50 rounded-md text-[500] text-[16px] leading-[24px] py-[8px] px-[20px] text-black hover:scale-105 transition-all duration-200 ' type='submit'>{!editCourse ? "Next" : "Edit"}</button>
               </div>
                {
                    editCourse && <button onClick={goToSection}>Go to Section</button>
                }
        </form>
    </div>
  )
}

export default CourseBuilderForm