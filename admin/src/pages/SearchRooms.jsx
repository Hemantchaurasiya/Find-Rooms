import { useState } from 'react';
import { Flex, Box, Button, Stack, Input } from '@chakra-ui/react';
import axios from 'axios';
import Room from '../components/Room';
import {Spinner} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SearchRooms() {
  const [city, setCity] = useState('');
  const [Price, setPrice] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchByCity = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8800/api/room/get-room-by-city/${city}`);
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchByRent = async (event) => {
    event.preventDefault();
    try {
      const price = Number(Price);
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8800/api/room/get-room-by-price/${price}`);
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar/>
      <Box>
        <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
          <Stack spacing={4} >
            <Flex>
              <form onSubmit={handleSearchByCity}>
                <Stack spacing={4} direction="row">
                  <Input onChange={event => setCity(event.currentTarget.value)} variant='outline' placeholder='Search by City' />
                  <Button type='submit' colorScheme='blue'>Search</Button>
                </Stack>
              </form>
            </Flex>

            <Flex>
              <form onSubmit={handleSearchByRent}>
                <Stack spacing={4} direction="row">
                  <Input onChange={event => setPrice(event.currentTarget.value)} variant='outline' placeholder='Search by Rent' />
                  <Button type='submit' colorScheme='blue'>Search</Button>
                </Stack>
              </form>
            </Flex>
          </Stack>
        </Flex>
          
        <Flex flexWrap='wrap' justifyContent='center'>
          {rooms.length !==0 && rooms.map((room)=>{
            {loading && <Spinner margin='auto' marginTop='3' />}
            return(<Room key={room._id} room={room} />)
          })}
        </Flex>
      </Box>
      <Footer/>
    </>
  )
}

export default SearchRooms;