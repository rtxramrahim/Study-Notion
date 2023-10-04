import React from "react";
import "./App.css"
import { Routes ,Route } from "react-router-dom";
import Home from "./pages/Home";
import OpenRoute from "./pages/Auth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import VerificationEmail from "./pages/VerificationEmail";
import AboutUs from "./pages/AboutUs";
import Resetpassword from "./pages/Resetpassword";
import UpdatePassword from "./pages/UpdatePassword";
import ProfileDropDown from "./components/core/navbar/ProfileDropDown";
import PrivateRoute from "./pages/PrivateRoute";
import Error from "./pages/Error";
import Myprofile from "./components/core/Dashboard/Myprofile";
import Setting from "./components/core/Dashboard/Setting";
import MainDashboard from "./components/core/Dashboard/MainDashboard";
import MyCourses from "./pages/MyCourses";
import CatalogPage from "./pages/CatalogPage";
import EnrolledCourses from "./pages/EnrolledCourses";
import PurchaseHistory from "./pages/PurchaseHistory";
import AddCourse from "./components/core/addCourse";
import CourseDetails from "./pages/CourseDetails";
import CartPage from "./pages/CartPage";
import ContactUS from "./pages/ContactUS";
import ViewCourse from "./pages/ViewCourse";
import VideoDetailSideBar from "./components/core/viewLecture/VideoDetailSideBar";
import { useSelector } from "react-redux";
import ViewCourseDetails from "./components/core/viewLecture/ViewCourseDetails";

const App = () => {
  const {user} = useSelector((state)=>state.profile)
  return(
    <div className="w-screen min-h-screen bg-richblack-900 flex-col mx-auto font-inter overflow-hidden">
        <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/signup" 
        element={<OpenRoute><Signup/></OpenRoute>}/>
        
        <Route path="/login" 
        element={<OpenRoute><Login/></OpenRoute>} />
        <Route path="/forgot-password" 
        element={<OpenRoute><Resetpassword/></OpenRoute>}></Route>

        <Route path="/verify-email" 
        element={<OpenRoute><VerificationEmail/></OpenRoute>}></Route>

        <Route path="/reset_password/:token" 
        element={<OpenRoute><UpdatePassword/></OpenRoute>}></Route>

        <Route path="/catalog/:catalogName" 
        element={<CatalogPage/>}></Route>

        <Route path="/courses/:courseId" 
        element={<CourseDetails/>}/>


        <Route  element=
          { <PrivateRoute>
              <ProfileDropDown/>
            </PrivateRoute>
          }>
          {
            user && user?.accType === "Instructor" && <>
                <Route path="/dashboard/instructor" element={<MainDashboard></MainDashboard>}></Route>
                <Route path="/dashboard/my-courses" element={<MyCourses/>}></Route>
                <Route path="/dashboard/add-course" element={<AddCourse/>}></Route>
            </>
          }
          
          
          {/* routes for all users */}
          <Route path="/dashboard/my-profile" element={<Myprofile/>}></Route>
          
          <Route path="/dashboard/settings" element={<Setting/>}></Route>
        
         
          {
            user && user?.accType === "Student" && 
            <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} ></Route>
              <Route path="/dashboard/purchase-history" element={<PurchaseHistory/>}></Route>
              <Route path="/dashboard/cart/buy" element={<CartPage/>}></Route>
            </>
          }
        </Route>
        <Route element={
              <PrivateRoute>

                  <ViewCourse/>
              </PrivateRoute>}>
              {
                user && user.accType === "Student" && <>
                <Route path="/dashboard/mycourses/:courseName/:courseId/section/:sectionId/sub-section/:subSectionId" element={<ViewCourseDetails/>}></Route>
                </>
              }
        </Route>

        {/* general routes */}
        <Route path="/about" element={<AboutUs></AboutUs>}></Route>
        <Route path="/contactUs/let'sConnect" element={<ContactUS/>}/>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
     
    </div>
  );
};

export default App;
