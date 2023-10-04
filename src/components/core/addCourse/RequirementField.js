import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
function RequirementField({name,label,register,setValue,getValue}) {
    const[requirements,setRequirements] = useState("")
    const[requirementList,setRequirementList] = useState([])
    const {editCourse,course} = useSelector((state)=>state.course)
    useEffect(() => {
        if (editCourse) {
          setRequirementList(JSON.parse(course?.instructions))
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList])
    const handleAddRequirement = ()=>{
        if(requirements){
            setRequirementList([...requirementList,requirements])
            setRequirements("")
            // console.log("requirement list : " , requirementList)
        }
    }
    const handleRemoveRequirement = (index)=>{
        const updatedrequirement = [...requirementList]
        updatedrequirement.splice(index,1)
        setRequirementList(updatedrequirement)
    }
  return (
    <div className='text-blue-500 w-11/12'>
         <div>
            <label className='text-[400] leading-[22px] w-full text-[14px] text-richblack-50 '  htmlFor={name}>{label}</label>
            <div>
                <input className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-100 bg-richblack-700  formshadow rounded-md ' placeholder='Enter Instructions of the course' type='text' id={name} name={name} value={requirements} onChange={(e)=>setRequirements(e.target.value)}></input>
                <button type='button' className='text-[16px] font-[700] leading-[24px] text-yellow-50 mt-3' onClick={handleAddRequirement}>Add</button>
            </div>
         </div>
         <div className='text-white'>
            {
                requirementList.length > 0 && (
                    <div className='flex flex-col items-start justify-between'>
                        {
                            requirementList.map((requirement,index)=>{
                               return <p className=' text-richblack-50   text-[16px] leading-[24px] flex flex-row gap-6' key={index}>
                                    <span> {requirement}</span>
                                    <button className='underline italic' onClick={()=>handleRemoveRequirement(index)}>clear</button>
                                </p>
                            })
                        }
                    </div>
                )
            }
         </div>
</div>
  )
}

export default RequirementField