import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../redux/actions/userActions';
const ChangePassword = () => {
  const [oldPassword,setOldPassword]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {error,loading,message} = useSelector(state=>state.profile)
  const submitHandler = (e)=>{
    e.preventDefault()
     dispatch(changePassword(oldPassword,newPassword))
  }
  React.useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({
        type:"clearErrors"
      })
    }
    if(message){
      navigate("/profile")
    }
  },[dispatch,error,message,navigate])

  return (
   <>
   <Container py="16" minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Change Password"
          my="16"
          textAlign={"center"}
        />

        <VStack spacing={'8'}>
          <Input
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old Password"
            type={'password'}
            focusBorderColor="yellow.500"
          />

          <Input
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Password"
            type={'password'}
            focusBorderColor="yellow.500"
          />

          <Button
            isLoading={loading}
            w="full"
            colorScheme={'yellow'}
            type="submit"
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
   </>
  )
}

export default ChangePassword
