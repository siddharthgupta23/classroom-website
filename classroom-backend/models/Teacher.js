// models/Teacher.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['Principal', 'Teacher'] },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
