import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement  = pkg(mongoose);
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
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
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    roleId: {
        type: String
    },
    phoneNumber: {
        type: Number
    }
});
userSchema.plugin(AutoIncrement, { inc_field: 'userId', start_seq: 1 });

const User = mongoose.model('Users', userSchema);

export default User;