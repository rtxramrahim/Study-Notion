import React from 'react'
import logo from "../../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import {FaFacebookF} from "react-icons/fa"
import {AiOutlineGoogle} from "react-icons/ai"
import {AiOutlineTwitter} from "react-icons/ai"
import {FaYoutube} from "react-icons/fa"
import FooterLink2 from '../../../data/footer-links'
function Footer() {
  return (
    <div className='py-[52px] px-[120px] bg-richblack-800'>
        <div className='flex flex-row justify-around'>
            <div className='flex flex-col items-start gap-2'>
                    <img className='w-[160px] h-[32px]' src={logo}></img>
                    <h2 className='text-[16px] font-[600] font-inter leading-[24px] text-richblack-100'>Company</h2>
                    <Link className='text-[14px] leading-[22px] font-[400] text-richblack-400' to={"/about"}>About</Link>
                    <Link  className='text-[14px] leading-[22px] font-[400] text-richblack-400' to={"/courses"}>Courses</Link>
                    <Link  className='text-[14px] leading-[22px] font-[400] text-richblack-400' to={"/Affiliates"}>Affiliates</Link>
                    <div className='flex flex-row gap-2 items-start'>
                        <FaFacebookF className={'text-richblack-100'}/>
                        <AiOutlineGoogle className={'text-richblack-100'}/>
                        <AiOutlineTwitter className={'text-richblack-100'}/>
                        <FaYoutube className={'text-richblack-100'}/>
                    </div>
             </div>
            <div className='flex flex-col items-start gap-2'>
                <h2 className='text-[16px] font-[600] font-inter leading-[24px] text-richblack-100'>Resources</h2>
                <div className='text-[14px] leading-[22px] font-[400] text-richblack-400'>
                    <p>Articles</p>
                    <p>Blogs</p>
                    <p>Chart Sheet</p>
                    <p>Code Challenges</p>
                    <p>Docs</p>
                    <p>Projects</p>
                    <p>Videos</p>
                    <p>WorkSpace</p>
                </div>
                <div>
                    <h2 className='text-[16px] font-[600] font-inter leading-[24px] text-richblack-100'>Support</h2>
                    <p className='text-[14px] leading-[22px] font-[400] text-richblack-400'>Help Center</p>
                </div>
            </div>
            <div className='flex flex-col items-start gap-2 '>
                <h2  className='text-[16px] font-[600] font-inter leading-[24px] text-richblack-100'>Plans</h2>
                <div className='text-[14px] leading-[22px] font-[400] text-richblack-400'>
                    <p>Paid Memberships</p>
                    <p>For Students</p>
                    <p>Bussiness Solution</p>
                </div>
            <div className='flex flex-col items-start gap-2 '>
                    <h2 className='text-[16px] font-[600] font-inter leading-[24px] text-richblack-100'>Community</h2>
                    <div className='text-[14px] leading-[22px]  font-[400] text-richblack-400' >
                        <p>Forums</p>
                        <p>Chapters</p>
                        <p>Events</p>
                    </div>
                </div>
            </div>

            {/* border section */}
            <div className='borderFooter'></div>


            <div className='flex flex-row justify-between mr-20  gap-10'>
                    {
                        FooterLink2.map((element,index)=>{
                            return(
                            <div key={index} className='flex flex-col items-start gap-2'>
                               
                                <h2 className='text-[16px] font-[600] font-inter leading-[24px] text-richblack-100'>{element.title}</h2>
                                <div className='text-[14px] flex flex-col  leading-[22px] font-[400] text-richblack-400'>
                                        {element.links.map((link,index)=>{
                                        return <Link key={index} to={`${link.link}`}>{link.title}</Link>
                                        })}
                                </div>
                               
                        
                            </div>
                            )
                           
                        })
                    }
            </div>
            
        </div>
        <div className="endingborder w-11/12 mt-6 mb-3"></div> 
        <div className='flex flex-row gap-2 items-center text-[14px] leading-[22px] font-[400] text-richblack-400'>
            <div>
                Privacy Policy
            </div>
            <div className='border-2 rounded-full'></div>
            <div>
                Cookie Policy
            </div>
            <div className='border-2 rounded-full'></div>
            <div>
                Terms
            </div>
        </div>                  
    </div>
  )
}

export default Footer