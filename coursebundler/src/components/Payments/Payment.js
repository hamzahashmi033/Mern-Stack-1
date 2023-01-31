import React,{useRef} from 'react'
import { Typography } from "@material-ui/core";
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useSelector,useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';

const Payment = () => {
    const navigate = useNavigate()
    const payBtn = useRef()
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useSelector(state => state.user)
    const paymentData = {
        amount: Math.round(299 * 100)
    };
    const dispatch = useDispatch()
    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },withCredentials : true
            };
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/payment/process",
                paymentData,
               config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name : user.name,
                        email : user.email
                    }
                },
            });
            if (result.error) {
                payBtn.current.disabled = false
                toast.error(result.error.response.data.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                   await toast.success("Payment has been submitted")
                    navigate("/paymentsuccess")
                    dispatch(loadUser())
                }
                else {
                    toast.error("There's some issue while processing payment ");
                }
            }
        }
        catch (error) {
            payBtn.current.disabled = false
            toast.error(error.response.data.message)
        }

    }
    return (
        <>
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />

                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${299}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>

        </>
    )
}

export default Payment
