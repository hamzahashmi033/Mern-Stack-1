import { Box, Grid, Heading, Text ,VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import IntroVideo from "../../assests/videos/intro.mp4"
import { useDispatch,useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { courseLectures } from '../../redux/actions/courseActions'
import Loader from '../Layout/Loader/Loader'

const CoursePage = ({user}) => {
    const [lectureNumber , setLectureNumber] = useState(0)
    const dispatch = useDispatch()
    const {id} = useParams()
    const {lectures,loading} = useSelector(state=>state.courses)
    

    useEffect(()=>{
      dispatch(courseLectures(id))
    },[dispatch,id])
    if(user.role !== "admin" && (user.subscription === undefined || user.subscription.status !== "Subscribed")){
      return <Navigate to="/courses"/>
    }
  
  return (
    <>
    {loading ?  (
      <Loader/>
    ) : (
      
      <Grid h={"100vh"} templateColumns={["1fr","3fr 1fr"]}>
      {lectures && lectures.length > 0 ? (
        <>
        <Box>
            <video
            width={'100%'}
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={lectures && lectures[lectureNumber].video.url}
            >
            </video>
            <Heading
              m="4"
              children={`#${lectureNumber + 1} ${
               lectures && lectures[lectureNumber].title
              }`}
            />
            <Heading m="4" children="Description" />
            <Text m="4" children={lectures[lectureNumber].description} />
        </Box>
        <VStack>
            {lectures &&  lectures.map((element, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
          </>
      ) : (
        <Heading children="No Lectures" />
      )}
      </Grid>
  
      
    )}
    </>
  )
}

export default CoursePage
