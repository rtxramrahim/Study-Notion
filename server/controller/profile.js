const Profile = require('../models/profile')
const User = require('../models/user')
const Courses = require('../models/course')
const imageUploadToCloudinary = require('../util/imageUploader')
const CourseProgress = require("../models/courseProgress")
const user = require('../models/user')
exports.updateProfile = async(req,res)=>{
    try{
        const {gender ,dateOfBirth , bio , phoneNumber} = req.body
        const userId = req.user.userId
    const userDetails = await User.findById(userId)
    console.log("user id found : ", userDetails)
    const profileId = userDetails.additionalDetails
    console.log("profile details found : ", profileId)
    const profileDetails = await Profile.findById(profileId)
    if(!profileDetails){
        return res.status(401).json({
            success : false,
            message : "profile details not found"
        })
    }
    if(gender!==undefined){
        profileDetails.gender = gender
    }
    if(dateOfBirth!==undefined){
        profileDetails.dateOfBirth = dateOfBirth
    }
    // update profile
    if(bio!==undefined){
        profileDetails.bio = bio
    }
    if(phoneNumber!==undefined){
        profileDetails.phoneNumber = phoneNumber
    }
    await profileDetails.save()
    const updatedUser = await User.findById(userId).populate("additionalDetails")
    return res.status(200).json({
        success : true,
        message : "profile updated successfully",
        updatedProfile : profileDetails,
        user : updatedUser
    })
    }catch(err){
      return res.status(500).json({
            success : false,
            message : "profile Details not updated",
        
        })
    }
}

exports.deleteProfile = async(req,res)=>{
   try{
    const userId = req.user.userId
    const courses = req.user.courses
    const additionalDetails = req.user.additionalDetails
    console.log(userId , courses , additionalDetails)
    const user = await User.findById(userId)

    if(!user){
      return  res.status(400).json({
            success : false,
            message : "user not found"
        })
    }
    const findprofile = await Profile.findByIdAndDelete({_id : additionalDetails})
    if(!findprofile){
      return res.status(403).json({
            success : false,
            message : "user's profile id not found"
        })
    }
    
    // const deleteUserFromCourse =  await Courses.findByIdAndUpdate(courses,{
    //     $pull : {
    //         studentEnrolled : userId
    //     }
    // })
    // if(!deleteUserFromCourse){
    //     res.status(402).json({
    //         success : false,
    //         message  : "not able to delete user from enrolled course"
    //     })
    // }

    const deleteprofile = await User.findByIdAndDelete({ _id :  user._id})
    if(!deleteprofile){
        return res.status(401).json({
            success : false,
            message : "not able to delete profile"
        })
    }
   
    return res.status(200).json({
        success : false,
        message : "User  deleted successfully"
    })
   }catch(err){
    res.status(500).json({
        success : false,
        message : "not able to delete profile"
    })
   }
}


exports.updateProfilePicture = async(req,res)=>{
    try{
    const imageFile = req.files.file
    
    const userId = req.user.userId
    console.log("12345")
    if(!imageFile){
        return res.json({
            success : false,
            message : "image file not found"
        })
    }
    const imageUpload = await imageUploadToCloudinary(imageFile,process.env.CLOUDINARY_ASSETS_FOLDER)
    if(!imageUpload){
       return res.json({
            success : false,
            message : "not abel to upload image , please try again later"
        })
    }
    console.log("image uploaded to cloudinary")
    const updateProfile = await User.findByIdAndUpdate({_id : userId},{
        image : imageUpload.secure_url
    },{new : true}).populate("additionalDetails")
    
    if(!updateProfile){
       return res.json({
            success : false,
            message : "not able to update profile"
        })
    }
    
    return res.status(200).json({
        success : true,
        message : "image uplodaed successfully",
        url : imageUpload.secure_url ,
        updatedProfile : updateProfile
    })
    }catch(err){
        res.status(500).json({
            success :false,
            message : "something went wrong while uploading the image"
        })
    }

}

// get enrolled courses
exports.getEnrolledCourse = async(req,res)=>{
    try{
        const userId = req.user.userId
        const userDetails = await User.findById({_id : userId}).populate({
            
                path : "courses",
                populate : {
                    path : "courseContent",
                    populate : {
                        path : "subSection"
                    }
                }
            
        }).exec()
        // userDetails = userDetails.toObject()
        // var SubsectionLength = 0
        // for (var i = 0; i < userDetails.courses.length; i++) {
        //   let totalDurationInSeconds = 0
        //   SubsectionLength = 0
        //   for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        //     totalDurationInSeconds += userDetails.courses[i].courseContent[
        //       j
        //     ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        //     userDetails.courses[i].totalDuration = convertSecondsToDuration(
        //       totalDurationInSeconds
        //     )
        //     SubsectionLength +=
        //       userDetails.courses[i].courseContent[j].subSection.length
        //   }
        //   let courseProgressCount = await CourseProgress.findOne({
        //     courseId: userDetails.courses[i]._id,
        //     userId: userId,
        //   })
        //   courseProgressCount = courseProgressCount?.completedVideos.length
        //   if (SubsectionLength === 0) {
        //     userDetails.courses[i].progressPercentage = 100
        //   } else {
        //     // To make it up to 2 decimal point
        //     const multiplier = Math.pow(10, 2)
        //     userDetails.courses[i].progressPercentage =
        //       Math.round(
        //         (courseProgressCount / SubsectionLength) * 100 * multiplier
        //       ) / multiplier
        //   }
        // }
        if(!userDetails){
           return res.status(403).json({
                success : false,
                message : "not able to get user courses"
            })
        }
        return res.status(200).json({
            success : true,
            message : "courses fetched successfully",
            courses : userDetails.courses,
            data : "courses fethced successfully , it is a demo response as courses is not enrolled"
        })
    }catch(err){
       return res.status(500).json({
            success : false,
            message : "not able to fetch data due to internal server error"
        })
    }
}
// get all user details
exports.getAllUserDetails = async(req,res)=>{
    try{
        const userId = req.user.userId

        const getAllDetails = await User.findById({_id : userId}).populate("additionalDetails").exec()
        if(!getAllDetails){
        return res.status(404).json({
            success : false,
            message : "not able to fetch datat"
        })
        
        }
       return res.status(200).json({
            success : true,
            message : "data fetched successfully",
            details : getAllDetails

        })
    
    }catch(err){
        res.status(500).json({
            success : false,
            message : "something went wrong"
        })
    }
}

