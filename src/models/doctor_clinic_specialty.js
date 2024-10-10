import mongoose from 'mongoose';
import { AutoIncrement } from 'mongoose-sequence';  // Import AutoIncrement

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

doctorClinicSpecialtySchema.plugin(AutoIncrement, { inc_field: 'id' });
const DoctorClinicSpecialty = mongoose.model('DoctorClinicSpecialty', doctorClinicSpecialtySchema);

export default DoctorClinicSpecialty;