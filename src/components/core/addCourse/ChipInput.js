import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {AiOutlineClose} from "react-icons/ai"
import { useSelector } from 'react-redux'
const ChipInput = ({name , label , register , errors , setValue , getValue}) => {
const {course , editCourse} = useSelector((state)=>state.course)
    const [chip , setChip] = useState([])
   
    useEffect(() => {
        if (editCourse) {
          // console.log(course)
          setChip(JSON.parse(course?.tag))
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    useEffect(()=>{
        setValue(name,chip)
       
        // console.log("tags : " , chip)        
    },[chip])
    const addTag = (event)=>{
        if (event.key === "Enter" || event.key === ","){
            event.preventDefault()
            const chipValue = event.target.value.trim()
            if(chipValue && !chip.includes(chipValue)){
                const newTag = [...chip , chipValue]
                setChip(newTag)
                event.target.value = ""
            }
        }
    }
    const deleteTag = (chipindex)=>{
        const updatedtags = chip.filter((_,index)=> index!== chipindex)
        setChip(updatedtags)
    }
  return (
    <div className='w-[665px]' >
        <div className='flex flex-row gap-2 flex-wrap w-11/12'>
            
            {
               
                (
                    chip.map((tag,index)=>{
                    return (
                    <div key={index} className='relative'>
                        <p className='bg-yellow-200 text-white text-[14px] text-[400] leading-[22px] p-1 rounded-md'>{tag} 
                        <sup className='text-[12px] cursor-pointer pl-3  ml-2 text-yellow-900 font-semibold' onClick={()=>deleteTag(index)}>x</sup></p>
                        
                    </div>
                 )
                })
                )
            }
                
            
        </div>
        <div className='flex flex-col gap-2 w-11/12 '>
            <label className='text-[400] leading-[22px] text-[14px] text-richblack-50' htmlFor={name}>{label}</label>
            <input className='p-[8px] text-500 text-[14px] w-full leading-[24px] text-richblack-100 bg-richblack-700  formshadow rounded-md '  name={name} type='text' placeholder='Create Tags' onKeyDown={addTag} ></input>
           
        </div>
        
    </div>
  )
}

export default ChipInput