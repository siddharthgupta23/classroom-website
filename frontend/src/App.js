// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import StudentView from './components/StudentView';
import TeacherView from './components/TeacherView';
import PrincipalView from './components/PrincipalReview';
import Contact from './components/Contactus';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/SignUp" element={<Signup/>} />
                <Route path="/Dashboard" element={<Dashboard/>} />
                <Route path="/StudentView" element={<StudentView/>} />
                <Route path="/TeacherView" element={<TeacherView/>} />
                <Route path="/PrincipalView" element={<PrincipalView/>}/>
                <Route path="/contact" element={<Contact/>}/>
                
            </Routes>
        </Router>
    );
}

export default App;
