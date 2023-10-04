const mongoose = require('mongoose')

const ratingsAndReviewsSchema = mongoose.Schema({
    rating : {
        type : Number,
    
    },
    reviews : {
        type : String,
      
    },
    // do we req userId ????
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses"
    }
})
module.exports = mongoose.model("ratingsAndReviews",ratingsAndReviewsSchema)