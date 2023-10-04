const mongoose = require('mongoose')
const profileSchema = mongoose.Schema({
    gender : {
        type : String
    },
    dateOfBirth : {
        type : String
    },
    bio : {
        type : String,
    },
    phoneNumber : {
        type : Number,
        trim : true 
    }
})
module.exports = mongoose.model("Profile",profileSchema)