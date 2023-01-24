import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Flex, Box, Button } from '@chakra-ui/react';
import RoomList from '../components/RoomList';
import { useState } from 'react';

function Rooms() {
    const [page, setPage] = useState(1);
    const handleNextPage = () => {
        setPage(page + 1);
    }

    const handlePrevPage = () => {
        if (page !== 1) {
            setPage(page - 1);
        }
    }
    return (
        <>
            <Navbar />
            <Box>
                <Flex flexWrap='wrap' justifyContent='center'>
                    <RoomList page={page} />
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
    )
}

export default Rooms;