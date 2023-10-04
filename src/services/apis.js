const BASE_URL = process.env.REACT_APP_BASE_URL

export const auth = {
    SIGNUP_API : BASE_URL + "/signup",
    LOGIN_API : BASE_URL + "/login",
    OTP_API : BASE_URL + "/otp",
    RESETPASSWORD_API : BASE_URL  + "/reset-token",
    resetPassword_API : BASE_URL + "/resetPassword"
}
export const categories = {
    CATEGORIES_API : BASE_URL + "/category/all"
}
export const courses = {
    ENROLLED_COURSES_API : BASE_URL + "/profile/EnrolledCourses",
    CREATE_COURSES_API : BASE_URL + "/create/course",
    UPDATE_COURSE_API : BASE_URL + "/update/course",
    GET_ALL_PUBLISHED_COURSES : BASE_URL + "/courses/my-courses",
    DELETE_COURSE : BASE_URL + "/course/delete",
    DELETE_ALL_COURSES : BASE_URL + "/course/delete/All",
    GET_COURSE_DETAILS : BASE_URL + "/courses/specific",
}
export const Section = {
    ADD_SECTION_API : BASE_URL + "/section",
    UPDATE_SECTION_API : BASE_URL + "/section/update" ,
    DELETE_SECTION_API :BASE_URL + "/setion/delete"
}
export const subSection = {
    ADD_subSECTION_API : BASE_URL + "/subsection",
    UPDATE_subSECTION_API : BASE_URL + "/subSection/update",
    DELETE_subSECTION_API : BASE_URL + "/subSection/delete"
}
export const categoryPageDetails = {
    Category_Page_Details_API :BASE_URL + "/category/details"
}
export const Payment = {
    capturePayment : BASE_URL + "/capture-payment",
    verifySignature : BASE_URL + "/verify-signature",
    successfullEmail : BASE_URL + "/email/successfullPaymentEmail"
}

export const profile = {
    GET_ENROLLED_COURSE : BASE_URL + "/profile/EnrolledCourses"
}

export const courseProgress = {
    setcourseProgress : BASE_URL + "/course/courseProgress",
    getcourseProgress : BASE_URL + "/course/getprogress"
}
export const ratingsAndReviews = {
    ratingsAndReviews : BASE_URL + "/course/rate",
    getAllRatings : BASE_URL + "/ratings/all"
}
export const stats = {
    getInstructorStats : BASE_URL + "/instructor/dasboard"
}
export const setting = {
    getDetails : BASE_URL + "/profile/userDetails",
    updateProfilePhoto : BASE_URL + "/profile/profilePhoto",
    updateProfile : BASE_URL + "/profile/update" , 
    changePassword : BASE_URL + "/changepassword"
}
export const contactUs = {
    contactUs : BASE_URL + "/countact/mail"
}