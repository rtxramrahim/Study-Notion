const express = require('express')
const app = express()
const router = require('./routers/routes')
const dbConnect = require('./config/database')
const cloudinaryConect = require('./config/cloudinary')
require('dotenv').config()
const cookieParser = require("cookie-parser")
const fileUpload = require('express-fileupload')
const cors = require('cors')

const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
app.use("/api",router)
app.use("/",(req,res)=>{
    res.json({
        success : true,
        message : `app is up and successfully running at ${PORT}`
    })
})

app.listen(PORT,()=>{
    console.log(`app is running successfully on ${PORT}`)
})

dbConnect()
cloudinaryConect()