// server.js
const express = require('express');
const mongoose = require('mongoose');
const Teacher = require('./models/Teacher');
const cors = require('cors');
const dotenv = require('dotenv');
const multer=require('multer');
const Student = require('./models/Student');
const StudentPerformance = require('./models/StudentPerformance');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log('MongoDB Connected')
    return Teacher.insertMany([
        { name: 'John Doe', email: 'john.doe@gmail.com', role: 'Teacher' },
        { name: 'Jane Smith', email: 'jane.smith@gmail.com', role: 'Teacher' }
    ]);
})
    .catch(err => console.log(err));

const PORT = process.env.PORT || 6082;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const authRoutes = require('./routes/auth');

const principalRoutes = require('./routes/principal');
const studentRoutes=require('./routes/student');

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/principal', principalRoutes);

console.log(authRoutes);
console.log(studentRoutes);
console.log(principalRoutes);
