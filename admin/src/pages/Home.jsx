import { useState, useEffect } from 'react';
import Room from '../components/Room';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { Flex, Box ,Button} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  const [allRooms, setAllRooms] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:8800/api/room/get-all-rooms?page=${page}`);
        setAllRooms(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllRooms();
  }, []);

  return (
    <>
      <Navbar />
      <Box>
        <Flex flexWrap='wrap' justifyContent='center'>
          {allRooms === undefined ? "" :
            allRooms.map((room) => {
              { loading && <Spinner margin='auto' marginTop='3' /> }
              return (<Room key={room._id} room={room} />);
            })}
        </Flex>

        <Flex flexWrap='wrap' justifyContent='center'>
          {page !== 1 && <Button marginRight='5' onClick={handlePrevPage}>
            Previous Page
          </Button>
          }
          <Button onClick={handleNextPage}>Next Page</Button>
        </Flex>
      </Box>
      <Footer />
    </>
  );
}

export default Home;