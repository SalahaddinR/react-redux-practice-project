import expressAsyncHandler from "express-async-handler";
import productModal from "../models/productModel";

export const getProduct = expressAsyncHandler(async (req, res) => {
    const product = await productModal.findById(req.params.id);
    if (product) {
        res.status(200).json(product);
    }
    else {
        res.status(404).json({
            message: 'product not found'
        })
    }
})

export const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await productModal.find();
    if (products) {
        res.status(200).json(products)
    }
    else {
        res.status(500).json({
            message: 'error happened while getting products'
        })
    }
})

export const setProduct = expressAsyncHandler(async (req, res) => {
    if (req.body) {
        if (req.body.name && req.body.price && req.body.image) {
            const product = await productModal.create(req.body);
            if (product) {
                res.status(200).json(product)
            }
            else {
                res.status(500).json({
                    message: 'error happened while setting products'
                })
            }
        }
        else {
            res.status(400).json({
                message: 'invalid body data'
            })
        }
    }
    else {
        res.status(400).json({
            message: 'body does not have data'
        })
    }
})

export const updateProduct = expressAsyncHandler(async (req, res) => {
    if (req.body.name || req.body.price || req.body.image) {
        const product = await productModal.findByIdAndUpdate(req.params.id, req.params.body);
        if (product) {
            res.status(200).json(product)
        }
        else {
            res.status(500).json({
                message: 'error happened while setting products'
            })
        }
    }
    else {
        res.status(400).json({
            message: 'body does not have data'
        })
    }
})

export const deleteProduct = expressAsyncHandler(async (req, res) => {
    const product = await productModal.findByIdAndDelete(req.params.id);
    if (product) {
        res.status(200).json({
            id: product._id
        })
    }
    else {
        res.status(404).json({
            message: 'product does not found'
        })
    }
})