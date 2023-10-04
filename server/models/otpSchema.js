const mongoose = require('mongoose')
const mailSender = require('../util/mailSender')
const otpTemplate = require('../mail/templates/emailVerificationTemplate')
const otpSchema = mongoose.Schema({
  email : {
    type : String,
    required : true
  },
  otp : {
    type : Number,
    required : true
  },
  createdAt : {
    type : Date,
    default : Date.now(),
    OtpexpiresIn : Date.now() + 600000
  }
})

// a function to send mail 
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email from StudyNotion",otpTemplate(otp))
        console.log("response from otp mail ", mailResponse)
    }catch(err){
        console.log("error occured in sending email : from otpSchema", err)
        throw err
    }
}
otpSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});
module.exports = mongoose.model("Otp",otpSchema)  
