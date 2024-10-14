import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const { Schema } = mongoose;

const clinicSchema = new Schema({
    clinicID: {
        type: Number,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    email: {
        type: String
    }
});

clinicSchema.plugin(AutoIncrement, { inc_field: 'clinicID', start_seq: 1 });
const Clinic = mongoose.model('Clinic', clinicSchema);

export default Clinic;