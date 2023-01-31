import {configureStore} from "@reduxjs/toolkit"
import { adminReducer } from "./reducer/adminReducer"
import { courseReducer } from "./reducer/courseReducer"
import { otherReducer } from "./reducer/otherReducer"
import { profileReducer, userReducer } from "./reducer/userReducer"

export const store = configureStore({
    reducer:{
        user : userReducer,
        profile : profileReducer,
        courses:courseReducer,
        admin : adminReducer,
        other:otherReducer
    }
})

export const server = "http://localhost:4000/api/v1"