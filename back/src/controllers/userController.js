import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import userModel from "../models/userModel";
import jwt from 'jsonwebtoken';

export const getUser = expressAsyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id);
    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(404).json({
            message: 'user not found'
        })
    }
})

export const loginUser = expressAsyncHandler(async (req, res) => {
    if (req.body) {
        if (req.body.email && req.body.password) {
            const {email, password} = req.body;
            const user = await userModel.findOne({email});

            if (user && (await bcrypt.compare(password, user.password))) {
                const responseData = {
                    id: user._id,
                    email: user.email,
                    token: generateJWT(user._id)
                };

                res.status(200).json(responseData);
            }
            else {
                res.status(400).json({
                    message: 'invalid authentication credentials'
                })
            }
        }
        else {
            res.status(400).json({
                message: 'authentication credentials required!'
            })
        }
    }
    else {
        res.status(400).json({
            message: 'authentication credentials required!'
        })
    }
})

export const registerUser = expressAsyncHandler(async (req, res) => {
    if (req.body) {
        if (req.body.name && req.body.password && req.body.email && req.body.phone) {
            const exists = await userModel.find({
                email: req.body.email
            })[0];

            if (exists) {
                return res.status(400).json({
                    message: 'User already registered!'
                })
            }

            const passwordHashSalt = await bcrypt.genSalt(12);
            const passwordHash  = await bcrypt.hash(req.body.password, passwordHashSalt);

            const user = await userModel.create({
                name: req.body.name,
                phone: req.body.phone,
                password: passwordHash,
                email: req.body.email
            });

            if (user) {
                const responseData = {
                    id: user._id,
                    email: user.email,
                    token: generateJWT(user._id)
                };

                res.status(200).json(responseData);
            }
            else {
                res.status(500).json({
                    message: 'error occured while registering user'
                })
            }
        }
        res.status(400).json({
            message: 'authentication credentials required!'
        })
    }
    else {
        res.status(400).json({
            message: 'authentication credentials required!'
        })
    }
})

const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECURITY_KEY, {
        expiresIn: '3h'
    });
}