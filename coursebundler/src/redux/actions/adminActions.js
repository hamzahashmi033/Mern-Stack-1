import axios from "axios"
import { server } from "../store"

export const createCourse = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'createCourseRequest'
        })
        
        const { data } = await axios.post(`${server}/createcourse`, formData,
        {
            headers: {
                "Content-type": "multipart/form-data"
            },
            withCredentials: true
        })
        dispatch({
            type: "createCourseSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "createCourseFail",
            payload: error.response.data.message
        })
    }
}

export const deleteCourse = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteCourseRequest'
        })
        
        const { data } = await axios.delete(`${server}/course/${id}`,
        {
            headers: {
                "Content-type": "multipart/form-data"
            },
            withCredentials: true
        })
        dispatch({
            type: "deleteCourseSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "deleteCourseFail",
            payload: error.response.data.message
        })
    }
}

export const getCourseLectures = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'getCourseLecturesRequest'
        })
        
        const { data } = await axios.get(`${server}/course/${id}`,
        {
            headers: {
                "Content-type": "multipart/form-data"
            },
            withCredentials: true
        })
        dispatch({
            type: "getCourseLecturesSuccess",
            payload: data.lectures
        })
    } catch (error) {
        dispatch({
            type: "getCourseLecturesFail",
            payload: error.response.data.message
        })
    }
}

export const deleteCourseLectures = (courseId,lectureId) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteCourseLecturesRequest'
        })
        
        const { data } = await axios.delete(`${server}/deletelecture?courseId=${courseId}&lectureId=${lectureId}`,
        {
            headers: {
                "Content-type": "multipart/form-data"
            },
            withCredentials: true
        })
        dispatch({
            type: "deleteCourseLecturesSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "deleteCourseLecturesFail",
            payload: error.response.data.message
        })
    }
}

export const addCourseLectures = (id,formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'addCourseLecturesRequest'
        })
        
        const { data } = await axios.post(`${server}/course/${id}`, formData,
        {
            headers: {
                "Content-type": "multipart/form-data"
            },
            withCredentials: true
        })
        dispatch({
            type: "addCourseLecturesSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "addCourseLecturesFail",
            payload: error.response.data.message
        })
    }
}
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAllUsersRequest'
        })
        
        const { data } = await axios.get(`${server}/admin/users`,
        {
            withCredentials: true
        })
        dispatch({
            type: "getAllUsersSuccess",
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: "getAllUsersFail",
            payload: error.response.data.message
        })
    }
}
export const updateUserRole = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'updateUserRoleRequest'
        })
        const instance = axios.create({
            headers : {
                "Content-type" : "application/json"
            },  
            withCredentials:true
        })
        const { data } = await instance.put(`${server}/admin/user/${id}`)
        dispatch({
            type: "updateUserRoleSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "updateUserRoleFail",
            payload: error.response.data.message
        })
    }
}
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteUserRequest'
        })
        
        const { data } = await axios.delete(`${server}/admin/user/${id}`,
        {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: "deleteUserSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "deleteUserFail",
            payload: error.response.data.message
        })
    }
}
export const getStatsData = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAdminStatsRequest'
        })
        
        const { data } = await axios.get(`${server}/admin/stats`,
        {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: "getAdminStatsSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getAdminStatsFail",
            payload: error.response.data.message
        })
    }
}