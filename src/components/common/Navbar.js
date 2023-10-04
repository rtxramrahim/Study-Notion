import React, { useEffect } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import NavbarLinks from "../../data/navbar-links"
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/navbar/ProfileDropDown'
import { apiConnector } from '../../services/ApiConnector'
import { categories } from '../../services/apis'
import {BiDownArrow} from "react-icons/bi"
import { useDispatch } from 'react-redux'
import { setToken } from '../../slices/AuthSlice'
function Navbar() {

    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const {totalItems} = useSelector((state)=>state.cart)
    const location = useLocation()
    const [subLinks,setSubLinks] = useState([])
    const dispatch = useDispatch()
   
    
    async function fetchCategory(){
    
        
        try{
            const result = await apiConnector("GET" ,categories.CATEGORIES_API)
            const categorySublinks = result.data.categories
            // console.log(categorySublinks)
            setSubLinks(categorySublinks)
            
        }catch(err){
            console.log("error while fetching data")
        }
     }
    
    useEffect(()=>{
       fetchCategory()
    },[])
    
    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    } 
  return (
    <div className='border-b-[1px]  flex items-center w-screen p-2 border-b-richblack-700'>
        <div className='flex w-11/12 flex-row  items-center justify-around '>
            <Link to={"/"}>
                <img src={logo}></img>
            </Link>
            <nav>
                <ul className='flex flex-row  gap-x-6 justify-between  '>
                    {
                        NavbarLinks.map((link , index)=>{
                            return (
                                <li key={index}>
                                    {
                                        link.title==="Catalog" ? (<div className={`text-richblack-25 relative ${user && user?.accType==="Instructor" && "hidden"} flex flex-row gap-1 items-center group`}>
                                            {link.title}
                                            <BiDownArrow/>
                                            <div className='overflow-y-auto invisible z-50 absolute left-[50%] -translate-x-28 translate-y-6 w-[200px] h-auto rounded-md top-[50%] bg-richblack-5 
                                                p-2 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
                                                
                                                <div className='group-hover:visible  group-hover:opacity-100'>
                                                {
                                                        subLinks.map((links,index)=>{
                                                            return <Link  key={index} className=' group-hover:visible group-hover:opacity-100  capitalize' to={`/catalog/${links.name.split(" ").join("-").toLowerCase()}`}>
                                                                        <div>{links.name}</div>
                                                                      </Link>
                                                                      
                                                                   
                                                        })
                                                    }
                                                </div>
                                            </div>
                                           
                                        </div>):(
                                            <Link  to={link.path}>
                                                <div className={`${matchRoute(link.path) ? "text-yellow-50" : "text-richblack-25"}`}>{link.title}</div>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            {/* login/signup/cart */}
            
            <div className='flex gap-4 z-50  items-center'>
                    {
                        token === null && (
                            <Link to={"/login"} className='text-richblack-50  border text-[14px] border-richblack-700 px-[12px] py-[4px] rounded-md bg-richblack-800'>Log In</Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"} className='text-richblack-50  border text-[14px] border-richblack-700 px-[12px] py-[4px] rounded-md bg-richblack-800'>Sign Up</Link>
                        )
                    }
                    
                    
                    {
                        user && user.accType !== "Instructor" && 
                        (
                            <Link to={"/dashboard/cart/buy"} className='relative text-richblack-100 text-lg '>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span className='text-richblack-25     absolute -top-4 -right-2'>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token != null && (
                            <div className='text-richblack-50 '>
                                <Link to={"/dashboard/my-profile"}><img src={user.image} height={35} width={35} className='w-[35px] h-[35px] rounded-full'></img></Link>
                            </div>
                        )
                    }
            </div>
        </div>
    </div>
  )
}

export default Navbar