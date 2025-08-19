import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../calculator/slice";

export const store = configureStore({
    reducer: {
        auth: counterReducer
    }
});