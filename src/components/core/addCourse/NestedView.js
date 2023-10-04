import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import SubSectionModal from './Modals/SubSectionModal'
import {AiOutlineArrowDown, AiOutlineEdit} from "react-icons/ai"
import {AiOutlineDelete} from "react-icons/ai"
import { deleteSection, deletesubSection } from '../../../services/operations/CourseApi'
import ConfirmationModal from './ConfirmationModal'
import { setCourse } from '../../../slices/courseSlice'
function NestedView({handleChangeEditSection}) {
  const {course} = useSelector((state)=>state.course)
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [addsubSection,setaddSubSection] = useState(null)
  const [viewsubSection,setviewSubSection] = useState(null)
  const [editsubSection , seteditSubSection] = useState(null)

  const [confirmationModal , setconfirmationModal] = useState(null)
  const  handleDeleteSection = async(sectionID)=>{
    const formdata = {
      sectionId : sectionID,
      courseId : course._id
    }
    console.log("formdata : " ,formdata)
    const response  = await deleteSection(formdata , token , dispatch)
  
      setconfirmationModal(null)
   
  } 
  const handleDeleteSubSection = async(sectionId , subSectionId)=>{
    const formdata = {
      "subSectionId" : subSectionId,
      "sectionId" : sectionId 
    }
    console.log("formdata data for delete subsection  " ,formdata)
    const response = await deletesubSection(formdata , token)
    if(response){
      const updatedSection = course?.courseContent?.map((section)=>section._id === sectionId ? response : section)
      const updatedCourse = {...course , courseContent : updatedSection}
      dispatch(setCourse(updatedCourse))
      console.log("updated section after deleting lecture" , course.courseContent)
    }
    setconfirmationModal(null)
  }
  return (
    <div className='text-white bg-richblack-700 rounded-md px-[24px] '>
        <div >
            {course?.courseContent?.map((section)=>{
               return <details key={section._id} >
                        <summary className='flex flex-row items-center justify-between text-[600] text-[16px] p-[12px] border-b border-richblack-400  leading-[24px] text-richblack-50 '>
                        <div>
                          
                          <p>• {section.sectionName}</p>
                         </div>
                         <div className='flex flex-row gap-2 items-baseline justify-between'>
                              <div>
                                  <div onClick={()=>handleChangeEditSection(section._id,section.sectionName)}><AiOutlineEdit/></div>
                              </div>
                              <div>
                                  <button onClick={()=>
                                      setconfirmationModal({
                                          text1 : "Delete this Section",
                                          text2 : "All the lectures in this section will be deleted",
                                          btn1Text : "Delete",
                                          btn2Text : "Cancel",
                                          btn1Handler : () => handleDeleteSection(section._id),
                                          btn2Handler : () => setconfirmationModal(null)
                                      })
                                  }><AiOutlineDelete/></button>
                              </div>
                              
                              <div><AiOutlineArrowDown/></div>
                         </div>
                         
                    </summary>
                    {/* subsections starts */}
                    <div>
                            {
                              section?.subSection.length > 0 &&
                              (section?.subSection?.map((data)=>{
                              return (
                                <div className='flex flex-row justify-between border-b   border-richblack-300 items-center p-[12px]' key={data._id} >
                                  <div className='' onClick={()=>setviewSubSection(data)}>
                                  
                                    <p className='text-[500] text-[14px] leading-[22px] text-richblack-50'>{data.title}</p>
                                    <p className='text-[500] text-[14px] leading-[22px] text-richblack-50'>{data.description}</p>
                                  </div>
                                  <div className='flex flex-row items-baseline  text-richblack-50 gap-3'>
                                            <button onClick={()=>seteditSubSection({...data , subSectionId : data._id , sectionId : section._id})}><AiOutlineEdit/></button>
                                           
                                            <button onClick={()=>{
                                            setconfirmationModal({
                                            text1 : "Delete this Lecture",
                                            text2 : "Selected Lecture will be Deleted",
                                            btn1Text : "Delete",
                                            btn2Text : "Cancel",
                                            btn1Handler : ()=> handleDeleteSubSection(section._id,data._id),
                                            btn2Handler : ()=>setconfirmationModal(null)
                                          })
                                          }}><AiOutlineDelete/>
                                          </button>
                                  </div>
                                </div>
                              )
                            }))
                            }
                            <div className=''>
                                <button className={"flex cursor-pointer flex-row items-center justify-between  text-yellow-50 font-semibold   w-[30%] p-1  text-center rounded-md"} onClick={()=>setaddSubSection(section._id)}>+ Add Lecture</button>
                            </div>
                         </div>
                </details>
            })}
            <div >
            {
              addsubSection ? (<SubSectionModal modalData ={addsubSection} setModalData = {setaddSubSection} add={true}/>) : 

              viewsubSection ? (<SubSectionModal modalData ={viewsubSection} setModalData = {setviewSubSection} view={true}/>) : 

              editsubSection ? (<SubSectionModal modalData={editsubSection} setModalData = {seteditSubSection} edit={true}/> ) :
              

              <div></div>

            }
            {
              confirmationModal && 
               <ConfirmationModal modalData={confirmationModal}/>
            }
            </div>
           

        </div>
    </div>
  )
}

export default NestedView