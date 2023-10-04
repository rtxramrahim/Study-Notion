const mailSender = require('../util/mailSender')

exports.contactUS = async(req,res)=>{
    
   try{
    const {firstname , lastname , email } =req.body
    if(!email){
        res.status(404).json({
            success : false,
            message : "email details not found"
        })
    }
    const sendMailToUser = await mailSender(email , `StudyNotion : Do you need any help` , <h2>hello {firstname} {lastname} nice to see you`</h2>)
    if(!sendMailToUser){
        res.json({
            success : false,
            message : "not able to send mail to user"
        })
    }
    const sendMailToSupport = await mailSender(email , `Need assistance to the client`, <h2>checkout {email} , and see what we can do to them </h2>)
    if(!sendMailToSupport){
        res.status(403).json({
            success : false,
            message : "not able to send mail to support team"
        })
    }
   }catch(err){
    res.status(500).json({
        success : false,
        message : "internal server error"
    })
   }
}