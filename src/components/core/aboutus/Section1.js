import React from 'react'
import HighlightedText from '../homepage/HighlightedText'
import aboutus1 from "../../../assets/Images/aboutus1.webp"
import aboutus2 from "../../../assets/Images/aboutus2.webp"
import aboutus3 from "../../../assets/Images/aboutus3.webp"
function Section1() {
  return (
    <div className='flex flex-col items-center gap-[38px] mx-auto bg-richblack-800 h-[619px] py-[80px] px-[120px]'>
        <div className='text-richblack-200'>
            About Us
        </div>
        <div className='text-center font-[600] text-white text-[36px]  leading-[44px] '>
            Driving Innovation in Online Education for a <br></br> <HighlightedText text={"Brighter Future"}/>
        </div>
        <div className='text-richblack-300 font-500 text-[16px] leading-[24px] text-center '>
            Studynotion is at the forefront of driving innovation in online education.
            We're passionate about creating a brighter future by offering cutting-edge courses,
            leveraging emerging technologies, and nurturing a vibrant learning community.
        </div>
        <div className='flex flex-row items-center gap-5  justify-around'>
            <img src={aboutus1} width={384} className='rounded-md' height={311} alt='imgage1' loading='lazy'/>
            <img src={aboutus2} width={384} className='rounded-md' height={311} alt='image2' loading='lazy'/>
            <img src={aboutus3} width={384} className='rounded-md' height={311} alt='image3' loading='lazy'/>
        </div>
    </div>
  )
}

export default Section1