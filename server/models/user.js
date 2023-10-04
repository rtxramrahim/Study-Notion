const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        trim : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String ,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    accType : {
        type : String ,
        enum : ["Student" , "Admin" , "Instructor"],
        require : true
    },
    // additional details
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Profile"
    },
    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Courses",
        }
    ],
    token : {
        type : String
    },
    ratingsAndReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "ratingsAndReviews"
        }
    ]
    ,
    resetPasswordExpIn :{
        type : Date
    },
   
    courseProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "courseProgress"
        }
    ],
    image : {
        type : String
    }
})

module.exports = mongoose.model("User" , userSchema)