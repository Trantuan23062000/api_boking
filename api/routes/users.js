import express from "express"
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js"
import { deleteuser, getalluser, getidUser, updateuser } from "../controllers/user.js"

const router = express.Router()


//get id user 
router.get("/:id", verifyUser, getidUser)

//update 
router.put("/:id", verifyUser, updateuser)

//delete
router.put("/:id", verifyUser, deleteuser)

//getall
router.get("/", verifyAdmin, getalluser)


export default router