import jwt from 'jsonwebtoken';
import expressAsyncHandler from "express-async-handler";
import userModel from './models/userModel';

const protector = expressAsyncHandler(async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            const verifiedToken = jwt.verify(token, process.env.JWT_SECURITY_KEY);
            req.user = await userModel.findById(verifiedToken.id);
            next();
        }
    }
    catch(error) {
        res.status(400).json({
            message: 'invalid token'
        })
    }

    if (!token) {
        res.status(401).json({
            message: 'Not authorized'
        })
    }
})

export default protector;