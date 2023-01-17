import express from 'express';
import { 
    getUser, loginUser, registerUser
} from '../controllers/userController';

import protector from '../protector';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/me', protector, getUser);

export default userRouter;