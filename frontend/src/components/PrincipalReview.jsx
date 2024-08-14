// // src/components/PrincipalView.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function PrincipalView() {
//     const [teachers, setTeachers] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [classrooms, setClassrooms] = useState([]);

//     useEffect(() => {
//         // Fetch teachers, students, and classrooms
//         async function fetchData() {
//             try {
//                 const [teachersRes, studentsRes, classroomsRes] = await Promise.all([
//                     axios.get('http://localhost:6082/api/auth/teachers'),
//                     axios.get('http://localhost:6082/api/auth/students'),
//                     axios.get('http://localhost:6082/api/classrooms')
//                 ]);
//                 setTeachers(teachersRes.data);
//                 setStudents(studentsRes.data);
//                 setClassrooms(classroomsRes.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//         fetchData();
//     }, []);

//     return (
//         <div>
//             <h1>Principal Dashboard</h1>
//             <h2>Teachers</h2>
//             {/* Render teacher list */}
//             <h2>Students</h2>
//             {/* Render student list */}
//             <h2>Classrooms</h2>
//             {/* Render classroom list */}
//         </div>
//     );
// }

// export default PrincipalView;
// src/components/PrincipalView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PrincipalReview.scss';

function PrincipalView() {


    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [day, setDay] = useState('');
    const [period, setPeriod] = useState('');
    const [subject, setSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [classroomName, setClassroomName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [days, setDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const [teachersRes, studentsRes] = await Promise.all([
                    axios.get('http://localhost:6082/api/principal/teachers'),
                    axios.get('http://localhost:6082/api/principal/students')
                ]);
                setTeachers(teachersRes.data);
                setStudents(studentsRes.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);
    const handleSelectionChange = (e) => {
        setSelectedTeacher(e.target.value);
    };


    const handleTimetableSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:6082/api/principal/timetable', {
                day,
                period,
                subject,
                teacherId: selectedTeacher
            });
            alert('Timetable created successfully');
        } catch (error) {
            console.error('Error creating timetable:', error);
            alert('Failed to create timetable');
        }
    };
    const handleClassroomSubmit = async (event) => {
        event.preventDefault();
    
        const selectedDays = Object.keys(days).filter((day) => days[day]);
    
        try {
            await axios.post('http://localhost:6082/api/principal/create', {
                name: classroomName,
                startTime,
                endTime,
                days: selectedDays
            });
            alert('Classroom created successfully');
        } catch (error) {
            console.error('Error creating classroom:', error);
            alert('Failed to create classroom');
        }
    };
    

    return (
        <div className="principal-view">
            <h1>Principal Dashboard</h1>

            {/* Display Teachers */}
            <h2>Teachers</h2>
            <table className="teacher-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Display Students */}
            <h2>Students</h2>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Timetable Form */}
            <h2>Create Timetable</h2>
            <form onSubmit={handleTimetableSubmit}>
                <label>Day:</label>
                <input type="text" value={day} onChange={(e) => setDay(e.target.value)} required />

                <label>Period:</label>
                <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} required />

                <label>Subject:</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />

                <label htmlFor="teacher-select">Select a teacher:</label>
                <select
                id="teacher-select"
                value={selectedTeacher}
                onChange={handleSelectionChange}
                required
            >
                    <option value="">Select a teacher</option>
                    {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                    ))}
                </select>

                <button type="submit">Create Timetable</button>
            </form>
            <h2>Create Classroom</h2>
<form onSubmit={handleClassroomSubmit}>
    <label>Classroom Name:</label>
    <input
        type="text"
        value={classroomName}
        onChange={(e) => setClassroomName(e.target.value)}
        required
    />

    <label>Start Time:</label>
    <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
    />

    <label>End Time:</label>
    <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
    />

    <label>Days:</label>
    {Object.keys(days).map((day) => (
        <div key={day}>
            <input
                type="checkbox"
                checked={days[day]}
                onChange={(e) => setDays({ ...days, [day]: e.target.checked })}
            />
            <label>{day}</label>
        </div>
    ))}

    <button type="submit">Create Classroom</button>
</form>

        </div>
    );
}

export default PrincipalView;
