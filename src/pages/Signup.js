import React from 'react'
import Template from '../components/core/form/Template'
import SignupImg from "../assets/Images/signup.webp"
function Signup() {
  return (
    <div className='text-white '>
        <Template formtype={true} heading={"Welcome Back"} subheading={"Discover Your Passion,"}  img={SignupImg}/>
    </div>
  )
}

export default Signup