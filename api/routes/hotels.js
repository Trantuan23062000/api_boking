import express from "express"
import { createhotel, deletehotel, getHotelRooms, getHotels, getidHotel, updatehotel } from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"
import { countbycity, countbytype } from "../controllers/hotel.js"


const router = express.Router()


//create
router.post("/", verifyAdmin, createhotel)

//get
router.get("/find/:id", getidHotel)


//update

router.put("/:id", verifyAdmin, updatehotel)

//delete
router.delete("/:id", verifyAdmin, deletehotel)

//getall

router.get("/", getHotels)

router.get("/countbycity", countbycity)
router.get("/countbytype", countbytype)

router.get("/room/:id", getHotelRooms)


export default router