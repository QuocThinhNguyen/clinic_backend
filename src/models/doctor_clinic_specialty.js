import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement  = pkg(mongoose);

const { Schema } = mongoose;

const doctorClinicSpecialtySchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    doctorId: {
        type: Number,
        ref: 'Doctor_info',
        required: true
    },
    clinicId: {
        type: Number,
        ref: 'Clinic',
        required: true
    },
    specialtyId: {
        type: Number,
        ref: 'Specialty',
        required: true
    }
});

doctorClinicSpecialtySchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });
const DoctorClinicSpecialty = mongoose.model('DoctorClinicSpecialty', doctorClinicSpecialtySchema);

export default DoctorClinicSpecialty;