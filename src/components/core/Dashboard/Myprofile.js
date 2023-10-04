import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
function Myprofile() {
    const {user} = useSelector((state)=>state.profile)
    const firstname = user.firstname
    const lastname = user.lastname
    const email = user.email
    const image = user.image
   
    const navigate = useNavigate()
  return (
    <div className='w-10/12 mx-auto'>
        <div className='font-[500] text-[30px] leading-[38px] text-richblack-5 py-[24px]'>My Profile</div>
            <div className=''>
                <div className='flex flex-row items-center justify-between p-[24px] bg-richblack-800 rounded-md'>
                    <div className='flex flex-row items-center gap-4'>
                        {/* user image in src img */}
                        <img src={image} height={78} width={78} className='w-[78px] h-[78px] rounded-full'></img>
                        <div>
                            <p className='font-600 text-[18px] leading-[26px] text-richblack-5'>{`${firstname + " " +`${lastname}`}`}</p>
                            <p className='font-[400] text-[14px] leading-[22px] text-richblack-300'>{email}</p>
                        </div>
                    </div>
                    <div  className='bg-yellow-50 text-black py-[6px] px-[18px] text-semibold rounded-md' >
                    <IconBtn
                        text={"Edit"}
                        onClick={()=>{
                            navigate("/dashboard/settings")
                        }}
                    />
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>                    
        <div className='flex flex-col gap-[20px] bg-richblack-800 p-[24px] rounded-md'>
            <div className='flex flex-row items-center justify-between'>
                <p className='font-[600] text-18px leading-[26px] text-richblack-5' >Personal Details</p>
                <div className='bg-yellow-50 text-black py-[6px] px-[18px] text-semibold rounded-md' >
                    <IconBtn  text={"Edit"} onClick={()=>{
                        navigate("/dashboard/settings")
                    }}/>
                </div>
            </div>
            <div className='flex flex-row gap-28   items-center'>
                <div>
                    <p className='font-[400] text-[14px] leading-[22px] text-richblack-600'>First Name</p>
                    <p className='font-[500] text-[14px] leading-[22px] text-richblack-5'>{firstname}</p>
                </div>
                <div>
                    <p className='font-[400] text-[14px] leading-[22px] text-richblack-600'>Last Name</p>
                    <p className='font-[500] text-[14px] leading-[22px] text-richblack-5'>{lastname}</p>
                </div>
            </div>
            <div>
                <p className='font-[400] text-[14px] leading-[22px] text-richblack-600'>Email</p>
                <p className='font-[500] text-[14px] leading-[22px] text-richblack-5'>{email}</p>
            </div>
        </div>
        
    </div>
  )
}

export default Myprofile