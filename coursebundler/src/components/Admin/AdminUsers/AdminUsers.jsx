
import React,{useEffect} from 'react'
import cursor from "../../../assests/images/cursor.png"
import Sidebar from '../Sidebar'
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch,useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/adminActions';
import { toast } from 'react-hot-toast';

const AdminUsers = () => {
  const dispatch = useDispatch()
  const {users,message,error}= useSelector(state=>state.admin)
  

  const updateHandler = (userId) => {
    dispatch(updateUserRole(userId))
  //  dispatch(getAllUsers())
  };
  const deleteButtonHandler = userId => {
   dispatch(deleteUser(userId))
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
    dispatch(getAllUsers())
  },[dispatch,message,error])
  return (
    <>
    <Grid css={{cursor : `url(${cursor}) , default`}} minH={"100vh"} templateColumns={["1fr","1fr 5fr"]}>
    <Sidebar/>
    <Box p={['0', '16']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available users in the Database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {users &&
                users.map(item => (
                  <Row
                    updateHandler={updateHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}
                  
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
    </>
  )
}

export default AdminUsers

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'Subscribed'
          ? 'Active'
          : 'Not Active'}
      </Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            Change Role
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