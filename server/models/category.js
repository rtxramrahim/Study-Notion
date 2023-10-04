const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    desc : {
        type : String
    },
    courses : [{
        type : mongoose.Types.ObjectId,
        ref : "Courses"
    }]
})
module.exports = mongoose.model("Category" , categorySchema)