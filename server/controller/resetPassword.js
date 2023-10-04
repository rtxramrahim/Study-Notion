const User = require('../models/user')
const bcrypt = require('bcrypt')
const mailSender = require('../util/mailSender')
const passwordUpdate = require('../mail/templates/passwordUpdate')

exports.resetPassword = async(req,res)=>{
    try{
        // data fetch
    const {password,confirmpassword,token} = req.body
    
   
    
    // validation
    if(password !== confirmpassword){
        return res.json({
            success : false,
            message : "Password do not match"
        })
    }
    // get userDetails from db using token
    const userDetails = await User.findOne({token : token})
    // if no entry
    if(!userDetails){
      return res.json({
            success : false,
            message : "token invalid"
        })
    }
    // token time check
    if(userDetails.resetPasswordExpIn < Date.now()){
       return res.json({
            success : false,
            message : "token is expired , please regenerate your token"
        })

    }
    // hashpasssword
    const hashpassword = await bcrypt.hash(password , 10)
    console.log("hashing new password : ", hashpassword)
    // password and update
    const updateUser =  await User.findOneAndUpdate({ token : token},{
        password : hashpassword
    },{new:true})
    
    if(!updateUser){
        return res.json({
            success : false,
            message : "not able to update user"
        })
    }
    
    // return response
    return res.status(200).json({
        success : true,
        message : "password reset successfully"
    })
    }catch(err){
       return res.status(500).json({
            success : false,
            message : "not able to reset password at the moment"
        })
    }
}