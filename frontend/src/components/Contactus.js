import React, { useState } from 'react';
import '../styles/Contact_Us.scss';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            email,
            phone,
            message
        };

        try {
            const response = await fetch('http://localhost:6082/api/student/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            console.log('Success:', result);
            setStatus('Message sent successfully');
        } catch (error) {
            console.error('Error:', error);
            setStatus('Failed to send message');
        }
    };
    
    return (
        <div className="contact-container">
            <h1>Contact Support</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Phone Number:</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <label>Message:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Send Message</button>
                {status && <p className="status-message">{status}</p>}
            </form>
        </div>
    );
};

export default Contact;
