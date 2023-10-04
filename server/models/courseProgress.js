const mongoose = require('mongoose')
const progressSchema = mongoose.Schema({
  courseId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Courses"
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  completedVideos : [  {
      type : mongoose.Schema.Types.ObjectId,
      ref : "subSection"
  }  ],

})
module.exports = mongoose.model("courseProgress",progressSchema)