// models/StudentPerformance.js
const mongoose = require('mongoose');

const studentPerformanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    score: { type: Number, required: true },
    grade: { type: String, required: true },
    remarks: { type: String },
});

const StudentPerformance = mongoose.model('StudentPerformance', studentPerformanceSchema);

module.exports = StudentPerformance;
