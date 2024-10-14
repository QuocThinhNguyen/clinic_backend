import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const { Schema } = mongoose;

const bookingSchema = new Schema({
    bookingID: {
        type: Number,
        unique: true
    },
    status: {
        type: String,
        ref: 'AllCodes',
        required: true
    },
    doctorID: {
        type: Number,
        ref: 'Doctor_info',
        required: true
    },
    patientID: {
        type: Number,
        ref: 'Users',
        required: true
    },
    patientRecordID: {
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

bookingSchema.plugin(AutoIncrement, { inc_field: 'bookingID', start_seq: 1 });
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;