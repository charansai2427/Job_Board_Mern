import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../redux/slices/dataSlice";

export const store = configureStore({
    reducer :{
        User:dataSlice,
    }
    
    
})