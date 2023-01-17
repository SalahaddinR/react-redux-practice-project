import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    product: {
        type: String,
        ref: 'Product',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const cartModel = mongoose.model('Cart',cartSchema);
export default cartModel;
