import axios from "axios"

import { server } from "../store"

export const getAllCourses = (keyword,category) => async (dispatch) => {
    try {
        dispatch({
            type: 'getCourseRequest'
        })
        const { data } = await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`,
            {
                withCredentials: true
            })
        dispatch({
            type: "getCourseSuccess",
            payload: data.courses
        })
    } catch (error) {
        dispatch({
            type: "getCourseFail",
            payload: error.response.data.message
        })
    }
}

export const addCourseToPlaylist = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'addCourseToPlaylistRequest'
        })
        const { data } = await axios.post(`${server}/addtoplaylist`,{id},
            {   
                headers:{
                    "Content-type" : "application/json"
                },
                withCredentials: true
            })
        dispatch({
            type: "addCourseToPlaylistSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "addCourseToPlaylistFail",
            payload: error.response.data.message
        })
    }
}
export const removeCourseToPlaylist = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'removeCourseToPlaylistRequest'
        })
        const { data } = await axios.delete(`${server}/removefromplaylist?id=${id}`,
            {   
                headers:{
                    "Content-type" : "application/json"
                },
                withCredentials: true
            })
        dispatch({
            type: "removeCourseToPlaylistSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "removeCourseToPlaylistFail",
            payload: error.response.data.message
        })
    }
}

export const courseLectures = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'getLecturesRequest'
        })
        const { data } = await axios.get(`${server}/course/${id}`,
            {   
                headers:{
                    "Content-type" : "application/json"
                },
                withCredentials: true
            })
        dispatch({
            type: "getLecturesSuccess",
            payload: data.lectures
        })
    } catch (error) {
        dispatch({
            type: "getLecturesFail",
            payload: error.response.data.message
        })
    }
}