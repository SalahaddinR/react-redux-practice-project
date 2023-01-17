import express from 'express';
import connectMongoDB from './database';
import { config } from 'dotenv';
import cors from 'cors';

import productRouter from './routers/productRouter';
import userRouter from './routers/userRouter';
import cartRouter from './routers/cartRouter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

config(); connectMongoDB();

const PORT = process.env.PORT || 7000;

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})