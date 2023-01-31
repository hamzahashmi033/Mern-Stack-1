import React, { useState } from 'react'
import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/actions/userActions'
export const styleOptions = {
    cursor : "pointer",
    marginLeft: "-5%",
    width:"110%",
    border:"none",
    height:"100%",
    color: "#ECC94B",
    backgroundColor : "white"
}
 const fileUploadStyle= {
    '&::file-selector-button' : styleOptions 
}
const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [imgPerv , setImgPerv] = useState("")
    const [image , setImage] = useState("")
    const dispatch  = useDispatch()
    const changeImageHandler = (e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setImgPerv(reader.result)
            setImage(file)
        }
    }
    const submitHandler = (e)=>{
        e.preventDefault()
        const myform = new FormData()
        myform.append("name",name)
        myform.append("email",email)
        myform.append("password",password)
        myform.append("file",image)
        dispatch(registerUser(myform))
    }
    return (
        <>
            <Container height={'95vh'}>
                <VStack height={'full'} justifyContent="center" my="10" spacing={'16'}>
                    <Heading  textTransform={'uppercase'} children="Registration" />
                    <form onSubmit={submitHandler} style={{ width: "100%" }}>
                        <Box my="4" display="flex" justifyContent={"center"}>
                            <Avatar src={imgPerv} size={"2xl"}/>
                        </Box>
                        <Box my={'4'}>
                            <FormLabel htmlFor='name' children="Name" />
                            <Input
                                required
                                value={name}
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your Name"
                                type={'text'}
                                focusBorderColor="yellow.500"
                            />
                        </Box>
                        <Box my={'4'}>
                            <FormLabel htmlFor='email' children="Email Address" />
                            <Input
                                required
                                value={email}
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="abc@gmail.com"
                                type={'email'}
                                focusBorderColor="yellow.500"
                            />
                        </Box>

                        <Box my={'4'}>
                            <FormLabel htmlFor='password' children="Password" />
                            <Input
                                required
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                type={'password'}
                                focusBorderColor="yellow.500"
                            />
                        </Box>
                        <Box my={'4'}>
                            <FormLabel htmlFor='chooseAvatar' children="Choose Avatar" />
                            <Input
                                required
                                accept='images/*'
                                id='chooseAvatar'
                                type={'file'}
                                focusBorderColor="yellow.500"
                                css={fileUploadStyle}
                                onChange={changeImageHandler}
                            />
                        </Box>
                        <Button my={'2'} colorScheme="yellow" type='submit'>Signup</Button>
                        <Box my={'4'}>
                            Aleardy have Account ? <Link to="/login"><Button colorScheme={'yellow'} variant="link">Login</Button>{" "}
                                here
                            </Link>
                        </Box>
                    </form>

                </VStack>
            </Container>
        </>
    )
}

export default Signup
