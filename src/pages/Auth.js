import React from 'react'
import { useDispatch } from 'react-redux'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../slices/AuthSlice'
function OpenRoute({children}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {token} = useSelector((state)=>state.auth)
   
    if(token===null){
        return children
  
    }else{
        navigate("/dashboard/my-profile")
    }
  }
export default OpenRoute