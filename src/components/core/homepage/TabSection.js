import React, { useState } from 'react'
import HomePageExplore from "../../../data/homepage-explore"
import HighlightedText from './HighlightedText'
import CourseCard from './CourseCard'
function TabSection() {
    const tabs = ["Free" , "New to coding" , "Most popular" , "Skills paths", "Career paths"]
    const [currentTabs,setCurrentTabs] = useState(tabs[0])
    const [courses,setCourses] = useState(HomePageExplore[0].courses)
    const[currentCard,setCurrentCard] = useState(courses[0].heading)

    const setMyCards = (value)=>{
        setCurrentTabs(value)
        const result = HomePageExplore.filter((element)=>element.tag===value)
        if (result.length === 0) {
            // Handle the case when no matching section is found
            console.error(`No section found for the tab: ${value}`);
            return; // Exit the function early to avoid further errors
          }
        const selectedElement = result[0]
        setCourses(selectedElement.courses)
        setCurrentCard(selectedElement.courses[0].heading)
    }
  return (
    <div className='w-11/12 flex flex-col h-[500px] items-center gap-3 py-[90px] px-[120px]'>
            <div className=''>
                <h2 className='text-4xl font-[600] font-inter text-white '>
                    Unlock The <HighlightedText text={"Power Of Code"}/>
                </h2>
                <p className='font-[500] mt-3 mb-9 text-[16px] leading-[24px] text-center text-richblack-300'>Learn to Build Anything You Can Imagine</p>
             </div>
            <div className='flex mx-auto flex-row gap-1 items-center'>
                {tabs.map((tab,index)=>{
                    return (
                       <div  key={index}>   
                       <div  onClick={()=>{setMyCards(tab)}} className={`text-[16px] w-fit font-inter px-2 py-2 rounded-md ${currentTabs==tab ? "bg-richblack-800 text-richblack-100" : "bg-richblack-700 text-richblack-300"}`} >
                            {tab}
                        </div>
                       </div>
                    )
                })}
            </div>
             {/* tabs */}
             <div className='w-11/12 py-[32px] flex flex-row gap-5 mx-auto px-[52]'>
                {
                    courses.map((course,index)=>{
                       return <CourseCard key={index} props={course} setCurrentCard={setCurrentCard} currentCard={currentCard}/>
                    })
                }
             </div>
    </div>
  )
}

export default TabSection