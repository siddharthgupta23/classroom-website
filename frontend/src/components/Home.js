import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.scss';

const Home = () => {
    const photos = [
        { id: 1, src: 'classroom.jpg', alt: 'Classroom 1' },
        { id: 2, src: 'classroom1.jpg', alt: 'Classroom 2' },
        { id: 3, src: 'classroomm.jpg', alt: 'Classroom 3' },
    ];

    const subjects = [
        { id: 1, name: 'Mathematics', description: 'Mathematics is the abstract science of number, quantity, and space.' },
        { id: 2, name: 'Science', description: 'Science involves the systematic study of the structure and behavior of the physical and natural world.' },
        { id: 3, name: 'History', description: 'History is the study of past events, particularly in human affairs.' },
    ];

    return (
        <div className="home-container">
            <header className="header">
                <nav className="navbar">
                    <Link to="/login" className="nav-item">Login</Link>
                    <Link to="/signup" className="nav-item">Sign Up</Link>
                    <Link to="/dashboard" className="nav-item">Dashboard</Link>
                    <Link to="/principalview" className="nav-item">Principal View</Link>
                    <Link to="/teacherview" className="nav-item">Teacher View</Link>
                    <Link to="/studentview" className="nav-item">Student View</Link>
                </nav>
                <h1>Welcome to the Classroom Management System</h1>
            </header>

            <div className="home-content">
                <div className="classroom-photos">
                    {photos.map(photo => (
                        <img key={photo.id} src={photo.src} alt={photo.alt} />
                    ))}
                </div>

                <div className="subjects">
                    <h2>Subjects Taught</h2>
                    {subjects.map(subject => (
                        <div key={subject.id} className="subject">
                            <h3>{subject.name}</h3>
                            <p>{subject.description}</p>
                        </div>
                    ))}
                </div>

                <div className="contact">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or need further information, please <Link to="/contact">contact us</Link>.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
