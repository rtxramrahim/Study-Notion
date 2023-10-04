const Courses = require('../models/course')
const courseProgress = require('../models/courseProgress')
const User = require('../models/user')
const subSection = require('../models/subSection')

exports.updateCourseProgress = async(req,res)=>{
    try{
        const {courseId , subSectionId} = req.body
        const userId = req.user.userId
        const findsubSection = await subSection.findById(subSectionId)
        if(!findsubSection){
            return res.status(404).json({
                success : false,
                message : "SubSection not found"
            })
        }
        const findProgress = await courseProgress.findOne({
            userId : userId,
            courseId : courseId
        })
        if(!findProgress){
          return res.status(404).json({
                success : false,
                message : "courseProgress not found"
            })
        }
        else{
            if(findProgress.completedVideos.includes(subSectionId))
                return res.status(400).json({
                    success : false,
                    message : "Course section Already Included"
                })
            findProgress.completedVideos.push(subSectionId)   
            await findProgress.save()
            const updateCourse = await Courses.findByIdAndUpdate({_id : courseId},{
                $push : {
                    courseProgress : subSectionId
                }   
            })
            if(!updateCourse){
                return res.status(403).json({
                    success : false,
                    message : "not able to update course"
                })
            }
            return res.status(200).json({
                success : true,
                message : "course progress made successfull",
                courseProgress : findProgress
            })
        }
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
            
        })
    }
}

exports.getCourseProgress = async(req,res)=>{
    try{
        const {courseId} = req.body
        const userId = req.user.userId
    if(!courseId){
        return res.status(404).json({
            success : false,
            message : "courseId not found"
        })
    }
    const progress = await courseProgress.findOne({
        courseId : courseId,
        userId : userId
    })
    if(!progress){
        return res.status(404).json({
            success : false,
            message : "course progress not found"
        })
    }
    return res.status(200).json({
        success :true,
        message : "course progress fetched successfully",
        data : progress
    })
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Internal Server Error",
            err : err.message
        })
    }
}
   