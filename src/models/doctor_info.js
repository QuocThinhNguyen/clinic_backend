import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const { Schema } = mongoose;

const doctorInfoSchema = new Schema({
    doctorInforId: {
        type: Number,
        unique: true
    },
    doctorId: {
        type: Number,
        ref: 'Doctor_info',
        required: true
    },
    specialtyId: {
        type: Number,
        ref: 'Specialty',
        required: true
    },
    clinicId: {
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
    },
    description: {
        type: String
    }
});

doctorInfoSchema.plugin(AutoIncrement, { inc_field: 'doctorInforId', start_seq: 1 });
const DoctorInfo = mongoose.model('DoctorInfo', doctorInfoSchema);

export default DoctorInfo;