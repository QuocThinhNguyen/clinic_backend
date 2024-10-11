import mongoose from "mongoose";

async function connectMongoDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Clinic", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectMongoDB