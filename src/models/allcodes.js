import mongoose from 'mongoose';
import { AutoIncrement } from 'mongoose-sequence';  // Import AutoIncrement

const { Schema } = mongoose;

const allCodesSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    key: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    valueEn: {
        type: String,
        required: true
    },
    valueVi: {
        type: String,
        required: true
    }
});

allCodesSchema.plugin(AutoIncrement, { inc_field: 'id' });
const AllCodes = mongoose.model('AllCodes', allCodesSchema);

export default AllCodes;