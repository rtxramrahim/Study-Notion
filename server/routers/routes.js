const express = require('express')
const router = express.Router()
const {auth,isStudent,isAdmin,isInstructor} = require('../middlewares/authentication')
const {updateProfile ,deleteProfile,updateProfilePicture , getEnrolledCourse , getAllUserDetails} = require("../controller/profile")
const {login,signup,sendOtp,changePassowrd} = require('../controller/auth')
const {createSection , updateSection , deleteSection} = require('../controller/section')
const {getCategoryPageDetails , createCategory, getAllCategory,deleteCategory} = require("../controller/category")
const {createsubSection , updatesubSection , deletesubSection} = require('../controller/subSection')
const {createRatingAndReviews , getAverageRating , getAllRatingsAndReviewsForCourse , getAllRatings} = require("../controller/ratingsAndReviews")
const {createCourse ,getAllCourse,getCourseDetails,updateCourse, deleteCourse ,getAllCoursePublished , deleteAllCourses} = require('../controller/courses')
const {resetPasswordToken} = require("../controller/resetPasswordToken")
const {resetPassword} = require("../controller/resetPassword")
const {capturePayment,verifySignature , successfullPaymentEmail} = require("../controller/payments")
const {updateCourseProgress , getCourseProgress} = require('../controller/courseProgress')
const {instructorDashboard} = require('../controller/statistics')
const {contactUsMail} = require('../controller/contactUsMail')

// authentication routes
router.post("/login",login)
router.post("/signup",signup)
router.post("/otp",sendOtp)
router.post("/changepassword",auth,changePassowrd)



// routes for courses
// create a new course
router.post("/create/course",auth,isInstructor,createCourse)
// get course details
router.post("/courses/specific",getCourseDetails)
// get all courses
router.get("/courses/All",auth,getAllCourse)
// update course
router.put("/update/course",auth,isInstructor,updateCourse)
router.get("/courses/my-courses" , auth , isInstructor,getAllCoursePublished)
router.delete("/course/delete" ,auth , isInstructor , deleteCourse)
router.delete("/course/delete/All",auth , isInstructor,deleteAllCourses)




//routes for section 
router.post("/section",auth,isInstructor,createSection)
router.put("/section/update",auth,isInstructor,updateSection)
router.delete("/setion/delete",auth,isInstructor,deleteSection) 




// routes for creating subSection
router.post("/subsection",auth,isInstructor,createsubSection)
router.put("/subSection/update",auth,isInstructor,updatesubSection)
router.delete("/subSection/delete",auth,isInstructor,deletesubSection)



// routes for category
router.post("/category",auth,isAdmin,createCategory)
router.delete("/category/delete",auth,isAdmin,deleteCategory)
router.get("/category/all",getAllCategory)
router.post("/category/details", getCategoryPageDetails)

// course progress
router.post("/course/courseProgress", auth , updateCourseProgress)
router.post("/course/getprogress" , auth , getCourseProgress)

// routes for profile
router.put("/profile/update",auth,updateProfile)
router.delete("/profile/delete",auth,deleteProfile)
router.put("/profile/profilePhoto",auth,updateProfilePicture)
router.get("/profile/userDetails",auth,getAllUserDetails)
router.get("/profile/EnrolledCourses",auth,getEnrolledCourse)

// routes for rating and reviews
router.post("/course/rate",auth,isStudent,createRatingAndReviews)
// for average rating
router.get("/course/rating/avg",auth,getAverageRating)
// for all the rating and reviews
router.post("/course/ratings",auth,getAllRatingsAndReviewsForCourse)
router.get("/ratings/all" , getAllRatings)


//routes for reseting password
router.post("/reset-token",resetPasswordToken)
router.put("/resetPassword",resetPassword)

// instructor dashboard
router.get("/instructor/dasboard" , auth , isInstructor , instructorDashboard)

// routes for payment and verification
router.post("/capture-payment",auth, isStudent, capturePayment)
router.post("/verify-signature",auth , isStudent, verifySignature)
router.post("/email/successfullPaymentEmail" , auth , isStudent , successfullPaymentEmail)


// contact us mail
router.post("/countact/mail" , contactUsMail)

module.exports = router