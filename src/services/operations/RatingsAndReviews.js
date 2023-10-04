import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { ratingsAndReviews } from "../apis";

export async function createRatings (rating , reviews , course , userId , token){
    const toastId = toast.loading("Loading")
    try{
        const response = await apiConnector("POST" , ratingsAndReviews.ratingsAndReviews , {
            rating : rating,
            reviews : reviews,
            courseId  : course,
            userId : userId
        },{
            Authorisation : `Bearer ${token}`
        } 
        )
        if(!response.data.success){
            toast.error("Not able to create ratings")
            console.log("response from ratings api " , response.data)
            toast.dismiss(toastId)
            return
        }
        console.log("response from review and ratings api " , response)
        toast.success(response?.data?.message)
        console.log(response?.data?.ratingAndReview)
        toast.dismiss(toastId)
        return true
    }
    catch(err){
        toast.error("Something went wrong")
        console.log("error from rating and reviews api " , err)
        toast.dismiss(toastId)
    }

}
export async function getRatings(){
    try{
        const response = await apiConnector("GET" , ratingsAndReviews.getAllRatings)
        if(!response.data.success){
            console.log("error from ratings and reviews api " , response.data)
        }
        const result = response?.data?.data
        console.log("response from review api" , result)
        return result
    }catch(err){
        console.log("error from ratings and reviews api " , err)
    }
}