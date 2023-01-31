import { createReducer } from "@reduxjs/toolkit";



export const otherReducer = createReducer({},{
    sendContactEmailRequest:(state)=>{
        state.loading = true
    },
    sendContactEmailSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    sendContactEmailFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    sendRequestEmailRequest:(state)=>{
        state.loading = true
    },
    sendRequestEmailSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    sendRequestEmailFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearError: (state)=>{
        state.error = null
    },
    clearMessage : (state)=>{
        state.message = null
    }
})