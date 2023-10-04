import React from 'react'
import { Link } from 'react-router-dom'
function CTAButton({children , active , linkto}) {
  return (
    <div>
        <Link to={linkto}>
            <div className={`text-center text-[16px] leading-[24px]  font-[500] py-[10px] px-[22px] rounded-md font-inter ${active ? "bg-yellow-50 text-richblack-900 transition-all duration-200 hover:scale-105": 
            "bg-richblack-700 text-white transition-all duration-200 hover:scale-105"} `}>
                {children}
            </div>
        </Link>
    </div>
  )
}

export default CTAButton