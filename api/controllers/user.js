import user from "../models/User.js"


export const getidUser = async (req, res, next) => {
    try {
        const User = await user.findById(req.params.id,)
        res.status(200).json(User)
    } catch (err) {
        next(err)
    }
}

export const updateuser = async (req, res, next) => {
    try {
        const updateuser = await user.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updateuser)
    } catch (err) {
        next(err)
    }
}

export const deleteuser = async (req, res, next) => {
    try {
        await user.findByIdAndDelete(req.params.id,)
        res.status(200).json("Delete user !")
    } catch (err) {
        next(err)
    }
}

export const getalluser = async (req, res, next) => {
    try {
        const users = await user.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}