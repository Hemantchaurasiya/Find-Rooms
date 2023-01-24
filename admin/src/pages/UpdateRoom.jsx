import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import apiInstance from '../http';
import { ref, uploadBytes } from "firebase/storage";
import storage from "../api/firebase";
import Navbar from '../components/Navbar';
import {FormControl,FormLabel,Input,Textarea} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react'
import axios from "axios";
import {useParams} from 'react-router';

function UpdateRoom() {
    const roomId = useParams().roomId;
    const [message, setmessage] = useState('');
    const { user } = useSelector((state) => state.auth);
    const [file, setFile] = useState(null);
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [facilities, setFacilities] = useState('');
    const [place, setPlace] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');

    useEffect(()=>{
        const getRoom = async()=>{
            try {
                const {data} = await axios.get(`http://localhost:8800/api/room/get-room-by-id/${roomId}`);
                setOwner(data.owner);
                setEmail(data.email);
                setMobile(data.mobile);
                setPrice(data.price);
                setDesc(data.desc);
                setFacilities(data.facilities);
                setPlace(data.place);
                setCity(data.city);
                setState(data.state);
                setCountry(data.country);
            } catch (error) {
                console.log(error);
            }
        }
        getRoom();
    },[roomId]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        setmessage("-");
        const updatedRoomData = {
            owner: owner,
            email: email,
            mobile: mobile,
            price: Number(price),
            desc: desc,
            facilities: facilities,
            place: place,
            city: city,
            state: state,
            country: country,
        }
        if (file) {
            const fileName = Date.now() + file.name;
            updatedRoomData.photo = fileName;
            try {
                // file upload in firebase store
                const storageRef = ref(storage, `/items/${fileName}`);
                uploadBytes(storageRef, file).then((snapshot) => {
                    window.location.reload();
                });
            } catch (err) { console.log(err) }
        }
        try {
            console.log(updatedRoomData);
            const { data } = await apiInstance.put(`room/update-room/${roomId}`, updatedRoomData);
            setmessage(data);
        } catch (error) {
            console.log(error);
            setmessage(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <FormControl >
                        <FormLabel >Upload Room Photo</FormLabel>
                        <Input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >Room Owner</FormLabel>
                        <Input type='text' value={owner} onChange={event => setOwner(event.currentTarget.value)} placeholder='Enter Room Owner' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >Room Description</FormLabel>
                        <Textarea value={desc} onChange={event => setDesc(event.currentTarget.value)} placeholder='Enter Room Description' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >Room Facilities</FormLabel>
                        <Textarea value={facilities} onChange={event => setFacilities(event.currentTarget.value)} placeholder='Enter Room Facilities' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >Rent Per Month (Monthly Charge)</FormLabel>
                        <Input type='number' value={price} onChange={event => setPrice(event.currentTarget.value)} placeholder='Enter Rent Per Month (Monthly Charge)' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >Email</FormLabel>
                        <Input type='email' value={email} onChange={event => setEmail(event.currentTarget.value)} placeholder='Enter Email' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >Mobile</FormLabel>
                        <Input type='text' value={mobile} onChange={event => setMobile(event.currentTarget.value)} placeholder='Enter Mobile Number' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >Place</FormLabel>
                        <Input type='text' value={place} onChange={event => setPlace(event.currentTarget.value)} placeholder='Enter Place' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >City</FormLabel>
                        <Input type='text' value={city} onChange={event => setCity(event.currentTarget.value)} placeholder='Enter City' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >State</FormLabel>
                        <Input type='text' value={state} onChange={event => setState(event.currentTarget.value)} placeholder='Enter State' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel >Country</FormLabel>
                        <Input type='text' value={country} onChange={event => setCountry(event.currentTarget.value)} placeholder='Enter Country' />
                    </FormControl>

                    <Button style={{ marginTop: "20px" }} type="submit" colorScheme='blue'>Update Room</Button>
                    {message===''?'':<h3 style={{color:"green"}}>{message}</h3>}
                </form>
            </div>
        </div>
    )
}

export default UpdateRoom;