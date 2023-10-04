import toast from "react-hot-toast";
import { Payment } from "../apis";
import { apiConnector } from "../ApiConnector";
import rzpLogo from "../../assets/Logo/Logo-Small-Light.png"
import { resetCart } from "../../slices/cartSlice";
function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script")
        script.src = src

        script.onload = ()=>{
            resolve(true)
        }
        script.onerror = ()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}
export async function buyCourse(courses , token , userDetails , navigate , dispatch){
    const toastId = toast.loading("Loading...")
    try{
       const res =  loadScript("https://checkout.razorpay.com/v1/checkout.js")
       if(!res){
            toast.error("Razorpay SDK failed to load")
            toast.dismiss(toastId)
            return
       }

       const orderResponse = await apiConnector("POST" , Payment.capturePayment , {courses} , {
        Authorisation : `Bearer ${token}`
       })
       if(!orderResponse){
            console.log(orderResponse.data.message)
            return
       }
      
      console.log("order creation response " , orderResponse)
      toast.dismiss(toastId)

      const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.instance.currency,
            amount: `${orderResponse.data.instance.amount}`,
            order_id:orderResponse.data.instance.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstname}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.instance.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
      }
      const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
      console.log("options created from created order" , options)
      toast.dismiss(toastId)
    }catch(err){
        toast.error("Something went wrong!")
        console.log("error from buycourse api " , err)
        toast.dismiss(toastId)
    }
}


// 1 load script
// create options to open modal
// 
async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", Payment.successfullEmail , {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}
async function verifyPayment(bodyData , token , navigate , dispatch){
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , Payment.verifySignature , bodyData ,{
            Authorisation : `Bearer ${token}`
        })
        if(!response.data.success){
            console.log("response from payment verification api " , response)
        }
        toast.success("Congratulations !! Payment Successfull , Now You Can Access The Course")
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
        toast.dismiss(toastId)
    }catch(err){
        toast.error("Something went wrong!")
        console.log(err)
        toast.dismiss(toastId)
    }
}