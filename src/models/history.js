import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const { Schema } = mongoose;

const historySchema = new Schema({
    historyID: {
        type: Number,
        unique: true
    },
    patientID: {
        type: Number,
        ref: 'Users',
        required: true
    },
    patientRecordID: {
        type: Number,
        ref: 'PatientRecord',
        required: true
    },
    doctorID: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor_info',
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

historySchema.plugin(AutoIncrement, { inc_field: 'historyID', start_seq: 1 });
const History = mongoose.model('History', historySchema);

export default History;