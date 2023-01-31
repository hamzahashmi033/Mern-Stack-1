import React,{useEffect} from 'react'
import {
    Avatar,
    Button,
    Container,
    Heading,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
    VStack,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { styleOptions } from '../Auth/Signup';
import {useState} from "react"
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { loadUser, updateProfilePicture } from '../../redux/actions/userActions';
import { removeCourseToPlaylist } from '../../redux/actions/courseActions';
import axios from 'axios';

const Profile = ({user}) => {
  
    const dispatch = useDispatch()
    const { error,message } = useSelector(state=>state.profile)
    const {message:CourseMessage,error:CourseError} = useSelector(state=>state.courses)
    
 
    const removeFromPlaylistHandler = async(id)=>{
      await dispatch(removeCourseToPlaylist(id))
      dispatch(loadUser())
      
    }
    const { isOpen, onClose, onOpen } = useDisclosure();
    const changeImageSubmitHandler = async(e,image)=>{
        e.preventDefault()
        const myform = new FormData()
        myform.append("file",image)
        await dispatch(updateProfilePicture(myform))
         dispatch(loadUser())
        onClose()
    }
    const cancelSubscription =async()=>{
      const {data} = await axios.get("http://localhost:4000/api/v1/payment/cancel",{withCredentials:true})
     toast.success(data.message)
     dispatch(loadUser())
    }
      useEffect(()=>{
        if(CourseMessage){
          dispatch({
            type : "clearMessage"
          })
        }
        if(CourseError){
          dispatch({
            type:"clearError"
          })
        }
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
        
    },[dispatch,error,message,CourseError,CourseMessage])
  return (
        <>
         <Container minH={'95vh'} maxW="container.lg" py="8">
      <Heading children="Profile" m="8" textTransform={'uppercase'} />

      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding="8"
      >
        <VStack>
          <Avatar boxSize={'48'}  src={user.avatar.url} />
          <Button  onClick={onOpen} colorScheme={'yellow'} variant="ghost">
            Change Photo
          </Button>
        </VStack>

        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>{' '}
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="CreatedAt" fontWeight={'bold'} />
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription && user.subscription.status === 'Subscribed' ? (
                <Button
                  onClick={cancelSubscription}
                  color={'yellow.500'}
                  variant="unstyled"
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'yellow'}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>

            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading children="Playlist" size={'md'} my="8" />
      {user.playlist.length > 0 ? (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap="wrap"
          p="4"
        >
          {user && user.playlist.map(element => (
            <VStack w="48" m="2" key={element.course}>
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />

              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>

                <Button
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      ) : (
        <>
         <Heading children="No Courses in Playlist" color={"gray.400"} textAlign={"center"} fontSize={"lg"} textTransform={'uppercase'} />
        </>
      )}
        <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler}/>
          </Container>
        </>
  )
}

export default Profile

function ChangePhotoBox ({isOpen,onClose,changeImageSubmitHandler}){
    const [image,setImage] =useState("")
    const [imagePrev,setImagePrev] =useState("")
    const changeImage = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
          setImagePrev(reader.result);
          setImage(file);
        };
    }
    const closeHandler = ()=>{
        onClose()
        setImagePrev("")
        setImage("")
    }
    return (
        <>
        <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': styleOptions }}
                  onChange={changeImage}
                />

                <Button
                  
                  w="full"
                  colorScheme={'yellow'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
        </>
    )
}
