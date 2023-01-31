import { server } from "../store"
import axios from "axios"
export const sendContactMail = (name,email,message) => async (dispatch) => {
    try {
        dispatch({
            type: 'sendContactEmailRequest'
        })
        const { data } = await axios.post(`${server}/contact`, {name,email,message},
            {
                headers: {
                    "Content-type": "application/json"
                },
                withCredentials: true
            })
        dispatch({
            type: "sendContactEmailSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "sendContactEmailFail",
            payload: error.response.data.message
        })
    }
}
export const sendRequestMail = (name,email,course) => async (dispatch) => {
    try {
        dispatch({
            type: 'sendRequestEmailRequest'
        })
        const { data } = await axios.post(`${server}/request`, {name,email,course},
            {
                headers: {
                    "Content-type": "application/json"
                },
                withCredentials: true
            })
        dispatch({
            type: "sendRequestEmailSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "sendRequestEmailFail",
            payload: error.response.data.message
        })
    }
}