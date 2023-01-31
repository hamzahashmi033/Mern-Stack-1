import React, { useState } from 'react'
import {Box, Button, Container, FormLabel, Heading, Input, VStack} from "@chakra-ui/react"
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import { loginUser } from '../../redux/actions/userActions'
const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(loginUser(email,password))
    }
    
  return (
    <>
    <Container height={'95vh'}>
        <VStack height={'full'} justifyContent="center" spacing={'16'}>
            <Heading children="Welcome to CourseBundler"/>
            <form  style={{width : "100%"}}>
                <FormLabel htmlFor='email' children="Email Address"/>
                <Input
                required
                value={email}
                id="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type={'email'}
                focusBorderColor="yellow.500"
                />
            <Box my={'4'}>
            <FormLabel htmlFor='password' children="Password"/>
                <Input
                required
                id='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                type={'password'}
                focusBorderColor="yellow.500"
                />
            </Box>
            <Box>
                <Link to="/forget-password"><Button fontSize={'sm'} variant="link">Forget Password</Button></Link>
            </Box>
            <Button my={'2'} onClick={submitHandler} colorScheme="yellow" type='submit'>Login</Button>
            <Box my={'4'}>
                New User ? <Link to="/register"><Button colorScheme={'yellow'} variant="link">Sign Up</Button>{" "}
                here
                </Link> 
            </Box>
            </form>

        </VStack>
    </Container>
    </>
  )
}

export default Login
