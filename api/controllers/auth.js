import user from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newuser = new user({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            city: req.body.city,
            country: req.body.country,
            img: req.body.img,
        })
        await newuser.save()
        res.send({ status: "Đăng kí thành công !" })
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const User = await user.findOne({ username: req.body.username });
        if (!User) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            User.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            { id: User._id, isAdmin: User.isAdmin },
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = User._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};