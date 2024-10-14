import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const { Schema } = mongoose;

const scheduleSchema = new Schema({
    scheduleID: {
        type: Number,
        unique: true
    },
    doctorID: {
        type: Number,
        ref: 'Doctor_info',
        required: true
    },
    currentNumber: {
        type: Number,
        required: true
    },
    maxNumber: {
        type: Number,
        required: true
    },
    scheduleDate: {
        type: Date,
        required: true
    },
    timeType: {
        type: String,
        required: true
    }
});

scheduleSchema.plugin(AutoIncrement, { inc_field: 'scheduleID', start_seq: 1 });

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;