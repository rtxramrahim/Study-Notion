const mongoose = require('mongoose')
const sectionSchema = mongoose.Schema({
  sectionName : {
    type : String
  },
  subSection : [
    {
        type : mongoose.Schema.Types.ObjectId,
     
        ref : "subSection"
      }
  ]
})
module.exports = mongoose.model("Section",sectionSchema)  