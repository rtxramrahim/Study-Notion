import React from 'react'
import sidebarLinks from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../../common/ConfirmationModal'
import { VscSignOut } from 'react-icons/vsc'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../../slices/AuthSlice'
function Sidebar() {
// const {user,loading : profileLoading } = useSelector((state)=>state.profileSlice)
    const {loading : authloading} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const [confirmationModal,setConfirmationModal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
  return (
    <div className='w-[300px]  h-full  bg-richblack-700'>
        <div className=' mt-8'>
        <div className='flex flex-col gap-2'  >
            {  
                sidebarLinks.map((link)=>{
                    if(link.type && user.accType !== link.type) return null  ;
                    return <SidebarLink key={link.id} link={link.path} name={link.name} iconName={link.icon}/>
                }
                ) 
            }
        </div>
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-200'></div>
        <SidebarLink link={"/dashboard/settings"} name={"Setting"} iconName={"VscSettingsGear"}></SidebarLink>
        <button className='ml-6 mt-3' onClick={()=>{
            setConfirmationModal({
            text1: "Are you Sure ?",
            text2: "You will be logged out of your Account",
            btn1Text : "Logout",
            btn2Text : "Cancel",
            
            btn2Handler : ()=> setConfirmationModal(null)
        })
        }}>
        <div className='text-white justify-center bg-blue-400 flex flex-row gap-2 items-center px-[8px] py-[4px] rounded-md '>
                <VscSignOut/>
                <span>Logout</span>
        </div>
        </button>
        </div>
       <div className={`absolute left-[40%] top-[35%] bg-blue-400  text-white`}>
       {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }  
       </div>  
    </div>
  )
}


export default Sidebar