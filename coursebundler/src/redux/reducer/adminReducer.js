import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({lectures : []},{
    createCourseRequest : (state)=>{
        state.loading = true
    },
    createCourseSuccess : (state,action)=>{
        state.loading = false;
        state.message = action.payload
    },
    createCourseFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    deleteCourseRequest : (state)=>{
        state.loading = true
    },
    deleteCourseSuccess : (state,action)=>{
        state.loading = false;
        state.message = action.payload
    },
    deleteCourseFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    getCourseLecturesRequest : (state)=>{
        state.loading = true
    },
    getCourseLecturesSuccess : (state,action)=>{
        state.loading = false;
        state.lectures = action.payload
    },
    getCourseLecturesFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    deleteCourseLecturesRequest : (state)=>{
        state.loading = true
    },
    deleteCourseLecturesSuccess : (state,action)=>{
        state.loading = false;
        state.message = action.payload
    },
    deleteCourseLecturesFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    addCourseLecturesRequest : (state)=>{
        state.loading = true
    },
    addCourseLecturesSuccess : (state,action)=>{
        state.loading = false;
        state.message = action.payload
    },
    addCourseLecturesFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    getAllUsersRequest : (state)=>{
        state.loading = true
    },
    getAllUsersSuccess : (state,action)=>{
        state.loading = false;
        state.users = action.payload
    },
    getAllUsersFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },    
    updateUserRoleRequest : (state)=>{
        state.loading = true
    },
    updateUserRoleSuccess : (state,action)=>{
        state.loading = false;
        state.message = action.payload
    },
    updateUserRoleFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    deleteUserRequest : (state)=>{
        state.loading = true
    },
    deleteUserSuccess : (state,action)=>{
        state.loading = false;
        state.message = action.payload
    },
    deleteUserFail : (state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    getAdminStatsRequest : (state)=>{
        state.loading = true
    },
    getAdminStatsSuccess : (state,action)=>{
        state.loading = false;
        state.stats = action.payload.stats
        state.usersCount = action.payload.usersCount
        state.viewsCount = action.payload.viewsCount
        state.subscriptionCount = action.payload.subscriptionCount
        state.subscriptionPercentage = action.payload.subscriptionPercentage
        state.viewsPercentage = action.payload.viewsPercentage
        state.usersPercentage = action.payload.usersPercentage
        state.subscriptionProfit = action.payload.subscriptionProfit
        state.viewsProfit = action.payload.viewsProfit
        state.usersProfit = action.payload.usersProfit
    },
    getAdminStatsFail : (state,action)=>{
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