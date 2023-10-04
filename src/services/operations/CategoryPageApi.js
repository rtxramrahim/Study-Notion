import { apiConnector } from "../ApiConnector";
import { categoryPageDetails } from "../apis";
import toast from "react-hot-toast";
export const getCategoryPageDetails = async(catId)=>{
    const toastId = toast.loading("Loading..")
    try{
        const response = await apiConnector("POST" , categoryPageDetails.Category_Page_Details_API , {catId : catId } )
       
        if(!response.data.success){
            toast.error("Not able to load page..")
            // console.log("Response from category page Details..." , response.data)
            toast.dismiss(toastId)
        }
        else{
            // toast.success("Courses with selected category")
            const result = response.data.data
            // console.log("Response from category page Details..." , response.data.data)
            
            toast.dismiss(toastId)
            return result
        }

    }catch(err){
        toast.error("Something went wrong :)")
        console.log("error from response from course api " , err)
        toast.dismiss(toastId)
    }
}