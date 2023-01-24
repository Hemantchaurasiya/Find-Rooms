const Room = require("../models/Room-model");

// create a room
const createRoom = async(req,res)=>{
    try {
        const {owner,email,mobile,price,desc,facilities,place,city,state,country,photo} = req.body;
        const newRoom ={
            owner:owner,
            email:email,
            mobile:mobile,
            price:price,
            desc:desc,
            facilities:facilities,
            photo:photo,
            place:place,
            city:city,
            state:state,
            country:country
        };
        await Room.create(newRoom);
        return res.status(200).json("Room Create Successfully..");
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// update room
const updateRoom = async(req,res)=>{
    try {
        const {owner,email,mobile,price,desc,facilities,place,city,state,country,photo} = req.body;
        const updatedRoomData ={
            owner:owner,
            email:email,
            mobile:mobile,
            price:price,
            desc:desc,
            facilities:facilities,
            photo:photo,
            place:place,
            city:city,
            state:state,
            country:country
        };
        await Room.findByIdAndUpdate(req.params.roomId,updatedRoomData);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// gat a room
const getRoom = async(req,res)=>{
    try {
        const room = await Room.findById(req.params.roomId);
        const {createdAt,updatedAt,__v, ...roomData } = room._doc;
        return res.status(200).json(roomData);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// gat all rooms
const getAllRooms = async(req,res)=>{
    const { page } = req.query;
    try {
        const LIMIT = 12;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Room.countDocuments({});
        const rooms = await Room.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        return res.json({ data: rooms, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

// delete room
const deleteRoom = async(req,res)=>{
    try {
        await Room.findByIdAndDelete(req.params.roomId);
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json(error);
    }
}

// search room by city
const searchRoomByCity = async(req,res)=>{
    var roomList = [];
    try {
        const rooms = await Room.find({city:req.params.city});
        rooms.map((room)=>{
            const {updatedAt,__v, ...other} = room._doc;
            roomList.push(other);
        });
        return res.status(200).json(roomList);
    } catch (error) {
        return res.status(500).json(error);
    }
}
// search room by rent
const searchRoomByRent = async(req,res)=>{
    var roomList = [];
    try {
        const rooms = await Room.find({price:req.params.price});
        rooms.map((room)=>{
            const {updatedAt,__v, ...other} = room._doc;
            roomList.push(other);
        });
        return res.status(200).json(roomList);
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {createRoom,updateRoom,getRoom,getAllRooms,deleteRoom,searchRoomByCity,searchRoomByRent};