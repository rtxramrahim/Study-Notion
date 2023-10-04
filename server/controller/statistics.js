const Courses = require('../models/course')
const User = require('../models/user')

exports.instructorDashboard = async(req,res)=>{
    try{
      
        const userDetails = await User.findById(req.user.userId)
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "user not found"
            })
        }
        const courseDetails = await Courses.find({instructor : req.user.userId})
        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "course not found"
            })
        }
        const courseData = courseDetails?.map((course)=>{
            const totalStudents = course?.studentEnrolled?.length
            const totalAmountGenerated = totalStudents * course?.price

            const courseStatsData = {
                _id : course._id,
                courseName : course.courseName,
                courseDesc : course.courseDesc,
                totalStudents,
                totalAmountGenerated
            }
            return courseStatsData
        })

        return res.status(200).json({
            success : true,
            stats : courseData,
            user : userDetails,
            courses : courseDetails
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}