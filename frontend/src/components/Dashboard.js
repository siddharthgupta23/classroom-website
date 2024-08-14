
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.scss';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:6082/api/auth/me', {
                    headers: { 'x-auth-token': token }
                });
                setUser(res.data);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };
        fetchData();
    }, [navigate]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            {user.role === 'Principal' && <PrincipalView />}
            {user.role === 'Teacher' && <TeacherView />}
            {user.role === 'Student' && <StudentView />}
        </div>
    );
}

function PrincipalView() {
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
        <div class="dashboard">
            <h2>Principal Dashboard</h2>
            <h3>Student Performance</h3>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
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
        <div class="teacher-view">
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

export default Dashboard;
