import mongoose from 'mongoose';
import { AutoIncrement } from 'mongoose-sequence';  // Import AutoIncrement

const { Schema } = mongoose;

const historySchema = new Schema({
    idHistory: {
        type: Number,
        unique: true
    },
    patientId: {
        type: Number,
        ref: 'Users',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor_info',
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

historySchema.plugin(AutoIncrement, { inc_field: 'idHistory' });
const History = mongoose.model('History', historySchema);

export default History;