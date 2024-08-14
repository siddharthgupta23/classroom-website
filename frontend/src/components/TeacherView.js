// TeacherView.js (similar to StudentView)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TeacherView.scss';

// function TeacherView() {
//     const [students, setStudents] = useState([]);
//     const [timetable, setTimetable] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const token = localStorage.getItem('token');
//                 const [studentsRes, timetableRes] = await Promise.all([
//                     axios.get('http://localhost:6082/api/classrooms/students', {
//                         headers: { 'x-auth-token': token }
//                     }),
//                     axios.get('http://localhost:6082/api/timetable', {
//                         headers: { 'x-auth-token': token }
//                     })
//                 ]);
//                 setStudents(studentsRes.data);
//                 setTimetable(timetableRes.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//         fetchData();
//     }, []);

//     return (
//         <div>
//             <h1>Teacher Dashboard</h1>
//             <h2>Students</h2>
//             <ul>
//                 {students.map((student, index) => (
//                     <li key={index}>{student.name} - {student.email}</li>
//                 ))}
//             </ul>
//             <h2>Timetable</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Day</th>
//                         <th>Period</th>
//                         <th>Subject</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {timetable.map((period, index) => (
//                         <tr key={index}>
//                             <td>{period.day}</td>
//                             <td>{period.period}</td>
//                             <td>{period.subject}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default TeacherView;

function TeacherView() {
    const [performance, setPerformance] = useState([]);
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        async function fetchPrincipalData() {
            try {
                const performanceRes = await axios.get('http://localhost:6082/api/principal/performance');
                const timetableRes = await axios.get('http://localhost:6082/api/principal/timetable');
                setPerformance(performanceRes.data);
                setTimetable(timetableRes.data);
            } catch (err) {
                console.error('Error fetching principal data:', err);
            }
        }
        fetchPrincipalData();
    }, []);

    return (
        <div class="principal-view">
            <h2>Teacher Dashboard</h2>
            <h3>Student Performance</h3>
            <table>
                <thead>
                    <tr>
                        <th>Subjects</th>
                        <th>Marks</th>
                        <th>Grade</th>
                        <th>Performance</th>
                    </tr>
                </thead>
                <tbody>
    {performance.map((item) => (
        <tr key={item._id}>
            <td>{item.subject}</td>
            <td>{item.score}</td>
            <td>{item.grade}</td>
            <td>{item.remarks}</td>
        </tr>
    ))}
</tbody>
            </table>

            <h3>Timetable</h3>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Period</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((item) => (
                        <tr key={item._id}>
                            <td>{item.day}</td>
                            <td>{item.period}</td>
                            <td>{item.subject}</td>
                            <td>{item.teacherId.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeacherView;