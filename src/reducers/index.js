import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/AuthSlice"
import profileReducer from "../slices/ProfileSlice";
import cartReducer from "../slices/cartSlice"
import courseSlice from "../slices/courseSlice";
import viewCourseSlice from "../slices/viewCourseSlice";
const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course : courseSlice,
    viewCourse : viewCourseSlice
})

export default rootReducer
