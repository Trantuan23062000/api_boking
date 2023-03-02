import room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new room(req.body)

    try {
        const saveRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: saveRoom._id }
            })

        } catch (err) {
            next(err)
        }
        res.status(200).json(saveRoom)
    } catch (err) {
        next(err)
    }
}

export const getidRoom = async (req, res, next) => {
    try {
        const Room = await room.findById(req.params.id,)
        res.status(200).json(Room)
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updateroom = await Room.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updateroom)
    } catch (err) {
        next(err)
    }
}

export const deleteroom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    try {
        await room.findByIdAndDelete(req.params.id,)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            })

        } catch (err) {
            next(err)
        }
        res.status(200).json("Delete room !")
    } catch (err) {
        next(err)
    }
}

export const getallroom = async (req, res, next) => {
    try {
        const rooms = await room.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
}