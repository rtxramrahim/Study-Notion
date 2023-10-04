import React from 'react'
import CTAButton from './CTAButton'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'
function CodeBlocks({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) {
  return (
    <div className={`flex  ${position} w-[100%] justify-between gap-[98px] `}>
    {/* section-1 */}
        <div className='flex sm:w-full lg:w-[486px] flex-col gap-[54px] w-[50%] '>
            <div className='sm:w-[358px] text-white sm:h-[114px] sm:text-[30px] sm:leading-[38px] lg:w-[486px] lg:h-[88px] lg:text-[36px] lg:leading-[44px] font-inter font-[600]  flex flex-row gap-4  text-4xl'>
                {heading}
            </div>
            <div className='text-richblack-200 text-[16px]  leading-[24px]  '>
                {subheading}
            </div>
            <div className='flex gap-[24px] pt-[24px]'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex flex-row gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div>
                        {ctabtn2.btnText}
                    </div>
                </CTAButton>
            </div>
        </div>
    {/* section-2     */}
        <div className={`flex flex-row justify-between  rounded-xl text-[16px] lg:p-[32px] gap-[2px] h-fit lg:w-[470px] sm:h-full ${backgroundGradient}`} >
            <div className='flex flex-col items-center sm:w-[9px] lg:w-[9px]  text-richblack-500 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
            </div>
            <div className={`lg:w-[422px] sm:w-[310px] font-inter text-${codeColor}  `} >
                <TypeAnimation
                    sequence={[codeblock , 5000 ]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace : "pre-line",
                            display : "block"
                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks