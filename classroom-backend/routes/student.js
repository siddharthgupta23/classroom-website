const express = require('express');
const router = express.Router();
const Message = require('../models/message');



router.post('/contact', async (req, res) => {
    const { email, phone, message } = req.body;

    
    if (!email || !message) {
        return res.status(400).send('Email and message are required');
    }

 
    try {
        const newMessage = new Message({ email, phone, message });
        await newMessage.save();
        res.status(200).send('Message received successfully');
    } catch (dbError) {
        console.error('Error saving message to database:', dbError.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
