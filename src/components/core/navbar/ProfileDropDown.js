import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../../slices/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import CTAButton from '../homepage/CTAButton'
import Dashboard from "./Dashboard"
function ProfileDropDown() {
  const {token} = useSelector((state)=>state.auth)
  const {user} = useSelector((state)=>state.profile)
  // console.log("user id ", user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  return (
    <div>
        
        <Dashboard></Dashboard>
    </div>
  )
}

export default ProfileDropDown