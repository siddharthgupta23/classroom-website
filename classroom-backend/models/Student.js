// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['Student'] },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }
});

module.exports = mongoose.model('Student', StudentSchema);


// const timetableSchema = new mongoose.Schema({
//     classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
//     subject: { type: String, required: true },
//     startTime: { type: String, required: true },
//     endTime: { type: String, required: true },
//     // Add any other fields you may need
// });

// module.exports = mongoose.model('Timetable', timetableSchema);
