const mongoose = require('mongoose')
const category = require('./category')
const courseSchema = mongoose.Schema({
  courseName : {
    type : String,
    required : true,
  },
  courseDesc : {
    type : String,
    required : true
  },
  instructor : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  whatYouWillLearn : {
    type : String ,
    required : true,
  },
  ratingAndReviews : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ratingsAndReviews"
      }
  ],
  price : {
    type : Number,
    required : true,
  },
  courseContent :[
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Section"
      }
  ],
  thumbnail : {
    type : String
  },
  category : {
    type : mongoose.Types.ObjectId,
    ref : "Category"
  },
  tag : {
    type : [String],
    required : true
    
  },
  instructions : {
    type : [String],
    required : true
  },
  status : {
    type : String,
    enum :["Draft" , "Published"]
  },
  studentEnrolled : [{
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "User"
  }],
  courseProgress : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "subSection"
    }
  ]
})
module.exports = mongoose.model("Courses",courseSchema)  