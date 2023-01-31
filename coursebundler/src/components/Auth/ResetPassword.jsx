import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch,useSelector } from 'react-redux'
import {  ResetPasswordFunc } from '../../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
const ResetPassword = () => {
    const [password,setPassword] = useState("")
    const {token} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {error,message,loading} = useSelector(state=>state.profile)
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(ResetPasswordFunc(token,password))
    }
    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch({
                type:"clearErrors"
            })
        }
        if(message){
            toast.success(message)
            dispatch({
                type:"clearMessages"
            })
            navigate("/login")
        }
    },[dispatch,error,message,navigate])
    return (
        <>
            <Container py={'16'} h={'90vh'}>
                <form onSubmit={submitHandler}>
                    <Heading children="Reset Password" textTransform={'uppercase'} my="16" textAlign={"center"} />
                    <VStack spacing={'16'}>
                        <Input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            type={'password'}
                            focusBorderColor="yellow.500"
                        />
                        <Button isLoading={loading} type='submit' w={'full'} colorScheme="yellow">Change Password</Button>

                    </VStack>

                </form>

            </Container>


        </>
    )
}

export default ResetPassword
