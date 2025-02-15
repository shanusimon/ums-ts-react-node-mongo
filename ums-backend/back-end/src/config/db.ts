import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path'


dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string || 'mongodb://localhost:27017/ums');
        console.log("MongoDB Connected...")
    } catch (error) {
        console.error("MongoDB connection Failed");
        process.exit(1);
    }
}

export default connectDB