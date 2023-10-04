import React from 'react'
import { Link } from 'react-router-dom'
import HighlightedText from '../components/core/homepage/HighlightedText'
import banner from "../assets/Images/banner.mp4"
import {FaArrowRight} from "react-icons/fa"
import CTAButton from '../components/core/homepage/CTAButton'
import CodeBlocks from '../components/core/homepage/CodeBlocks'
function Homepage() {
  return (
    <div className='sm:w-[390px] mx-auto lg:w-[1024px]  '>
        {/* section-1 */}
        <div className='mx-auto '>
           <div className='flex flex-col items-center gap-[38px]'>
              <div className="sm:h-[44px] group rounded-full mt-16 hover:shadow-richblack-500  bg-richblack-700 text-richblack-200 font-bold transition-all duration-200  w-fit  ">
                    <Link to={"/signup"}>
                        <div className="rounded-full py-[10px] px-[18px] transition-all group-hover:bg-richblack-800 group-hover:scale-95 flex items-center gap-4 ">
                            <div>Become an Instructor</div>
                            <FaArrowRight/>
                        </div>
                    </Link>
                </div>
              <div className="lg:leading-[44px] lg:text-[36px] text-white sm:leading-[38px] text-[30px] font-[600] font-inter lg:text-center">
                        Empower Your Future With <HighlightedText text={"Coding Skills"}/>
              </div>
              <div className="font-inter font-500 text-[16px] leading-[24px] text-center text-richblack-300">
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
              </div>
              <div className="flex flex-row gap-[24px] items-center">
                        <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
              </div>
           </div>
           {/*  */}
          <div className="lg:w-[1035px] lg:h-[458px] mx-auto  sm:w-[358px] mt-[38px] sm:h-[171px]" >
                <div className="w-[720px] bg-white absolute  "></div>
                <video 
                muted 
                loop 
                autoPlay
                src={banner} 
                type="video/mp4" className="mx-auto lg:w-[720px] sm:w-[340px]">
                </video>
            </div>
        </div>  
        {/* section-2 CodeBlocks */}
        <div className='sm:w-[390px] sm:px-[16px] sm:py-[32px]  lg:w-11/12 lg:px-[120px] lg:py-[90px] '>
            <CodeBlocks position={`lg:flex-row sm:flex-col`} 
                heading={
                <div>
                    <p>Unlock your <HighlightedText text={"Coding Potential"} /> with our online courses.</p>
                </div>}
                subheading={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}
                ctabtn1=
                { 
                  {
                    active : true,
                    linkto : "/signup",
                    btnText : "Try It Yourslef"
                  }
                  
                }
                ctabtn2=
                {
                  {
                    active : false,
                    linkto : "/login",
                    btnText : "Learn More"
                  }
                }
                codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>
                              <body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n<\n>
                          `} 
                backgroundGradient={`bgGradient`} codeColor={`text-richblack-300`}>
                
                </CodeBlocks>

                <CodeBlocks position={`lg:flex-row sm:flex-col`} 
                heading={
                <div>
                    <p>Unlock your <HighlightedText>Coding Potential</HighlightedText> with our online courses.</p>
                </div>}
                subheading={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}
                ctabtn1=
                { 
                  {
                    active : true,
                    linkto : "/signup",
                    btnText : "Try It Yourslef"
                  }
                  
                }
                ctabtn2=
                {
                  {
                    active : false,
                    linkto : "/login",
                    btnText : "Learn More"
                  }
                }
                codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>
                              <body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n<\n>
                          `} 
                backgroundGradient={`bgGradient`} codeColor={`text-richblack-300`}>
                
                </CodeBlocks>
        </div>
        {/* section-2 Tabs_section */}
        <div>
            

        </div>
        {/* timeline section */}
        <div>

        </div>
        {/* Learning Language */}
        <div>

        </div>
        {/* Become Instructor */}
        <div>

        </div>
        {/* Ratings and Reviews */}
        <div>

        </div>
        {/* Foooter */}
        <div>

        </div>
    </div>
  )
}

export default Homepage