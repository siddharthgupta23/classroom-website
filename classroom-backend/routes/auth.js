// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, role });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/me', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// module.exports = router;



// Create Classroom
router.post('/classroom', async (req, res) => {
    const { name } = req.body;
    try {
        const classroom = new Classroom({ name });
        await classroom.save();
        res.status(201).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Assign Teacher to Classroom
router.put('/classroom/:id/assign-teacher', async (req, res) => {
    const { teacherId } = req.body;
    try {
        const classroom = await Classroom.findById(req.params.id);
        if (classroom.teacher) return res.status(400).json({ msg: 'Classroom already has a teacher' });
        classroom.teacher = teacherId;
        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Student to Classroom
router.put('/classroom/:id/add-student', async (req, res) => {
    const { studentId } = req.body;
    try {
        const classroom = await Classroom.findById(req.params.id);
        classroom.students.push(studentId);
        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Timetable
router.post('/classroom/:id/timetable', async (req, res) => {
    const { timetable } = req.body;
    try {
        const classroom = await Classroom.findById(req.params.id);
        classroom.timetable = timetable;
        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
