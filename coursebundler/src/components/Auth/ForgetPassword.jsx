import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch,useSelector } from 'react-redux'
import { forgetPassword } from '../../redux/actions/userActions'

const ForgetPassword = () => {
    const [email,setEmail] = useState("")
    const dispatch = useDispatch()
    const {error,message,loading} = useSelector(state=>state.profile)
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(forgetPassword(email))
    }
    React.useEffect(()=>{
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
        }
    },[dispatch,error,message])
    return (
        <>
            <Container py={'16'} h={'90vh'}>
                <form onSubmit={submitHandler}>
                    <Heading children="Forget Password" textTransform={'uppercase'} my="16" textAlign={"center"} />
                    <VStack spacing={'16'}>
                        <Input
                            required
                            value={email}
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="abc@gmail.com"
                            type={'email'}
                            focusBorderColor="yellow.500"
                        />
                        <Button isLoading={loading} type='submit' w={'full'} colorScheme="yellow">Sent Reset Link</Button>

                    </VStack>

                </form>

            </Container>


        </>
    )
}

export default ForgetPassword
