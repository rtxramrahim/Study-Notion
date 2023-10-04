const subSection = require('../models/subSection')
const Section = require('../models/section')
const Course = require('../models/course')
const imageUploadToCloudinary = require('../util/imageUploader')
require('dotenv').config()
// create subsection 
exports.createsubSection = async(req,res)=>{
    try{
        // fectch data from body
    const {title , description ,  sectionId , courseId} = req.body
    // extract file/video
    const videoFile = req.files.video
    if(!videoFile){
      return res.status(404).json({
            success : false,
            message : "video file missing"
        })
    }
    if(!title || !description  || !sectionId){
        return res.json({
             success : false,
             message : "all fields are require"
         })
     }
  
    console.log("validation done")
    // valdation
    // if(!videoFile){
    //    return res.json({
    //         success : false,
    //         message : "video file not found"
    //     })
    // }
    // upload video to cloudinary
    const uploadVideoToCloudinary = await imageUploadToCloudinary(videoFile,process.env.CLOUDINARY_ASSETS_FOLDER)
    if(!uploadVideoToCloudinary){
       return res.json({
            success : false,
            message : "error while uploading video"
        })
    }
    console.log("image uploaded")
    // create a sub section
    const createsubSection = await subSection.create({
        title : title, description : description , duration : `${uploadVideoToCloudinary.duration}` ,
        videoUrl : uploadVideoToCloudinary.secure_url
    })
    if(!createsubSection){
        return res.json({
            success : false,
            message : "Not able to  create subSection"
        })
    }
    console.log("subsection created")
    // push subSection in section
    const updateSection =  await Section.findByIdAndUpdate({_id : sectionId},{
        $push : {
            subSection : createsubSection._id
        }
    },{new : true}).populate("subSection").exec()
    if(!updateSection){
        return res.json({
            success : false,
            message : "not able toc update section"
        })
    }
    console.log("section updated")
    const updatedCourse = await Course.findById({_id : courseId}).populate({
        path : 'courseContent',
            populate : {
                path : 'subSection'
            }
    }).exec()
    return res.json({
        success :true,
        message : "subSection created ,Section updated successfully",
    
        updatedCourse : updatedCourse
    })
    }catch(err){
      return res.json({
            success : false,
            message : "not abel to create subSection"
        })
    }
}
exports.updatesubSection = async(req,res)=>{
   try{
    const{title , description ,subSectionId , sectionId} = req.body
    console.log("uper hi hug diyya")
    // const {subsectionId} = req.params 
   const findsubSection = await subSection.findById({_id : subSectionId})
   if(!findsubSection){
    return res.json({
        success :false,
        message : " not able to find subsection"
    })
   }
   console.log("subsection created")
    if(title!=undefined){
       findsubSection.title = title 
    }
    if(description!=undefined){
        findsubSection.description = description
    }
   if(req.files && req.files.video != undefined){
        const video = req.files.video
        const uploadVideo = await imageUploadToCloudinary(video , process.env.CLOUDINARY_ASSETS_FOLDER)
        if(!uploadVideo){
            return res.status(403).json({
                success : false,
                message : "not able to upload video"
            })
        }
        findsubSection.videoUrl = uploadVideo.secure_url
   }
   console.log("working fine")
    try{
      await findsubSection.save().
      console.log("hug diya")
    }catch(err){
        console.log(err)
    }
    const updatedSection = await Section.findById(sectionId).populate("subSection").exec()
    return res.status(200).json({
        success : true,
        message : "subSection updated successfully",
        updatedSection : updatedSection
    })
   }catch(err){
    res.json({
        success : false,
        message  : "something went wrong while updating subSection"
    })
   }
}
    
    
exports.deletesubSection = async(req,res)=>{
    try{
    const {subSectionId,sectionId} = req.body
    console.log("uparhug diya")
    if(!subSectionId || !sectionId){
        return res.json({
            success : false,
            message :"not able to fetch data"
        })
    }
    console.log("thodi der bad hug diya")
    const updateSection = await Section.findByIdAndUpdate({_id : sectionId},{
        $pull : {
            subSection : subSectionId
        }
    })
    console.log("working fine")
    if(!updateSection){
        return res.status(401).json({
            success : false,
            message : "not able to update section"
        })
    }
    console.log("still working fine")
    const deleteSection = await subSection.findByIdAndDelete(subSectionId)
    console.log("not workgin fine")
    if(!deleteSection){
        return res.json({
            success : false,
            message : "not able to delete subSection"
            
        })
    }
    const newSection  = await Section.findById(sectionId).populate("subSection")
    
    return res.status(200).json({
        success : true,
        message : "subsection deleted succcessfully",
        updatedSection : newSection
    })
    }catch(err){
       return res.json({
            success :false,
            message : "somwthing went wrong while deleting the subsection"
        })
    }
}
