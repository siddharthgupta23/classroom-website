import React from "react";
import { useState, useEffect }  from "react";
import axios  from 'axios';
import "../styles/Student_View.scss";


function StudentView() {
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        async function fetchStudentTimetable() {
            try {
                const res = await axios.get('http://localhost:6082/api/principal/timetable');
                setTimetable(res.data);
            } catch (err) {
                console.error('Error fetching student timetable:', err);
            }
        }
        fetchStudentTimetable();
    }, []);

    const handleAttendClass = (classId) => {
        // Implement attend class functionality
        console.log(`Attending class: ${classId}`);
    };

    return (
        <div className='student-view'> 
            <h2>Student Dashboard</h2>
            <h3>Your Timetable</h3>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Period</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((item) => (
                        <tr key={item._id}>
                            <td>{item.day}</td>
                            <td>{item.period}</td>
                            <td>{item.subject}</td>
                            <td>{item.teacherId.name}</td>
                            <td>
                                <button onClick={() => handleAttendClass(item._id)}>
                                    Attend Class
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default StudentView;
