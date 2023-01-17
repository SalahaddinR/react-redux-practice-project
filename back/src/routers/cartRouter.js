import express from 'express';
import {
    getCart, setCart, updateCart, deleteCart, getCarts,
    getCartOfUser, updateCartOfUser, deleteCartOfUser
} from '../controllers/cartController';
import protector from '../protector';

const cartRouter = express.Router();
cartRouter.use(protector);

cartRouter.route('/:id')
    .get(getCart)
    .put(updateCart)
    .delete(deleteCart);

cartRouter.route('/').post(setCart).get(getCarts);
cartRouter.get('/user/:id', getCartOfUser)

cartRouter.route('/:user/:product')
    .put(updateCartOfUser)
    .delete(deleteCartOfUser)

export default cartRouter;