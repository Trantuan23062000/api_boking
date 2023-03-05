import express from "express"
import { createRoom, deleteroom, getallroom, getidRoom, updateRoom, updateRoomlibrary } from "../controllers/room.js"

import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()


//create
router.post("/:hotelid", verifyAdmin, createRoom)

//get
router.get("/:id", verifyAdmin, getidRoom)


//update

router.put("/:id", verifyAdmin, updateRoom)

router.put("/availability/:id", updateRoomlibrary)

//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteroom)

//getall

router.get("/", getallroom)

export default router