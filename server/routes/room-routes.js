const express = require("express");
const roomRouter = express.Router();

const {createRoom,updateRoom,getRoom,getAllRooms,deleteRoom, searchRoomByCity, searchRoomByRent} = require("../controllers/room-controller");
const isAuthenticated = require("../middlewares/auth-middleware");

// get a room
roomRouter.get("/get-room-by-id/:roomId",getRoom);

// search room by city
roomRouter.get("/get-room-by-city/:city",searchRoomByCity);

// search room by rent
roomRouter.get("/get-room-by-price/:price",searchRoomByRent);

// create a new room
roomRouter.post("/create-room",isAuthenticated,createRoom);

// update room details
roomRouter.put("/update-room/:roomId",isAuthenticated,updateRoom);

// get all rooms
roomRouter.get("/get-all-rooms",getAllRooms);

// delete room
roomRouter.delete("/delete-room/:roomId",isAuthenticated,deleteRoom);

module.exports = roomRouter;