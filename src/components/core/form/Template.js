import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import Frame from '../../../assets/Images/frame.png'
import React from 'react'

function Template({formtype,heading,subheading,img}) {
    return (
        <div className={`w-11/12 flex flex-row justify-between mx-auto p-20`}>
                <div className='flex flex-col  w-[100%] gap-[36px]'>
                    <div className='w-full flex flex-col gap-3'>
                        <div className="font-[600] text-white text-[30px] leading-[38px] ">{heading}</div>
                        <div className=" font-[400] leading-[24px] text-[16px] text-richblack-100 ">{subheading} <br></br><h3 className="text-[14px] leading-[12px] italic text-blue-100 ">Be Unstoppable</h3> </div>
                    </div>
                    <div>
                        {
                            formtype ? (<SignupForm/>) : (<LoginForm/>) 
                        }
                    </div>
                    
                </div>
                <div className="relative w-11/12 max-w-[450px]">
                    <img  src={Frame} width={558} height={504} loading="lazy"/>
                    <img className="absolute -top-4 right-4" src={img} width={558} height={490} loading="lazy"/>
                </div>
        </div>
      )
}

export default Template