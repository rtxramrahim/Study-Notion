import React from 'react'
import * as Icons  from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { Link, matchPath, useLocation } from 'react-router-dom'
function SidebarLink({link,name,iconName}) {
    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
  

  return (
    <Link to={`${link}`} className=''>
        
        <div className={`${matchRoute(`${link}`) ? "bg-yellow-700 text-yellow-50 profilebtnborder" : "bg-opacity-0 text-richblack-100 "}    `}>
            <div className='flex flex-items gap-3 justify-start  py-[8px] px-[24px] items-center rounded-md     '>
               
                <Icon className='text-lg'></Icon>

                <span>{`${name}`}</span>
            </div>
        </div>
       
        
    </Link>
  )
}

export default SidebarLink