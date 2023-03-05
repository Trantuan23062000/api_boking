import hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createhotel = async (req, res, next) => {
    const newhotel = new hotel(req.body)
    try {
        const savehotel = await newhotel.save()
        res.status(200).json(savehotel)

    } catch (err) {
        next(err)
    }
}

export const getidHotel = async (req, res, next) => {
    try {
        const Hotel = await hotel.findById(req.params.id,)
        res.status(200).json(Hotel)
    } catch (err) {
        next(err)
    }
}

export const updatehotel = async (req, res, next) => {
    try {
        const updatehotel = await hotel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updatehotel)
    } catch (err) {
        next(err)
    }
}

export const deletehotel = async (req, res, next) => {
    try {
        await hotel.findByIdAndDelete(req.params.id,)
        res.status(200).json("Delete hotel !")
    } catch (err) {
        next(err)
    }
}



export const countbycity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countbytype = async (req, res, next) => {
    try {
        const hotelCount = await hotel.countDocuments({ type: "hotel" })
        const aparmentCount = await hotel.countDocuments({ type: "apartment" })
        const resortCount = await hotel.countDocuments({ type: "resort" })
        const vilaCount = await hotel.countDocuments({ type: "vila" })
        const cabins = await hotel.countDocuments({ type: "cabins" })

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: aparmentCount },
            { type: "resort", count: resortCount },
            { type: "vila", count: vilaCount },
            { type: "cabins", count: cabins }
        ])

    } catch (err) {
        next(err)
    }
}

export const getHotels = async (req, res, next) => {


    const { min, max, limit, ...others } = req.query
    try {

        const hotels = await hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 500 },
        }).limit(limit)
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }

}

export const getHotelRooms = async (req, res, next) => {
    try {
        const Hotel = await hotel.findById(req.params.id)
        const list = await Promise.all(
            Hotel.rooms.map((room) => {
                return Room.findById(room)
            })
        )
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}