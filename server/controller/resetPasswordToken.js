const User = require('../models/user')
const mailSender = require("../util/mailSender")
const crypto = require('crypto')

exports.resetPasswordToken = async(req,res)=>{
    try{
        // get email from req body
    const {email} = req.body
    // check user for this email  , email validation
    const user = await User.findOne({email})
    if(!user){
       return res.json({
            success : false,
            message : "your email is not registered with us"
        })
    }

    // generatee token
    const token = crypto.randomUUID()
    console.log(token)
    // update user by adding token and expiration time
    const updateDetails = await User.findOneAndUpdate({email : email},
                                {   
                                    token : token,
                                    resetPasswordExpIn : Date.now() + 5*60*1000 
                                },{new:true })
    if(!updateDetails){
        return res.json({
            success : false,
            message : "not able to update user"

        })
    }                             
    // create url
    const url = `http://localhost:3000/reset_password/${token}`
    // send email containing the url
    const sendMail = await mailSender(email,"StudyNotion : Password reset StudyNotion",`Your Link for Password reset is : ${url} . It is valid for 5 mins`)
    if(!sendMail){
        return res.json({
            success : false,
            message : "not able to send mail"
        })
    }
    // return response 
    return res.status(200).json({
        success : true,
        message : "email for password change has been sent please check email",
        token : token
    })
    }catch(err){
        res.status(500).json({
            success : false,
            message : "something went wrong while reseting password"
        })
    }
}