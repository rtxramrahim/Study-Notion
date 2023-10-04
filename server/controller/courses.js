const Courses = require("../models/course")
const imageUploadToCloudinary = require('../util/imageUploader')
const Category = require("../models/category")
const User = require('../models/user')

require('dotenv').config()
exports.createCourse = async(req,res)=>{
    try{
        // fetch data 
    
    const {courseName , courseDesc , category , price , tag , whatYouWillLearn , instructions } = req.body
    if(!courseName || !courseDesc || !category || !price || !tag || !whatYouWillLearn || !instructions){
        return res.status(404).json({
            success : false,
            message : "details not found"
        })
    }
    console.log("details fetched")
    const image = req.files.image
    // fetch validation
    console.log("image fetched")
    if(!image){
        res.status(404).json({
            success : false,
            message : "thumbnail image not found"
        })
    }
    // validate instructor
    const checkInstructor = await User.findById({_id : req.user.userId})
    if(!checkInstructor){
        return res.status(404).json({
            success :false,
            message : "instructor not found"
        })
    }
    // // validate category
    const checkCategory = await Category.findById({_id : category})
    if(!checkCategory){
        return res.status(404).json({
            success : false,
            message : "category not found"
        })
    }
    // upload image
    const uploadImage = await imageUploadToCloudinary(image,process.env.CLOUDINARY_ASSETS_FOLDER)
    if(!uploadImage){
        return res.json({
            success : false,
            message : "not able to upload image "
        })
    }
    // create entry in db
    const createCourse = await Courses.create({
        courseName,
        courseDesc,
        tag : tag,
        instructions, 
        price ,
        whatYouWillLearn,
        instructor : checkInstructor._id,
        category : checkCategory._id,
        
        thumbnail : uploadImage.secure_url
    })
    if(!createCourse){
        return res.json({
            success : false,
            message : "not able to create course"
        })
    }
    // update instructor
    const updateInstructor = await User.findByIdAndUpdate({_id : req.user.userId},
        {
            $push : {
                courses : createCourse._id
            }
        })
    if(!updateInstructor){
        return res.json({
            success : false,
            message : "not able to update instructor"
        })
    }
    // update category
    const updateCategory = await Category.findByIdAndUpdate({_id : category},
        {
            $push : {
                courses : createCourse._id
            }
        }
    )
    if(!updateCategory){
        return res.json({
            success : false,
            message : "not able to update category"
        })
    }
   return res.status(200).json({
        success : true,
        message : "Congratulations !! , course created successfully",
        createdCourse : createCourse
    })  
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "internal server error"
        })
    }

}
exports.getAllCourse = async(req,res)=>{
    try{
        const {category} = req.body
        if(!category){
            res.status(404).json({
                success : false,
                message : "tag not found"
            })
        }
        const findCourse = await Category.find({name : category}).populate("courses").exec()
        if(!findCourse){
            res.status(404).json({
                success : false,
                message : "course not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "course fetched successfully",
            data : findCourse
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : "something went wrong while fetching the courses for selected tag"
        })
    }
}
exports.getCourseDetails = async(req,res)=>{
    try{
        const {courseId} = req.body
        if(!courseId){
            return res.status(404).json({
                success : false,
                message : "courseId not found"
            })
        }
        const getDetails = await Courses.findById({_id : courseId})
        .populate({
            path : "instructor",
            populate : {
                path : "additionalDetails"
            },
        }).
        populate("category").
        // populate("ratingsAndReviews").
        populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        }).exec()
        if(!getDetails){
        return res.status(400).json({
                success : false,
                message : `could not find course with ${courseId}`
            })
        }
        // await Courses.findByIdAndUpdate({_id : courseId},{
        //     $push : {
        //         studentEnrolled : userId
        //     }
        // })
        return res.status(200).json({
            success : true,
            message : "course details are fetched successfully",
            data : getDetails
        })       

    }catch(err){
        res.status(500).json({
            success : false,
            message : "something went wrong while fetching course details"
        })
    }
}
exports.updateCourse = async(req,res)=>{
    try{
        const {courseName , courseDesc , category , price , tag , whatYouWillLearn , instructions , courseId ,status} = req.body
    
    // update course
    const updatedCourse = await Courses.findByIdAndUpdate({_id : courseId})
    
    if(req.files && req.files.image!=undefined){
        const image = req.files.image
        const uploadImage = await imageUploadToCloudinary(image,process.env.CLOUDINARY_ASSETS_FOLDER)
        
        if(!uploadImage){
            return res.json({
                success : false,
                message : "not able to upload image "
            })
        }
        updatedCourse.thumbnail = uploadImage.secure_url
    }
    if(courseName!=undefined){
        updatedCourse.courseName = courseName
    }
    if(courseDesc!=undefined){
        updatedCourse.courseDesc = courseDesc
    }
    if(category!=undefined){
        updatedCourse.category = category
    }
    if(price!=undefined){
        updatedCourse.price = price
    }
    if(tag!=undefined){
        updatedCourse.courseName = courseName
    }
    if(whatYouWillLearn!=undefined){
        updatedCourse.whatYouWillLearn = whatYouWillLearn
    }
    if(instructions!=undefined){
        updatedCourse.instructions = instructions
    }
    if(status!=undefined){
        updatedCourse.status = status
    }
    await updatedCourse.save()
    const newupdatedCourse = await Courses.findById(courseId).populate({
        path : 'courseContent',
            populate : {
                path : 'subSection'
            }
    })
    if(!newupdatedCourse){
        return res.status(400).json({
            success : false,
            message : "not able to update course"
        })
    }
    return res.status(200).json({
        success : true,
        message : "course updated succesfully",
        updatedCourse : newupdatedCourse
    })
    }catch(err){
        return res.status(500).json({
            success : false,
            message  : err.message
            
        })
    }
}
exports.getAllCoursePublished = async(req,res)=>{
    try{
        const userId = req.body
        if(!userId){
            return res.status(404).json({
                success : false,
                message : "user id not found"
            })
        }
        const findAllCourses = await Courses.find(userId ).populate(
            {
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }
        ).sort({createdAt : -1})
        if(!findAllCourses){
        return res.status(404).json({
            success : false,
            message : "Courses not found"
        })
        }
        return res.status(200).json({
        success : true,
        message : "courses fetched successfully",
        courses : findAllCourses
        }) 
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "not able to fetch courses",
            err : err.message
        })
    }
}
exports.deleteCourse = async(req,res)=>{
    try{
        const {userId , courseId , categoryId} = req.body
        if(!userId ){
            return res.status(404).json({
                success: false,
                message : "userId not found"
            })
        }
        if(!courseId){
            return res.status(404).json({
                success : false,
                message : "courseId not found"
            })
        }
        const user = await User.findByIdAndUpdate( userId, {
            $pull : {
                courses : courseId
            }
        })
        if(!user){
            return res.status(401).json({
                success : false,
                message : "not able to delete course from the user profile"
            })
        }
        const removeFromCategory = await Category.findByIdAndUpdate(categoryId , {
            $pull : {
                courses : {
                    courseId
                }
            }
        })
        if(!removeFromCategory){
            res.status(403).json({
                success : false,
                message : "not able to delete course from category"
            })
        }
        const deleteCourse = await Courses.findByIdAndDelete(courseId)
        if(!deleteCourse){
            return res.status(401).json({
                success : false,
                message : "not able to delete course from course schema"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Course Deleted Successfully!"
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong on the way"
        })
    }
}
exports.deleteAllCourses = async(req,res)=>{
    try{
        const {userId} = req.body
        if(!userId){
        return res.status(404).json({
            success : false,
            message : "userId not found"
        })
        }
        const RemoveCoursesFromUser = await User.findByIdAndUpdate({userId},{
            courses : []
        }) 
        const deleteCourse = await Courses.findAndDelete({},{instructor :  userId})
        if(!deleteCourse){
        return res.status(401).json({
            success :false,
            message : "not able to delete course"
        })
        }
    }catch(err){
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
    }
}