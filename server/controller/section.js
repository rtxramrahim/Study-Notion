const Section = require('../models/section')
const Courses = require('../models/course')
const subSection = require('../models/subSection')
exports.createSection = async(req,res)=>{
    try{
        const {sectionName,courseId} = req.body
    if(!sectionName || !courseId){
       return res.json({
            success : false,
            message : "not able to create section"
        })
    }
    const newSection = await Section.create({sectionName})
    // .populate("subSection");
    if(!newSection){
        return res.json({
            success : false,
            message : "not able to create section"
        })
    }
    
    // update course with section object id
    const updateCouseDetails = await Courses.findByIdAndUpdate({_id : courseId},{
        $push : {
            courseContent : newSection._id
        }
    },{new : true}).populate("courseContent").exec()
    if(!updateCouseDetails){
        return res.json({
            success : false,
            message : "not able to update Course Details"
        })
    }
    return res.status(200).json({
        success : true,
        message : "section added to course successfully",
        section : updateCouseDetails
    })
    }catch(err){
        res.json({
            success : false,
            message : "something went wrong while creating section"
        })
    }
}
exports.updateSection = async(req,res)=>{
    try{
        const {sectionName,sectionId , courseId} = req.body
        if(!sectionName || !sectionId){
           return res.json({
                success : false,
                message : "section details not found"
            })
        }
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            sectionName : sectionName
        },{new : true})
        const updatedCourseDetails = await Courses.findById(courseId).populate({
            path : 'courseContent',
                populate : {
                    path : 'subSection'
                }
           
        })
        if(!updatedCourseDetails){
            return res.json({
                success : false,
                message : "you have written wrong query"
            })
        }
        return res.json({
            success : true,
            message : "course details fetched successfully",
            section : updatedCourseDetails
        })

    }catch(err){
       return res.json({
            success : false,
            message : "something went wrong while update section"
        })
    }
}
exports.deleteSection = async(req,res)=>{
   try{
    // is courseID req .???? 
    
    const {sectionId , courseId} = req.body
    if(!sectionId || !courseId){
        return res.json({
            success :false,
            message : "mising details"
        })
    }
    const deleteSection =  await Section.findByIdAndDelete(sectionId)
    if(!deleteSection){
       return res.json({
            success : false,
            message : "not able to delete section"
        })
    }
    // updating section in course
    const updatedCourse = await Courses.findByIdAndUpdate({_id : courseId},{
        $pull : {
            courseContent : sectionId
        }
    }).populate({
        path : 'courseContent',
            populate : {
                path : 'subSection'
            }
       
    })
    if(!updatedCourse){
       return res.json({
            success : false,
            message : "not able to update course"
        })
    }
    return res.status(200).json({
        success : true,
        message : "section deleted succesfully",
        updatedCourse : updatedCourse
    })
   }
   catch(err){
    return res.json({
        success : false,
        message : "something went wrong while deleting section"
    })
}
}
