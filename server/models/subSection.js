const mongoose = require('mongoose')
const subSectionSchema = mongoose.Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
    duration : {
        type : String
    },
    videoUrl : {
        type : String
    }
})
module.exports = mongoose.model("subSection",subSectionSchema)