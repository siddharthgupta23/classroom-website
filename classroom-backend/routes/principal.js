// routes/principal.js
const express = require('express');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Classroom = require('../models/Classroom');
const Timetable = require('../models/timetableModel');

const router = express.Router();


router.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/classrooms', async (req, res) => {
    try {
        const classrooms = await Classroom.find()
            .populate('teacher', 'name')
            .populate('students', 'name');
        res.json(classrooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/timetable', async (req, res) => {
    const { day, period, subject, teacherId } = req.body;

    try {
        const newTimetable = new Timetable({ day, period, subject, teacherId });
        await newTimetable.save();
        res.status(201).send('Timetable created successfully');
    } catch (error) {
        res.status(500).send('Error creating timetable: ' + error.message);
    }
});


router.get('/timetable', async (req, res) => {
    try {
        const timetables = await Timetable.find().populate('teacherId');
        res.json(timetables);
    } catch (error) {
        res.status(500).send('Error fetching timetables: ' + error.message);
    }
});
// Create a new classroom
router.post('/create', async (req, res) => {
    const { name, startTime, endTime, days } = req.body;
    try {
        const newClassroom = new Classroom({ name, startTime, endTime, days });
        await newClassroom.save();
        res.status(201).json(newClassroom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// routes/principal.js
const StudentPerformance = require('../models/StudentPerformance');


// Route to get student performance data
router.get('/performance', async (req, res) => {
    try {
        const performanceData = await StudentPerformance.find().populate('studentId');
        res.status(200).json(performanceData);
    } catch (error) {
        console.error('Error fetching student performance data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;



module.exports = router;