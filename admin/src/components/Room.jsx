import { useState, useEffect } from 'react';
import storage from "../api/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { MdLocationOn } from 'react-icons/md';
import { GoVerified } from 'react-icons/go';
import { Image,Spinner,Avatar } from '@chakra-ui/react';
import apiInstance from '../http';

function Room({ room }) {
    const [Url, setUrl] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        room.photo != "" &&
            setLoading(true);
        getDownloadURL(ref(storage, `gs://room-a4e51.appspot.com/items/${room.photo}`))
            .then((url) => {
                setUrl(url);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
            });
    }, [room.photo]);

    return (
        <>
            <Link to={`/room/${room._id}`}>
                <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0px' justifyContent='flex-start' cursor='pointer' >
                    <Box>
                        {loading ? <Spinner margin='auto' marginTop='3' /> :
                            <Image src={room.photo ? Url : ''} width={400} height={260} />
                        }
                    </Box>
                    <Box w='full'>
                        <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
                            <Flex alignItems='center'>
                                <Box paddingRight='3' color='green.400'>{<GoVerified />}</Box>
                                <Text fontWeight='bold' fontSize='lg'>RS - {room.price} Per Month</Text>
                            </Flex>
                            <Box>
                                <Avatar size='sm' src={Url}></Avatar>
                            </Box>
                        </Flex>
                        <Flex alignItems='self-start' p='1' justifyContent='flex-start' w='250px' color='blue.400'>
                            <MdLocationOn /> {room.place}, {room.city} , {room.state} , {room.country}
                        </Flex>
                        <Text fontSize='lg'>
                            {room.desc.length > 30 ? room.desc.substring(0, 30) + '...' : room.desc}
                        </Text>
                    </Box>
                </Flex>
            </Link>
        </>
    )
}

export default Room;