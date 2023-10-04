import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'
function ContactFormSection() {
  return (
    <div className='w-11/12 mx-auto text-white '>
        <div className='flex flex-col items-center justify-center'>
          <div className='p-[32px]'>
              <h2 className='font-[600] text-[36px] leading-[44px] text-center'>Get In Touch</h2>
              <p className='text-[16px] leading-[24px] text-center font-500 text-richblack-300'>We'd love to here for you, Please fill out this form.</p>
          </div>
          <div>
              <ContactUsForm></ContactUsForm>
          </div>
        </div>
    </div>
  )
}

export default ContactFormSection