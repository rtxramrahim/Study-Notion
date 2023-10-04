import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'
function Dashboard() {
    const {loading  : authloading} = useSelector((state)=>state.auth)
    const {loading : profileLoading} = useSelector((state)=>state.profile)
    
    if(profileLoading || authloading){
        return <div>Loading....</div>
    }
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <div>
        <Sidebar></Sidebar>
        </div>
        <div className='mx-auto w-[75%] '>
            <div>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard