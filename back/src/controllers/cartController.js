import expressAsyncHandler from "express-async-handler";
import cartModel from "../models/cartModel";


export const getCarts = expressAsyncHandler(async (req, res) =>{
    const carts = await cartModel.find();
    res.status(200).send(carts);
})

export const getCart = expressAsyncHandler(async (req, res) => {
    const cart = await cartModel.findById(req.params.id);
    if (cart) {
        res.status(200).json(cart);
    }
    else {
        res.status(400).json({
            message: 'cart not found'
        })
    }
});

export const getCartOfUser = expressAsyncHandler(async (req, res) => {
    const cart = await cartModel.find({user: req.params.id});
    if (cart) {
        res.status(200).json(cart);
    }
    else {
        res.status(400).json({
            message: 'cart not found'
        })
    }
});

export const setCart = expressAsyncHandler(async (req, res) => {
    if (req.body) {
        if (req.body.user && req.body.product && req.body.amount) {
            const existingCart = await cartModel.findOne({
                user: req.body.user, 
                product:  req.body.product
            });
            if (existingCart) {
                const updatedCart = await cartModel.findByIdAndUpdate(existingCart._id, {
                    amount: existingCart.amount + req.body.amount
                });
                updatedCart.amount += req.body.amount;
                if (updatedCart) {
                    res.status(200).json(updatedCart)
                }
                else {
                    res.status(400).json({
                        message: 'error occured while updating cart'
                    })
                }
            }
            else {
                const createdCart = await cartModel.create(req.body);
                if (createdCart) {
                    res.status(200).json(createdCart);
                }
                else {
                    res.status(500).json({
                        message: 'error occured while creating cart'
                    })
                }
            }

        }
        else {
            res.status(400).json({
                message: 'body does not have proper data'
            })
        }
    }
    else {
        res.status(400).json({
            message: 'body does not have data'
        })
    }
})

export const updateCart = expressAsyncHandler(async (req, res) => {
    const updatedCart = await cartModel.findByIdAndUpdate(req.params.id, req.body);
    updatedCart.amount = req.body.amount;

    if (updateCart) {
        res.status(200).json(updatedCart);
    }
    else {
        res.status(400).json({
            message: 'cart not updated'
        })
    }
})

export const updateCartOfUser = expressAsyncHandler(async (req, res) => {
    if (req.body) {
        const updatedCart = await cartModel.findOneAndUpdate({
            user: req.params.user,
            product: req.params.product
        }, {
            amount: req.body.amount
        });

        if (updatedCart) {
            res.status(200).json(updatedCart);
        }
        else {
            res.status(500).json({
                message: 'error occured while updating cart'
            })
        }
    }
    else {
        res.status(400).json({
            message: 'body does not have data'
        })
    }
})

export const deleteCart = expressAsyncHandler(async (req, res) => {
    const deletedCart = await cartModel.findByIdAndDelete(req.params.id);
    if (deletedCart) {
        res.status(200).json(deletedCart);
    }
    else {
        res.status(400).json({
            message: 'cart not deleted'
        })
    }
})

export const deleteCartOfUser = expressAsyncHandler(async (req, res) => {
    const cart = await cartModel.findOneAndDelete({
        user: req.params.user,
        product: req.params.product
    });
    if (cart) {
        res.status(200).json({id: cart._id})
    }
    else {
        res.status(404).json({
            message: 'cart not found'
        })
    }
})