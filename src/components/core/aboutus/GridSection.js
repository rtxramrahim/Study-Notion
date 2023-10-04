import React from 'react'
import HighlightedText from '../homepage/HighlightedText'
import CTAButton from '../homepage/CTAButton'
function GridSection() {
    const GridSectionData = [
        {
            order : -1 ,
            heading : "World Class Learning for",
            highlightedText : "Anyone , Anywhere",
            text : "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            btntext : "Learn More",
            btnLink : "/signup"
        },
        {
            order : 1 ,
            heading : "Curriculum Based on Industry Needs",
            text : "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            order : 2,
            heading : "Our Learning Methods",
            text : "The learning process uses the namely online and offline."
        },
        {
            order : 3 ,
            heading : "Certification",
            text: "You will get a certificate that can be used as a certification during job hunting."
        },
        {
            order : 4,
            heading :`Rating "Auto-grading"`,
            text : "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
        },
        {
            order : 5,
            heading :"Ready to Work",
            text: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
        }
    ]
  return (
    <div>
        <div className='grid w-11/12 mx-auto py-[120px] px-[90px] lg:grid-cols-4 grid-cols-1'>
            {
                GridSectionData.map((element,index)=>{
                    return (
                        <div key={index} className={`${index===0 && "lg:col-span-2"} ${element.order%2===1 ? "bg-richblack-600" : "bg-richblack-800"} ${element.order===3 && "col-start-2" }`}>
                            {
                                element.order==-1 ? 
                                (<div className='flex flex-col bg-richblack-900 items-start justify-between gap-[12px] p-[12px]'>
                                    <p className='font-[600] text-[26px] leading-[44px] text-white'>{element.heading} <span className='text-blue-300 '>{element.highlightedText}</span></p>
                                    <p className='font-[500] text-[16px] leading-[24px] text-richblack-300'>{element.text}</p>
                                    <CTAButton active={true} linkto={element.btnLink}>Learn More</CTAButton>
                                </div>) : 
                                (<div className='flex flex-col items-center p-[32px] gap-[32px]'>
                                    <p className='font-[600] text-[18px] leading-[26px] text-richblack-5'>{element.heading}</p>
                                    <p className='font-[400] text-[14px] leading-[22px] text-richblack-100'>{element.text}</p>
                                </div>)
                            }
                        </div>

                    )
                })
            }
        </div>
    </div>
  )
}

export default GridSection