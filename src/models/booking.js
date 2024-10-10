import mongoose from 'mongoose';
import { AutoIncrement } from 'mongoose-sequence';  // Import AutoIncrement

const { Schema } = mongoose;

const bookingSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    statusId: {
        type: String,
        ref: 'AllCodes',
        required: true
    },
    doctorId: {
        type: Number,
        ref: 'Doctor_info',
        required: true
    },
    patientId: {
        type: Number,
        ref: 'Users',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeType: {
        type: String,
        required: true
    }
});

bookingSchema.plugin(AutoIncrement, { inc_field: 'id' });
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;