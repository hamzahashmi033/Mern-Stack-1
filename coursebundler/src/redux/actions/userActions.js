import axios from "axios"
import { server } from "../store"

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'loginRequest'
        })
        const { data } = await axios.post(`${server}/login`, { email, password },
            {
                headers: {
                    "Content-type": "application/json"
                },
                withCredentials: true
            })
        dispatch({
            type: "loginSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "loginFail",
            payload: error.response.data.message
        })
    }
}
export const registerUser = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'registerRequest'
        })
        const { data } = await axios.post(`${server}/register`, formData,
            {
                headers: {
                    "Content-type": "multipart/form-data"
                },
                withCredentials: true
            })
        dispatch({
            type: "registerSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "registerFail",
            payload: error.response.data.message
        })
    }
}
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'loadUserRequest'
        })
        const { data } = await axios.get(`${server}/me`, 
            {
                withCredentials: true
            })
        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "loadUserFail",
            payload: error.response.data.message
        })
    }
}
export const logoutUser = () => async (dispatch) => {
    try {


        dispatch({
            type: 'logoutUserRequest'
        })
        const { data } = await axios.get(`${server}/logout`, 
            {
                withCredentials: true
            })
        dispatch({
            type: "logoutUserSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "logoutUserFail",
            payload: error.response.data.message
        })
    }
}

export const updateProfile = (name,email) => async (dispatch) => {
    try {
        dispatch({
            type: 'updateProfileRequest'
        })
        const { data } = await axios.put(`${server}/updateprofile`,{name,email},{
            headers: {
                "Content-type": "application/json"
            } ,withCredentials:true
        })
        dispatch({
            type: "updateProfileSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response.data.message
        })
    }
}

export const changePassword = (oldPassword,newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: 'changePasswordRequest'
        })
        const { data } = await axios.put(`${server}/changepassword`,{oldPassword,newPassword},{
            headers: {
                "Content-type": "application/json"
            } ,withCredentials:true
        })
        dispatch({
            type: "changePasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "changePasswordFail",
            payload: error.response.data.message
        })
    }
}

export const updateProfilePicture = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'updateProfilePictureRequest'
        })
        const { data } = await axios.put(`${server}/updateprofilepicture`,formData,{
            headers: {
                "Content-type": "multipart/form-data"
            } ,withCredentials:true
        })
        dispatch({
            type: "updateProfilePictureSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "updateProfilePictureFail",
            payload: error.response.data.message
        })
    }
}
export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: 'forgetPasswordRequest'
        })
        const { data } = await axios.post(`${server}/forgetpassword`,{email},{
            headers: {
                "Content-type": "application/json"
            } ,withCredentials:true
        })
        dispatch({
            type: "forgetPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "forgetPasswordFail",
            payload: error.response.data.message
        })
    }
}
export const ResetPasswordFunc = (token,password) => async (dispatch) => {
    try {
        dispatch({
            type: 'ResetPasswordRequest'
        })
        const { data } = await axios.put(`${server}/resetpassword/${token}`,{password},{
            headers: {
                "Content-type": "application/json"
            } ,withCredentials:true
        })
        dispatch({
            type: "ResetPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "ResetPasswordFail",
            payload: error.response.data.message
        })
    }
}