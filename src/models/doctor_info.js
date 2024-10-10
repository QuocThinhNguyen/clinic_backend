import mongoose from 'mongoose';
import { AutoIncrement } from 'mongoose-sequence';  // Import AutoIncrement

const { Schema } = mongoose;

const doctorInfoSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    doctorId: {
        type: Number,
        ref: 'Doctor_info',
        required: true
    },
    priceId: {
        type: String,
        ref: 'AllCodes',
        required: true
    },
    provinceId: {
        type: String,
        ref: 'AllCodes',
        required: true
    },
    paymentId: {
        type: String,
        ref: 'AllCodes',
        required: true
    },
    addressClinic: {
        type: String,
        ref: 'Clinic',
        required: true
    },
    nameClinic: {
        type: String,
        ref: 'Clinic',
        required: true
    },
    note: {
        type: String
    },
    count: {
        type: Number,
        default: 0
    }
});

doctorInfoSchema.plugin(AutoIncrement, { inc_field: 'id' });
const DoctorInfo = mongoose.model('DoctorInfo', doctorInfoSchema);

export default DoctorInfo;