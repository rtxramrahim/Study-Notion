const mailSender = require('../util/mailSender')
const contactFormRes = require('../mail/templates/contactFormRes')
exports.contactUsMail = async(req,res)=>{
    try{ 
        const { email,firstname , lastname , message , phoneNumber } = req.body
        if(!firstname || !lastname || !message || !phoneNumber || !email){
            return res.status(404).json({
                success : false,
                message : "details not found"
            })
        }
        
        const sendMail = await mailSender(email , "StudyNotion : We have got your message" , contactFormRes(email , firstname , lastname , message , phoneNumber) ) 
        if(!sendMail){
            return res.status(401).json({
                success : false,
                message : "support service failed"
            })
        }
        return res.status(200).json({
            success : true,
            message : "sent"
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : err.message
        })
    }
}