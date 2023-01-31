import React, { useState,useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  Heading,
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
  VStack,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { styleOptions } from '../../Auth/Signup';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addCourseLectures, getCourseLectures } from '../../../redux/actions/adminActions';


const CourseModal = ({
  isOpen,
  onClose,
  id,
  courseTitle,
  deleteLectureHandler

}) => {
  const { lectures,error,message } = useSelector(state => state.admin)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');
  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const addLectureHandler =async(e,id)=>{
    e.preventDefault()
    const myForm = new FormData()
    myForm.append("title",title)
    myForm.append("description",description)
    myForm.append("file",video)
   await dispatch(addCourseLectures(id,myForm))
   dispatch(getCourseLectures(id))
  }
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };
  useEffect(()=>{
    if(message){
      toast.success(message)
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
  },[message,error,dispatch])
  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />

        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size="sm" opacity={0.4} />
              </Box>

              <Heading children={'Lectures'} size="lg" />
              {lectures.length > 0 && (
                lectures.map((item, i) => (
                  <VideoCard
                  key={i}
                  title={item.title}
                  description={item.description}
                  num={i + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteLectureHandler={deleteLectureHandler}
                  
                  
                  />
                  ))
                  )
              }

              {
                lectures.length === 0 && (
                  <>
                    <Heading
                      textTransform={'uppercase'}
                      children="No Lecture Available"
                      my="16"
                      textAlign='center'
                    />
                  </>
                )
              }
            </Box>

            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Lecture"
                    size={'md'}
                    textTransform="uppercase"
                  />

                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <Input
                    accept="video/mp4"
                    required
                    type={'file'}
                    focusBorderColor="purple.300"
                    css={{
                      '&::file-selector-button': {
                        ...styleOptions,
                        color: 'purple',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />

                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}

                  <Button
                    onClick={()=>addLectureHandler(id)}
                    w="full"
                    colorScheme={'purple'}
                    type="submit"
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CourseModal
function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteLectureHandler

}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>

      <Button

        color={'purple.600'}
        onClick={() => deleteLectureHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
