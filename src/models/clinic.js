import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement  = pkg(mongoose);

const { Schema } = mongoose;

const clinicSchema = new Schema({
    id: {
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
    }
});

clinicSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });
const Clinic = mongoose.model('Clinic', clinicSchema);

export default Clinic;