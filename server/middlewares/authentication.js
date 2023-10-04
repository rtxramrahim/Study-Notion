const jwt = require('jsonwebtoken')
require('dotenv').config()
// authentication
exports.auth = async(req,res,next)=>{
   try{
    const token =  req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer ","");
    if(!token){
       return res.status(401).json({
            success : false,
            message : "token is missing"
        })
    }
    // verify the token
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)
        req.user = decode
    }catch(err){
        console.log("token is not valid",err)
        return res.status().json({
            success : false,
            message : "token is not valid"
        })
    }
    next()
   }catch(err){
    res.status(500).json({
        success : "false",
        message : "error while validating the token"
    })
   }
}
exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accType!=="Student"){
           return res.status(401).json({
                success : false,
                message : "not authorised to access this route"
            })
        }
        // else{
        //      res.status(200).json({
        //         success : true,
        //         message : "Welocme to protected route for students"
        //     })
        // }
        next()
    }catch(err){
        res.status(500).json({
            success : false,
            message : "User role cannot be verified please try later"
        })
    }
}
exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accType!=="Admin"){
            return res.status(401).json({
                success : false,
                message : "Not authorised to access this route"
            })
        }
        // else{
        //     res.status(200).json({
        //         success : true,
        //         message : "Welocme to the protected route for Admin"
        //     })
        // }
        next()
    }catch(err){
        res.status(500).json({
            success : false,
            message : "User role cannot be verified please try later"
        })
    }
}
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accType!=="Instructor"){
            return res.status(401).json({
                success : false,
                message : "Not authorised to access this route"
            })
        }
        // else{
        //     res.status(200).json({
        //         success : true,
        //         message : "Welocome to the protected route for Instructors"
        //     })
        // }
        next()
    }catch(err){
        res.status(500).json({
            success : false,
            message : "User role cannot be verified please try later"
        })
    }
}