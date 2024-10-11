import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement  = pkg(mongoose);

const { Schema } = mongoose;

const specialtySchema = new Schema({
    id: {
        type: Number,
        unique: true
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

specialtySchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

const Specialty = mongoose.model('Specialty', specialtySchema);

export default Specialty;