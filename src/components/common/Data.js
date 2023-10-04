import React from 'react'

function Data({number,place}) {
  return (
    <div className='flex flex-col gap-[12px] items-center'>
        <div className='font-[700] text-[30px] leading-[38px] text-center text-richblack-5'>
            {number}
        </div>
        <div className='text-[16px] leading-[24px] font-[600] text-center  text-richblack-500 '>
            {place}
        </div>
    </div>
  )
}

export default Data