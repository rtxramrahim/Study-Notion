const {instance} = require("../util/razorpay")
const Course = require("../models/course")
const User = require("../models/user")
const mailSender = require("../util/mailSender")
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail")
const mongoose = require('mongoose')
const crypto = require('crypto')
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail')
const courseProgress = require("../models/courseProgress")


// it was for single item using webhook
// exports.capturePayment = async(req,res)=>{
//     // get course and user id
//     const {courseId} =  req.body
//     const userId = req.user.userId

//     // check validation
//     if(!courseId){
//         res.json({
//             success : false,
//             message : "not valid course id"
//         })
//     }
//     let course
//     try{
//          course = await Course.findById({courseId})
//     if(!course){
//         res.json({
//             success : false,
//             message : "Could not find the course"
//         })
//     }
//     // user already pay for the same course
//     const uid = new mongoose.Types.ObjectId(userId)
//     if(course.studentEnrolled.includes(uid)){
//         res.json({
//             success : false,
//             message : "student already enrolled"
//         })
//     }
//     }catch(err){
//         res.status(500).json({
//             success : false,
//             message : err.message 
//         })
//     }
//     // order create 
//     const amount = course.price
//     const currency = "INR"
//     const options = {
//         amount : amount * 100,
//         currency : currency,
       

//         notes : {
//             courseId : courseId,
//             userId : userId
//         }
//     }
//     try{
//         // initiate payment
//         const paymentResponse = await instance.orders.create(options)
//         console.log(paymentResponse)
//         // resturn response
//         res.status(200).json({
//             success : true,
//             courseName : course.courseName,
//             courseDescription : course.courseDesc,
//             thumbnail : course.thumbnail,
//             orderID : paymentResponse.id,
//             currency : paymentResponse.currency,
//             amount : paymentResponse.amount
//         })
//     }catch(err){
//         console.log(error)
//         res.json({
//             success : false,
//             message : "Could not initiate order",

//         })
//     }
    
// }


// exports.verifySignature = async(req,res)=>{
//       const webhooksecret = "12345"
      
//       const signature = req.headers["x-razorpay-signature"]
      
//       const shasum = crypto.createHmac("sha256",webhooksecret)
//       shasum.update(JSON.stringify(req.body))
//       const digest = shasum.digest("hexa")

//       if(signature === digest){
//         console.log("Payment is Authorised")
//         //   now payment is authorised
//         // req is coming from razorpay
//         const {userId , courseId} = req.body.payload.payment.entity.notes
//         try{
//             // find the course and enroll the student in it
//             const enrollCourse = await Course.findOneAndUpdate(courseId,{
//                 $push : {
//                     studentEnrolled : userId
//                 }
//             },{new : true})
//             if(!enrollCourse){
//                 res.status(500).json({
//                     success : false,
//                     message : "course not found"
//                 })
//             }
//             console.log(enrollCourse)
//         // find the student and add course to their list of enrolled courses
//             const enrolledStudent = await User.findOneAndUpdate(userId,{
//                 $push : {
//                     courses : courseId
//                 }
//             })
//             if(!enrolledStudent){
//                 res.status(500).json({
//                     success : false,
//                     message : "user not found"
//                 })
//             }
//             // send message 
//             const emailResponse = await mailSender(enrolledStudent.email,"congratulation :  from studynotion",
//             "Congratulation for buying course from studynotion")

//             console.log(emailResponse)

//             // return res
//             res.status(200).json({
//                 success : true,
//                 message : "Signature verified and Course Added"
//             })
//         }catch(err){
//             console.log(err)
//             res.status(500).json({
//                 success : false,
//                 message : err.message
//             })
//         }
//     }
//     res.status(400).json({
//         success : false,
//         message : 'Invalid request'
//     })

    

// }

// for multiple items see doc for more info

exports.capturePayment = async(req,res) =>{
    const {courses} = req.body
    const userId = req.user.userId

    if(courses.length === 0){
        return res.status(401).json({
            success : false,
            message : "Please provide course id"
        })
    }
    let totalAmout = 0 ;
    // find total amount for the courses
    for(const courseId of courses){
        let course;
        try{
            console.log("courseId " , courseId)
            course = await Course.findById({_id : courseId})
            if(!course){
                return  res.status(404).json({
                    success : false,
                    message : "Could not find course"
                })
            }
            
            if(course.studentEnrolled.includes(userId)){
                return res.status(401).json({
                    success : false,
                    message : "Student is already enrolled"
                })
            }
            totalAmout+=course.price
        }catch(err){
            return res.status(500).json({
                success : false,
                message : "error in adding price of course",
                err : err.message 
            })
        }
    }
    const options = {
        amount : totalAmout*100,
        currency : "INR",
        
    }
    console.log("options " , options)
    // creating order
    try{
        const paymentResponse = await instance.orders.create(options)
        
        if(!paymentResponse){
            return res.status(401).json({
                success : false,
                message : "error in creating payment instance"
            })
        }
        return res.status(200).json({
            success : true,
            message : "instance created successfully",
            instance : paymentResponse
        })
    }catch(err){
        console.log("error from creating order " ,err)
        return res.status(500).json({
            success :false,
            message : "Error in creating order",
            err : err.message
        })
    }
}

// verify the payment
exports.verifySignature = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.userId

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses){
        return res.status(404).json({
            success : false,
            message : "Payment failed!"
        })
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256",process.env.KEY_SECRET).update(body.toString()).digest("hex")

    if(expectedSignature === razorpay_signature){
        // enroll student
        await enrollStudent(courses , userId , res)
        return res.status(200).json({
            success : true,
            message : "Congratulations!! Payment verfied"
        })
    }
    return res.status(200).json({
        success : false,
        message : "Payment failed"
    })
}

const enrollStudent = async(courses , userId ,res)=>{
    if(!courses || !userId ){
        return res.status(404).json({
            success : false,
            message : "Please provide data for courses and userId"
        })
    }
    // find course and update student and course
    for(const courseId of courses){
       try{
        const enrolledCourse = await Course.findOneAndUpdate({_id : courseId},{
            $push : {
                studentEnrolled : userId
            }
        },{new : true})
        
        if(!enrolledCourse){
            return res.status(404).json({
                success : false,
                message : "Course not found!!"
            })
        }
        const newcourseProgress = await courseProgress.create({
            courseId : courseId,
            userId : userId,
            completedVideos : []
        })
        if(!newcourseProgress){
            return res.status(403).json({
                success : false,
                message : "not able to create course progress"
            })
        }
        const enrolledStudent = await User.findByIdAndUpdate(userId,{
            $push : {
                courses : courseId,
                courseProgress : newcourseProgress._id
            }
        },{new : true})
        if(!enrolledStudent){
            return res.status(403).json({
                success : false,
                message : "not able to update student course"
            })
        }

        const emailResponse = await mailSender(enrolledStudent.email , `Successfully enrolled into ${enrolledCourse.courseName}`,courseEnrollmentEmail(enrolledCourse.courseName , `${enrolledStudent.firstname}`))
        console.log("email sent successfully "  )

        
       }catch(err){
        res.status(500).json({
            success : false,
            message : "errror in updating course and student",
            err : err.message
        })
       }
    }
}

// send successfull email
exports.successfullPaymentEmail = async(req,res)=>{
   try{
    const {orderId , paymentId , amount} = req.body
    const userId = req.user.userId

    if(!orderId || paymentId || amount){
        return res.status(404).json({
            success : false,
            message : "details not found"
        })
    }
    const enrolledStudent = await User.findById(userId)
    const sentEmail = await mailSender(enrolledStudent.email , `{Payment Recieved}` , 
    paymentSuccessEmail(`${enrolledStudent.firstname}` , amount/100 , orderId , paymentId))
    if(!sentEmail){
        return res.status(401).json({
            success : false,
            message : "not able to sent mail"
        })
    }
   }catch(err){
    return res.status(500).json({
        success : false,
        message : "internal server error"
    })
   }
}