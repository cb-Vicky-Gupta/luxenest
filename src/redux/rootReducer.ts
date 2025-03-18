import { combineReducers } from "@reduxjs/toolkit";
import auth from '@/redux/slices/authSlice'
const rootReducer = combineReducers({
    auth : auth
})

export default rootReducer;