import Template from "../components/core/form/Template"
import loginImage from "../assets/Images/login.webp"
function Login() {
  return (
    <div>
        <Template heading={"Welcome Back"} subheading={"Discover Your Passion"} img={loginImage} formtype={false}></Template>
    </div>
  )
}

export default Login