import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement  = pkg(mongoose);

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

historySchema.plugin(AutoIncrement, { inc_field: 'idHistory', start_seq: 1 });
const History = mongoose.model('History', historySchema);

export default History;