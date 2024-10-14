import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const { Schema } = mongoose;

const bookingSchema = new Schema({
    bookingId: {
        type: Number,
        unique: true
    },
    status: {
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
    patientRecordId: {
        type: Number,
        ref: 'PatientRecord',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    timeType: {
        type: String,
        required: true
    }
});

bookingSchema.plugin(AutoIncrement, { inc_field: 'bookingId', start_seq: 1 });
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;