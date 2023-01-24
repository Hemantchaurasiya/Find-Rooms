import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { GoVerified } from 'react-icons/go';
import { MdLocationOn } from 'react-icons/md';
import axios from 'axios';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import storage from "../api/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Image,Spinner } from '@chakra-ui/react';

function RoomDetail() {
    const roomId = useParams().roomId;
    const [Url, setUrl] = useState();
    const [room, setRoom] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8800/api/room/get-room-by-id/${roomId}`);
                setRoom(data);
            } catch (error) {
                console.log(error);
            }
        }
        getPost();
    }, [roomId]);

    useEffect(() => {
        room.photo !== "" && room.photo !== undefined &&
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
            <Navbar />
            <Box maxWidth='1000px' margin='auto' p='4'>
                <Box>
                    <Flex paddingTop='2' justifyContent='center'>
                        {loading ? <Spinner margin='auto' marginTop='3' /> :
                            <Image src={room.photo ? Url : ''} width={600} height={300} />
                        }
                    </Flex>
                </Box>

                <Box w='full' p='6'>
                    <Flex paddingTop='2' alignItems='center'>
                        <Box paddingRight='3' color='green.400'><GoVerified /></Box>
                        <Text fontWeight='bold' fontSize='lg'>
                            RS - {room.price} Per Month
                        </Text>
                        <Spacer />
                        <Avatar size='sm' src={Url}></Avatar>
                    </Flex>
                    <Flex alignItems='center' p='1' justifyContent='start' w='250px' color='blue.400'>
                        <MdLocationOn /> {room.place}, {room.city} , {room.state} , {room.country}
                    </Flex>
                </Box>

                <Box>
                    <Text fontSize='2xl' fontWeight='black' marginTop='5'>Owner : </Text>
                    <Flex flexWrap='wrap'>
                        <Text fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                            Name :- {room.owner}
                        </Text>
                    </Flex>
                </Box>

                <Box>
                    <Text fontSize='2xl' fontWeight='black' marginTop='5'>Contacts : </Text>
                    <Flex flexWrap='wrap'>
                        <Text fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                            Mobile :- {room.mobile}
                        </Text>

                        <Text fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                            Email :- {room.email}
                        </Text>
                    </Flex>
                </Box>

                <Box>
                    <Text fontSize='2xl' fontWeight='black' marginTop='5'>Address : </Text>
                    <Flex flexWrap='wrap'>
                        <Text fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                            Place :- {room.place}
                        </Text>

                        <Text fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                            City :- {room.city}
                        </Text>

                        <Text fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                            State :- {room.state}
                        </Text>

                        <Text fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                            Country :- {room.country}
                        </Text>
                    </Flex>
                </Box>

                <Box marginTop='2'>
                    <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilities : </Text>
                    <Text lineHeight='2' color='gray.600'>{room.facilities}</Text>
                </Box>

                <Box marginTop='2'>
                    <Text fontSize='2xl' fontWeight='black' marginTop='5'>Description : </Text>
                    <Text lineHeight='2' color='gray.600'>{room.desc}</Text>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default RoomDetail;