import React from 'react'
import Section1 from '../components/core/aboutus/Section1'
import HighlightedText from '../components/core/homepage/HighlightedText'
import Section2 from '../components/core/aboutus/Section2'
import Section3 from '../components/core/aboutus/Section3'
import Footer from '../components/core/homepage/Footer'
import StatsData from '../components/core/aboutus/StatsData'
import GridSection from '../components/core/aboutus/GridSection'
import ContactFormSection from '../components/core/aboutus/ContactFormSection'
import RatingsAndReviews from '../components/common/RatingsAndReviews'
function AboutUs() {
  return (
    <div className=''>
        <Section1/>
        
        <div className='font-[600] leading-[52px] text-center text-[36px] text-richblack-100  w-11/12 mx-auto  py-[120px] px-[90px]'>
          We are passionate about revolutionizing the way we learn.
          Our innovative platform <HighlightedText text={"combines technology"} />, <span className='text-pink-500'>expertise</span>, and community to create an <span className='text-yellow-50'>unparalleled educational experience</span>.
        </div>
        
      <Section2/>

      <Section3/>

      <StatsData></StatsData>

      <GridSection></GridSection>

      <ContactFormSection></ContactFormSection>

      <div className='w-11/12 mx-auto m-10 '>
      <RatingsAndReviews/>

      </div>      
      <Footer/>
    </div>
   
  )
}

export default AboutUs