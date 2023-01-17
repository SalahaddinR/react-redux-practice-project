import express from 'express';
import {
    getProduct, getProducts, 
    setProduct, deleteProduct, updateProduct
} from '../controllers/productController';

const productRouter = express.Router();

productRouter.route('/')
    .get(getProducts)
    .post(setProduct);

productRouter.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

export default productRouter;