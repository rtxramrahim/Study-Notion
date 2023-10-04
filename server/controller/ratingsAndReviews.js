const ratingsAndReviews = require("../models/ratingsAndReviews")
const Course = require("../models/course")
const User = require("../models/user") 
const mongoose = require('mongoose')
exports.createRatingAndReviews = async(req,res)=>{
    try{
        const userId = req.user.userId
        const { courseId , rating , reviews} = req.body
        if(!courseId){
            return res.json({
                success : false,
                message : "course is not valid"
            })
        }
        // check if user is enrolled or not
        const courseDetails = await Course.findOne({
            _id : courseId ,
            
        })
        if(!courseDetails){
           return res.json({
                success : false,
                message : "user is not enrolled in this course"
            })
        }
        //  check if user is already reviewed the course
        const alreadyReviewed = await ratingsAndReviews.findOne({ 
            userId : userId ,
            course : courseId
        })
        if(alreadyReviewed){
           return res.json({
                success : true,
                message : "Course is Already Reviewed!"
            })
        }
        
        // create ratings in db
        const ratingAndReviews = await ratingsAndReviews.create({
            rating : rating,
            reviews : reviews,
            course : courseId,
            userId : userId
        })
        if(!ratingAndReviews){
            res.json({
                success : false,
                message : "not able to create raing and review"
            })
        }
        // update ratings in course
        await Course.findByIdAndUpdate(courseId,{
            $push : {
                ratingAndReviews : ratingAndReviews._id
            }
        },{new : true}).populate("ratingAndReviews").exec()
        // updating ratings in user
        await User.findByIdAndUpdate(userId,{
            $push : {
                ratingsAndReviews : ratingAndReviews._id
            }
        },{new : true}).populate("ratingsAndReviews").exec().catch(()=>{
            res.status(500).json({
                success : false,
                message : "not able to update ratings in user"
                
            })
        })
        return res.status(200).json({
            success : true,
            message : "Review Added!",
            ratingAndReview : ratingAndReviews
        })  
    }
    catch(err){
        res.status(500).json({
            success :false,
            message : err.message
        })
    }
}

// get Average Ratings
exports.getAverageRating = async(req,res)=>{
   try{
    const courseId =  req.body
   
   const avgRating = await ratingsAndReviews.aggregate([
    {
        $match : {
            course : new mongoose.Types.ObjectId(courseId)
        },
    },
    {
        $group : {
            _id : null,
            averageRating : { $avg : "$rating"  }
        }
    }
   ]) 
    
   if(!avgRating){
    res.json({
        success : false,
        message : "something went wrong while finding avg rating"
    })
   }
   if(avgRating.length > 0){
    res.status(200).json({
        success : true,
        response :avgRating[0].averageRating
       })
    }
    res.status(200).json({
        success : true,
        messsage : "average rating is 0 till now",
        averageRating : 0
    })
   }catch(err){
    res.status(500).json({
        success : false,
        message : "internal server error"
    })
   }
   
}

exports.getAllRatingsAndReviewsForCourse = async(req,res)=>{
    const courseId = req.body
    if(!courseId){
        res.json({
            success : false,
            message : "course not present"
        })
    }
   const getRating =  await ratingsAndReviews.find({course : courseId}).sort({rating  : "desc"})
                      populate({
                        path : "userId",
                        select : "firstname lastname email image"
                      }).populate(
                        {
                            path : "course",
                            select : "courseName"
                        }
                      ).exec().then(()=>
                      {
                        res.status(200).json({
                        success : true,
                        message : getRating 
                        })
                      })
                      .catch((err)=>{
                            res.status(403).json({
                            success : false,
                            message : "something went wrong while fetching ratings",
                            err : err.message 
                            })
                      })
    
}

exports.getAllRatings = async(req,res)=>{
    try{
        const response = await ratingsAndReviews.find({}).populate({
            path : 'userId'
        }).populate({
            path : 'course'
        }).exec()
        if(!response){
            return res.status(404).json({
                success : false,
                message : "no ratings found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "ratings fetched succesfully!",
            data : response
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Erorr!"
        })
    }
}