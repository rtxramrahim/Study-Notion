const mongoose = require('mongoose')
require('dotenv').config()
const dbConnect = async()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true ,
        useUnifiedTopology : true
    }).then(()=>{
        console.log("db connection established")
    }).catch((err)=>{
        console.log("not able to connect with db")
        console.log(err)
})
}
module.exports = dbConnect