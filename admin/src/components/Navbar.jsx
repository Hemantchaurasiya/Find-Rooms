import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../store/authSlice';
import apiInstance from '../http';
import { Link } from 'react-router-dom';
import {Flex, Box, Spacer, Button } from '@chakra-ui/react';


function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const Logout = async (e) => {
    e.preventDefault();
    try {
      let refresh_token = JSON.parse(localStorage.getItem("user")).refresh_token;
      const { data } = await apiInstance.post(process.env.REACT_APP_API_URL + "auth/logout", { refresh_token });
      localStorage.removeItem("user");
      dispatch(setAuth({ user: null }));
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex p='2' borderBottom='1px' borderColor='gray.100'>
      <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
        <Link to='/' paddingLeft='2'>Admin Penal</Link>
      </Box>

      <Spacer />

      <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
        <Link to='/search-rooms' paddingLeft='2'><Button marginRight='3' paddingLeft='5'>Search Rooms</Button></Link>
      </Box>

      {user===null ?
        <>
          <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
            <Link to='/register'><Button paddingLeft='5'>Register</Button></Link>
          </Box>

          <Box p fontSize='3xl' color='blue.400' fontWeight='bold'>
            <Link to='/login'><Button marginRight='12' marginLeft='2' paddingLeft='5'>Login</Button></Link>
          </Box>
        </>
        :
        <>
        <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
          <Link to='/create-room'><Button marginRight='3' paddingLeft='2'>Create New Room</Button></Link>
        </Box>
        <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
          <Button onClick={Logout} marginRight='12' paddingLeft='2'>Logout</Button>
        </Box>
        </>
      }
    </Flex>
  )
}

export default Navbar;