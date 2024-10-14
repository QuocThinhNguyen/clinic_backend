import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const { Schema } = mongoose;

const pationRecodeSchema = new Schema({
    patientRecordID: {
        type: Number,
        unique: true
    },
    patientID: {
        type: Number,
        unique: true,
        ref: 'Users',
    },
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    birthDate: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    CCCD: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

bookingSchema.plugin(AutoIncrement, { inc_field: 'patientRecordID', start_seq: 1 });
const PationRecords = mongoose.model('PationRecords', pationRecodeSchema);

export default PationRecords;