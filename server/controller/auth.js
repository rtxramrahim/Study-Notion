const User = require('../models/user')
const Profile = require('../models/profile')
const Otp = require('../models/otpSchema')
const otpGenerator = require('otp-generator')
const mailSender = require('../util/mailSender')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passwordUpdate = require('../mail/templates/passwordUpdate')
const { emit } = require('nodemon')
require('dotenv').config()


// send otp
exports.sendOtp = async(req,res)=>{
    try{
        const {email} = req.body
        if(!email){
           return res.status(404).json({
                success : false,
                message : "email not found"
            })
        }
    const checkUser = await User.findOne({email})
    if(checkUser){
       return res.status(401).json({
            success : false,
            message  : "user already exists"
        })
    }
    // genrate otp
    var otp = otpGenerator.generate(6,{
        lowerCaseAlphabets : false,
        upperCaseAlphabets : false,
        specialChars : false
    })
    console.log("generated otp : ",otp)
    let result = await Otp.findOne({otp : otp})
    console.log("result : " , result)
    // bekar code
    while(result){
        otp = otpGenerator.generate(6,{
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false,
            specialChars : false
        })
        result = await Otp.findOne({otp:otp})
    }
    console.log("yaha tak chal gaya")
    
    // create an entry in db
    const otpBody = await Otp.create({
        email , otp
    })
    console.log(otpBody)

    return res.status(200).json({
        success : true,
        message : "OTP sent successfully",
        otp : otp
    })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "error while generating otp"
        })
    }
}

// signup
exports.signup = async(req,res)=>{
   try{
    const {firstname, lastname , email , password , confirmPassword , accountType ,contactNumber , otp } = req.body
    console.log("otp " , otp)
    
    if(!firstname){
       return res.status(401).json({
            success : false,
            message : "enter firstname correctly"
        })
    }
    if(!lastname){
        return res.status(401).json({
            success : false,
            message : "enter last name correctly"
        })
    }
    if(!email){
        return res.status(401).json({
            success : false,
            message : "enter email correctly"
        })
    }
    if(!password){
        return res.status(401).json({
            success : false,
            message : "enter password correctly"
        })
    }
    if(!confirmPassword){
        return res.status(401).json({
            success : false,
            message : "enter comfirm password correctly"
        })
    }
    if(!accountType || !contactNumber){
        return res.status(401).json({
            success : false,
           message : "enter accountType correctly"
        })
    }
    if(!otp){
        return res.status(401).json({
            success : false,
            message : "enter otp successfully"
        })
    }
    if(password !== confirmPassword){
        return res.status(400).json({
            success : false,
            message : "password do not match"
        })
    }
    // check if user exists or not
    const existingUser = await User.findOne({email})
    if(existingUser){
       return res.status(400).json({
            success : false,
            message : "user alreay exists , try login instead"
        })
    }
    // find most recent otp for the user
    const recentOtp = await Otp.findOne({email : email}).sort({createdAt : -1}).limit(1)
    console.log(recentOtp)
    // validate Otp
    if(recentOtp.length == 0){
        // OTP not found
       return res.status(400).json({
            success : false,
            message : "opt not found"
        })
    }
    if(recentOtp.OtpexpiresIn < Date.now()){
        return res.status(401).json({
            success : false,
            message : "otp expired , try with new otp"
        })
    }
    else if(recentOtp.otp != otp){
        return res.status(400).json({
            success : false,
            message : "invalid OTP , enter correct otp"
        })
    }
    // OTP is correct now hash password

    
    const hashedpassword = await bcrypt.hash(password , 10)
    if(!hashedpassword){
        return res.status(403).json({
            success : false,
            message : "not able to hash password"
        })
    }
   
    // creating profileDetails
    const profileDetails = await Profile.create({
        gender : null,
        dateOfBirth : null,
        bio : null,
        phoneNumber : contactNumber
    })
    if(!profileDetails){
        return res.status(401).json({
            success : false,
            message : "not able to create profile"
        })
    }
    const user = await User.create({
       firstname , lastname , email , password : hashedpassword , accType : accountType , additionalDetails : profileDetails._id ,
       image: `https://api.dicebear.com/5.x/initials/svg/seed=${firstname}%20${lastname}` 
    })
    if(!user){
       return res.json({
            success : false,
            message : "not able to create user"
        })
    }
    return res.status(200).json({
        success : true,
        message : "user registered successfully",
        user : user
        
    })
   }catch(err){
    return res.status(500).json({
        success : false,
        message : "not able to register user at the moment",
        err  : err.message
    })
    
   }

}

// login
exports.login = async(req,res)=>{
   try{
    const {email , password }= req.body
    if(!email || !password){
      return  res.status(403).json({
            message : "enter all details"
        })
    }
    const existUser = await User.findOne({email}).populate("additionalDetails")
    if(!existUser){
       return res.status(401).json({
            success : false,
            message : "User is not registered , Please signup"
        })
    }
    const payload = {
        firstname : existUser.firstname,
        lastname : existUser.lastname,
        email : existUser.email,
        accType : existUser.accType,
        additionalDetails : existUser.additionalDetails,
        password : existUser.password,
        courses : existUser.courses,
        image : existUser.image,
        courseProgress : existUser.courseProgress,
        userId : existUser._id
    }
    console.log(payload)
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
//    if(!await bcrypt.compare(password , existUser.password)){
//        return res.status(401).json({
//             success : false,
//             message : "passwords do not match"
//         })
//    }
    const checkPass = await bcrypt.compare(password , existUser.password)
    console.log("password check : ",checkPass)
    if(!checkPass){
    return res.status(403).json({
            success : false,
            message : "passwords do not match"
        })
    }
   else{
        const token =  jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn : "2hr"
        })
        console.log("token : ", token )
        // existUser.token = token 
        // existUser.password = undefined
        console.log("token created : sending via cookie")
        return res.cookie("token",token,options).json({
            success : true,
            token,
            existUser,
            message : "Logged in successfully",
        })
        // res.status(200).json({
        //     success : true,
        //     message : `welcome ${email} , you have logged in successfully`,
        //     user : existUser,
        //     token : token
        // })
   }
   }catch(err){
    res.status(500).json({
        success : false,
        message : "login failure please try again later"
    })
   }
}

// changePassword

// code need to be reviewed
exports.changePassowrd = async(req,res)=>{
   try{
    const {email,oldPassword , newpassword , confirmPassword} = req.body
    const userId = req.user.userId
    const checkuser = await User.findById(userId)
    if(!checkuser){
       return res.json({
            success : false,
            message : "user not found"
        })
    }
    const checkpass = await bcrypt.compare(oldPassword , checkuser.password)
    if(!checkpass){
       return res.json({
            success : false,
            message : "please enter current password correctly"
        })
    }
    const name = 'user'
    
    if(oldPassword==newpassword){
       return res.json({
            success : false,
            message : "similar passwords"
        })
    }
    if(newpassword!=confirmPassword){
      return res.json({
            success : false,
            message : "passwords do not match"
        })
    }
    const hashedpassword = await bcrypt.hash(newpassword,10)
    console.log(hashedpassword)
    const updatePassword = await User.findByIdAndUpdate(userId,{
        password : hashedpassword
    })
    
    if(!updatePassword){
       return res.status(401).json({
            success : false,
            message : "not able to update user"
        })
    }
    return res.status(200).json({
        success : true,
         message : "Password changed successfully",
         
     })
   }
   catch(err){
    return  res.json({
        success : false,
        message : "something went wrong"
    })
   }
}