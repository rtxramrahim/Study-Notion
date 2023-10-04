import React from 'react'
import ContactUSForm from '../components/core/contactUs/ContactUSForm'
import ContactUsCard from '../components/core/contactUs/ContactUsCard'
import RatingsAndReviews from '../components/common/RatingsAndReviews'
import Footer from '../components/core/homepage/Footer'

function ContactUS() {
  return (
   <div>
     <div className='text-white w-11/12 flex flex-col gap-[36px] mx-auto px-[24px] py-[90px]'>
        <div className='flex flex-row gap-[52px] '>
            <ContactUsCard/>
           <ContactUSForm/>
        </div>
        <RatingsAndReviews></RatingsAndReviews>
    </div>
    <Footer></Footer>
   </div>
  )
}
export default ContactUS
