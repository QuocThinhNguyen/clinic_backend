import mongoose from 'mongoose';
import { AutoIncrement } from 'mongoose-sequence';  // Import AutoIncrement

const { Schema } = mongoose;

const scheduleSchema = new Schema({
    idSche: {
        type: Number,
        unique: true
    },
    currentNumber: {
        type: Number,
        required: true
    },
    maxNumber: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeType: {
        type: String,
        required: true
    },
    doctorId: {
        type: Number,
        ref: 'Doctor_info',
        required: true
    }
});

scheduleSchema.plugin(AutoIncrement, { inc_field: 'idSche' });

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;