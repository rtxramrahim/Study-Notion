import {Link} from "react-router-dom"
import {FaArrowRight} from "react-icons/fa"
import HighlightedText from "../components/core/homepage/HighlightedText"
import CTAButton from "../components/core/homepage/CTAButton"
import React from "react"
import banner from "../assets/Images/banner.mp4"
import Instructor from "../assets/Images/Instructor.png"
import CodeBlocks from "../components/core/homepage/CodeBlocks"
import TimelineSection from "../components/core/homepage/TimelineSection"
import LearningLanguage from "../components/core/homepage/LearningLanguage"
import TabSection from "../components/core/homepage/TabSection"
import Footer from "../components/core/homepage/Footer"
import RatingsAndReviews from "../components/common/RatingsAndReviews"
function Home() {
  return (
    <div>
        {/* section-1 */}
        <div className="relative mx-auto flex flex-col w-11/12 text-white justify-between mb-10">
            <div className="group mx-auto rounded-full mt-16 hover:shadow-richblack-500 shadow-sm   bg-richblack-700 text-richblack-200 font-bold transition-all duration-200 hover:scale-95 w-fit  ">
                <Link to={"/signup"}>
                    <div className="rounded-full transition-all group-hover:bg-richblack-800 flex items-center gap-4 px-10 py-[5px]">
                        <div>Become an Instructor</div>
                        <FaArrowRight/>
                    </div>
                </Link>
            </div>
            
            <div className="mx-auto text-4xl  font-semibold mt-6">
                Empower Your Future With <HighlightedText text={"Coding Skills"}/>
                <div></div>
               
            </div>
            {/* copy content from figma file */}
            
            <div className="w-[80%] mt-4 text-center mx-auto text-lg font-semibold text-richblack-200">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className="flex mx-auto flex-row gap-7 mt-8">
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
            </div>

            <div className="shadow-blue-200 mx-auto relative mt-7 mb-8 ">
                <div className="w-[720px] bg-white absolute "></div>
                <video 
                muted 
                loop 
                autoPlay
                src={banner} 
                type="video/mp4" className="w-[720px] videoshadow">
                </video>
            </div>
            {/* code section one */}
            <div className="w-100% flex flex-col items-center gap-20 mt-10">
                <CodeBlocks position={`flex-row`} 
                            heading={
                                    <div>
                                       <p>Unlock Your</p>  <HighlightedText text={"Coding Potential"}/>
                                        <p>With Our Online Courses</p>
                                    </div>
                                    }
                           subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}             
                           ctabtn1={{
                            btnText : "Try it Yourself",
                            active : true,
                            linkto : "/signup"
                           }}
                           ctabtn2={{
                            btnText : "Learn more",
                            active : false,
                            linkto : "/login"
                           }}
                           codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>\nExample\n</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav>\n<ahref="one/">One</a>\n<ahref="two/">Two</a>\n</nav>\n</body>`}
                           
                           
                           backgroundGradient={`bg-gradient-to-tr from-richblack-900 via-richblack-700  to-blue-600 `}
                           codeColor={`richblack-200`}


                />
                <CodeBlocks position={`flex-row-reverse`} 
                            heading={
                                    <div>
                                        Start <HighlightedText text={"Coding In Seconds"}/>
                                        
                                    </div>
                                    }
                           subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}             
                           ctabtn1={{
                            btnText : "Continue Lesson",
                            active : true,
                            linkto : "/login"
                           }}
                           ctabtn2={{
                            btnText : "Learn more",
                            active : false,
                            linkto : "/login"
                           }}
                           codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>\nExample\n</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav>\n<ahref="one/">One</a>\n<ahref="two/">Two</a>\n</nav>\n</body>`}
                           
                           
                           backgroundGradient={`bg-gradient-to-tr from-richblack-900 via-richblack-800 to-blue-600`}
                           codeColor={`richblack-200`}

                />
            </div>
        </div>
         {/* Cards and Tabs */}
         <div>
                <TabSection/>
        </div>
       
        {/* section-2 */}
        <div className="bgimage ">
            <div className="w-11/12 h-[333px] flex flex-col ">
                           
                <div className="w-11/12 max-w-content flex mt-6  flex-col items-center gap-5 mx-auto">
                    <div className="h-[150px]"></div>
                    <div className="flex flex-row gap-7">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex flex-row gap-2 items-center">
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>           
                </div>
            </div>
            <div className=" mx-auto w-11/12  flex flex-col items-center justify-between gap-5 mt-10 pb-10 " >
                <div className="flex flex-row gap-5 justify-between">
                    <div className="text-4xl   font-semibold">
                        Get The Skills You Need For the
                        <div>
                            <HighlightedText text={"Jobs That Is In Demand"} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 items-start w-[50%]">
                           <div className="font-inter text-[16px] leading-6  text-richblack-700 ">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                           <CTAButton active={true} linkto={"/signup"}>
                                    <div className="flex flex-row gap-2 items-center">
                                        Learn More
                                        
                                    </div>
                           </CTAButton>
                    </div>
                </div>
                    <TimelineSection/>
                    <LearningLanguage/> 
                    
                              
            </div>
        </div>
       

        {/* section-3*/}
        <div className="w-11/12 px-[120px] py-[90px] gap-[98px] flex flex-row items-center justify-between">
           <div>
              <img src={Instructor} width={"616px"} height={"545px"} className="imageshadow"></img>
           </div>
           <div className="w-[486px] h-[284px] flex flex-col items-start gap-10">
                    
                        <div className='text-4xl font-[600] font-inter text-white '>
                            <p>Become an </p> <HighlightedText text={"Instructor"}/>
                        </div>
                   
                    <div>
                        <p className="font-inter font-[500] text-[16px] leading-[24px] text-richblack-300">Instructors from around the world teach millions of students on StudyNotion.
                        We provide the tools and skills to teach what you love.</p>
                    </div>
                    <div className="mt-20  ">
                            <CTAButton active={true} linkto={"/singup"}>
                               <div className="flex flex-row gap-2 items-center">
                                   <p>Start Teaching Today</p>
                                   <FaArrowRight/> 
                               </div>
                            </CTAButton>            
                    </div>
           </div>
        </div>

        {/* section-4 */}
        <div className="w-11/12  py-[90px] px-[120px] ">
               <h2 className="text-white text-3xl text-center mb-5">Review From Other Learners</h2>
               <RatingsAndReviews/>     
        </div>

        <div>
            <Footer/>
        </div>

        
        

    </div>
  )
}

export default Home