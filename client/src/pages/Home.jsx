import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import RoomList from '../components/RoomList';
import { Link } from 'react-router-dom';

const Home = () => {
    const page = 1;
    return (
        <>
            <Navbar />
            <Box>
                <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
                    <img src='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4' width={500} height={300} />
                    <Box p='5'>
                        <Text color='gray.500' fontSize='sm' fontWeight='medium'>RENT A ROOM</Text>
                        <Text fontSize='3xl' fontWeight='bold'>Rental Rooms for<br />Everyone</Text>
                        <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>Explore from Apartments, builder floors, villas<br />and more</Text>
                        <Button fontSize='xl' bg="blue.300" color="white">
                            <Link to='/rooms'>Explore Renting</Link>
                        </Button>
                    </Box>
                </Flex>

                <Flex flexWrap='wrap' justifyContent='center'>
                    <RoomList page={page} />
                </Flex>
            </Box>

            <Footer />
        </>
    )
}

export default Home;