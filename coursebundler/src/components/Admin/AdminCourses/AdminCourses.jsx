import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import React, { useState, useEffect } from 'react'
import cursor from "../../../assests/images/cursor.png"
import Sidebar from '../Sidebar'
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../../redux/actions/courseActions';
import { deleteCourse, deleteCourseLectures, getCourseLectures } from '../../../redux/actions/adminActions';
import { toast } from 'react-hot-toast';

const AdminCourses = () => {
  const [courseId, setCourseId] = useState(121313145);
  const [courseTitle, setCourseTitle] = useState('React Course');
  const [lecture, setLectures] = useState([]);
  // const { lectures } = useSelector(state => state.admin)
  const { courses } = useSelector(state => state.courses)
  const { message, error } = useSelector(state => state.admin)
  const dispatch = useDispatch()
  const keyword = ""
  const category = ""
  const { isOpen, onClose, onOpen } = useDisclosure();
  const coureDetailsHandler = (id, title) => {
    onOpen()
    dispatch(getCourseLectures(id))
    // setLectures(lectures)
    setCourseTitle(title)
    setCourseId(id)
  }
  const deleteButtonHandler = (id) => {
    dispatch(deleteCourse(id))
  }
  const deleteLectureHandler = async(courseId,lectureId) => {
    await dispatch(deleteCourseLectures(courseId,lectureId))
    dispatch(getCourseLectures(courseId))
  }
  const addLectureHandler = () => {

  }
  useEffect(() => {
    dispatch(getAllCourses(keyword, category))
    if (message) {
      toast.success(message)
      dispatch({
        type: "clearMessage"
      })
    }
    if (error) {
      toast.error(error)
      dispatch({
        type: "clearError"
      })
    }
  }, [dispatch, message, error])
  return (
    <>
      <Grid css={{ cursor: `url(${cursor}) , default` }} minH={"100vh"} templateColumns={["1fr", "1fr 5fr"]}>
        <Sidebar />
        <Box p={['0', '8']} overflowX="auto">
          <Heading
            textTransform={'uppercase'}
            children="All Courses"
            my="16"
            textAlign={['center', 'left']}
          />

          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size="md">
              <TableCaption>All available courses in the database</TableCaption>

              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Poster</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Creator</Th>
                  <Th isNumeric>Views</Th>
                  <Th isNumeric>Lectures</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {courses.map(item => (
                  <Row
                    coureDetailsHandler={coureDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}

                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* course modal here */}
          <CourseModal
            isOpen={isOpen}
            onClose={onClose}
            id={courseId}
            courseTitle={courseTitle}
            deleteLectureHandler={deleteLectureHandler}
            

          // lectures = {lecture}
          />
        </Box>
      </Grid>
    </>
  )
}

export default AdminCourses
function Row({ item, coureDetailsHandler, deleteButtonHandler, loading }) {

  return (
    <Tr>
      <Td>#{item._id}</Td>

      <Td>
        <Image src={item.poster.url} />
      </Td>

      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => coureDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}

          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}