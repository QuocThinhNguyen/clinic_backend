import mongoose from 'mongoose';

const { Schema } = mongoose;

// Định nghĩa schema cho User
const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    }
});

// Tạo mô hình User từ schema
const User = mongoose.model('User', userSchema);

export default User;