import mongoose from "mongoose";
mongoose.set('strictQuery', false)

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB started on ${conn.connection.host}`)
    }    
    catch (error) {
        process.exit();
    }
}

export default connectMongoDB;