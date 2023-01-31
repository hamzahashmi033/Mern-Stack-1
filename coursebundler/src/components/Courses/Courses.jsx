import { Button, Container, Heading, HStack, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { addCourseToPlaylist, getAllCourses } from '../../redux/actions/courseActions'
import { toast } from 'react-hot-toast'
import { loadUser } from '../../redux/actions/userActions'

const CourseCard = ({ views, title, imageSrc, id, addToPlayListHandler, creator, description, lectureCount,loading }) => {
  
    return (
        <>
            <VStack
                className='course'
                alignItems={["center", "flex-start"]}
                marginTop={'0'}
                
            >
                <Image src={imageSrc} boxSize="80" objectFit={'contain'} />
                <Heading textAlign={["center", "left"]} size={'md'} maxW='200px' fontFamily={"sans-serif"} noOfLines={3} children={title} />
                <Text noOfLines={2} children={description} />
                <HStack>
                    <Text fontWeight={'bold'} textTransform={'uppercase'} children={"creator"} />
                    <Text fontFamily={'body'} textTransform={'uppercase'} children={creator} />
                </HStack>
                <Heading textAlign={'center'} size="xs" children={`Lectures - ${lectureCount}`} textTransform="uppercase" />
                <Heading size="xs" children={`Views - ${views}`} textTransform="uppercase" />
                <Stack direction={["column", "row"]} alignItems="center">
                    <Link to={`/course/${id}`}>
                        <Button colorScheme={'yellow'}>Watch Now</Button>
                    </Link>
                    <Button isLoading={loading} colorScheme={'yellow'} variant='ghost' onClick={()=>addToPlayListHandler(id)}>Add to Playlist</Button>

                </Stack>

            </VStack>
        </>
    )
}


const Courses = () => {
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState("")
    const categories = [
        "Web Development",
        "App Development",
        "Artificial Intellegence",
        "Data Structure & Algorithm",
        "Data Science",
        "Game Development"
    ]
    const dispatch = useDispatch()
    const {loading,error,courses,message} = useSelector(state=>state.courses)

    const addToPlayListHandler =async(id)=>{
        await dispatch(addCourseToPlaylist(id))
        dispatch(loadUser())
    }
    
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
        dispatch(getAllCourses(category,keyword))
    },[category, keyword, dispatch,error,message])  
    return (
        <>      
                 <Container minH={'95vh'} maxW="container.lg" paddingY={'5'}>
                <Heading children="All Courses" m={'8'} />
                <Input value={keyword}  onChange={(e) => setKeyword(e.target.value)} placeholder="Search a Course" type={'text'} focusBorderColor="yellow.500" />
                <HStack overflowX={'auto'} paddingY={'8'}>
                    {
                        categories.map((item, index) => (
                            <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
                                <Text children={item} />
                            </Button>
                        ))
                    }
                </HStack>

                <Stack
                    direction={["column", 'row']}
                    flexWrap="wrap"
                    justifyContent={["flex-start", "space-evenly"]}
                    alignItems={['center', 'flex-start']}
                >{
                    courses && courses.length > 0 ? (
                         courses.map((item)=>(
                            <CourseCard
                                title={item.title}
                                description={item.description}
                                views={item.views}
                                imageSrc={item.poster.url}
                                id={item._id}
                                creator={item.createdBy}
                                lectureCount={item.numOfVideos}
                                addToPlayListHandler={addToPlayListHandler}
                                loading = {loading}
                            />
                                
                            ))
                    ) : (
                        <>
                        <Heading mt="4" children="Courses Not Found" />
                        </>
                    )
                }
                </Stack>
            </Container>

                </>

    )
}

export default Courses
