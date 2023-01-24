import { useState, useEffect } from 'react';
import axios from 'axios';
import Room from './Room';
import {Spinner} from '@chakra-ui/react';

const RoomList = ({page}) => {
    const [allRooms, setAllRooms] = useState();
    const [loading, setLoading] = useState(false);

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
    }, [page]);
    
    return (
        <>
            {allRooms === undefined ? "" :
                allRooms.map((room) => {
                    {loading && <Spinner margin='auto' marginTop='3' />}
                    return (<Room key={room._id} room={room} />);
                })}
        </>
    );

}

export default RoomList;