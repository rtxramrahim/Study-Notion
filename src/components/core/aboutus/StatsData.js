import React from 'react'
import Data from '../../common/Data'
function StatsData() {
  return (
    <div className='flex flex-row items-center justify-around w-11/12 mx-auto px-[90px] py-[120px]'>
        <Data number={"200+"} place={"Active Students"}/>
        <Data number={"10+"} place={"Members"}/>
        <Data number={"200+"} place={"Courses"}/>
        <Data number={"50+"} place={"Awards"}/>
    </div>
  )
}

export default StatsData