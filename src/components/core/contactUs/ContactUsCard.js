import React from 'react'
import {AiFillMessage} from 'react-icons/ai'
import {BiWorld} from 'react-icons/bi'
import {AiTwotonePhone} from 'react-icons/ai'
function ContactUsCard() {
  return (
    <div className='w-[450px] h-[250px] p-[24px] flex flex-col  gap-[24px] bg-richblack-800 rounded-md '>
            <div className='w-[402px] flex flex-row gap-[9px] items-baseline'>
                <AiFillMessage className='text-richblack-25 '/>
                <div>
                    <p className='text-[600] text-[18px] leading-[26px] text-richblack-25' >Chat with us</p>
                    <p className='text-[500] text-[14px] leading-[22px] text-richblack-100'>Our friendly team is here to help</p>
                </div>
            </div>
            <div className='w-[402px] flex flex-row gap-[9px] items-baseline'>
                <BiWorld className='text-richblack-25 '/>
                <div>
                    <p className='text-[600] text-[18px] leading-[26px] text-richblack-25' >Visit us</p>
                    <p className='text-[500] text-[14px] leading-[22px] text-richblack-100'>Our friendly team is here to help</p>
                </div>
            </div>
            <div className='w-[402px] flex flex-row gap-[9px] items-baseline'>
                <AiTwotonePhone className='text-richblack-25 '/>
                <div>
                    <p className='text-[600] text-[18px] leading-[26px] text-richblack-25' >Call us</p>
                    <p className='text-[500] text-[14px] leading-[22px] text-richblack-100'>Our friendly team is here to help</p>
                </div>
            </div>
           
    </div>
  )
}

export default ContactUsCard