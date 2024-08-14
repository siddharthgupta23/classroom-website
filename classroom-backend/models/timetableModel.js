const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    subject: { type: String, required: true },
    period:{type: Number,required: true},
    day: { type: String, required: true }, // 'Monday', 'Tuesday', ...
});

module.exports = mongoose.model('Timetable', timetableSchema);
