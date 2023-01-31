import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer({courses : [],lectures:[]},{
    getCourseRequest : (state)=>{
        state.loading = true
    },
    getCourseSuccess : (state,action)=>{
        state.loading = false
        state.courses = action.payload
    },
    getCourseFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    addCourseToPlaylistRequest : (state)=>{
        state.loading = true
    },
    addCourseToPlaylistSuccess : (state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    addCourseToPlaylistFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    removeCourseToPlaylistRequest : (state)=>{
        state.loading = true
    },
    removeCourseToPlaylistSuccess : (state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    removeCourseToPlaylistFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    getLecturesRequest : (state)=>{
        state.loading = true
    },
    getLecturesSuccess : (state,action)=>{
        state.loading = false
        state.lectures = action.payload
    },
    getLecturesFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    clearError: (state)=>{
        state.error = null
    },
    clearMessage : (state)=>{
        state.message = null
    }
})

