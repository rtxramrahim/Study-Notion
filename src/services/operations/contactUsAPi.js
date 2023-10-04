import { contactUs } from "../apis";
import { apiConnector } from "../ApiConnector";
import toast from "react-hot-toast";
export default async function contactUsSupport(email , firstname , lastname , message , phoneNumber){
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , contactUs.contactUs , {
            email : email ,
            firstname : firstname,
            lastname : lastname ,
            message : message,
            phoneNumber : phoneNumber        
        })
        if(!response?.data?.success){
            toast.dismiss(toastId)
            console.log("error from  contactUsSupport" , response.data)
            toast.error("Support service failed")
            return
        }
        toast.dismiss(toastId)
        console.log("response from  contactUsSupport" , response?.data?.message)
        return true

    }catch(err){
        toast.error("Somwthing wen wrong!")
        console.log(err)
        toast.dismiss(toastId)
    }
}