import mongoose from 'mongoose';
import { AutoIncrement } from 'mongoose-sequence';  // Import AutoIncrement

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

specialtySchema.plugin(AutoIncrement, { inc_field: 'id' });

const Specialty = mongoose.model('Specialty', specialtySchema);

export default Specialty;