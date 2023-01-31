import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { sendContactMail } from '../../redux/actions/oherActions'
import toast from "react-hot-toast"
const Contact = () => {
  const dispatch =useDispatch()
  const {message : otherMessage,error} = useSelector(state=>state.other)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [message,setMessage] = useState("")
    const submitHandler = (e)=>{
      e.preventDefault()
      dispatch(sendContactMail(name,email,message))
    }
    useEffect(()=>{
      if(otherMessage){
        toast.success(otherMessage)
        dispatch({
          type:"clearMessage"
        })
      }
      if(error){
        toast.error(error)
        dispatch({
          type:"clearError"
        })
      }
    },[otherMessage,error,dispatch])
  return (
        <>
        <Container h={"100vh"}>
        <VStack h={'full'} justifyContent="center" spacing={"16"}>
            <Heading children="Contact Us"/>
            <form onSubmit={submitHandler} style={{width:"100%"}} >
                <Box my={'4'}>
                    <FormLabel htmlFor='name' children="Name"/>
                    <Input
                    required
                    id='name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type="text"
                    placeholder='Enter Your Name'
                    focusBorderColor='yellow.500'
                    />
                </Box>
                <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your Message...."
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button
            my="4"
            colorScheme={'yellow'}
            type="submit"
          >
            Send Mail
          </Button>
          <Box my="4">
            Request for a course?{' '}
            <Link to="/request">
              <Button colorScheme={'yellow'} variant="link">
                Click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
        </VStack>
        </Container>
        </>
  )
}

export default Contact
