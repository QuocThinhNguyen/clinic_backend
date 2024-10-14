import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const { Schema } = mongoose;

const doctorInfoSchema = new Schema({
    doctorInforID: {
        type: Number,
        unique: true
    },
    doctorID: {
        type: Number,
        ref: 'Doctor_info',
        required: true
    },
    specialtyID: {
        type: Number,
        ref: 'Specialty',
        required: true
    },
    clinicID: {
        type: Number,
        ref: 'Clinic',
        required: true
    },
    price: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    position: {
        type: String,
        required: true,
        ref: 'Allcodes'
    }
});

doctorInfoSchema.plugin(AutoIncrement, { inc_field: 'doctorInforID', start_seq: 1 });
const DoctorInfo = mongoose.model('DoctorInfo', doctorInfoSchema);

export default DoctorInfo;