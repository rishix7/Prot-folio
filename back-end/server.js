require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // For serving static files

const Contact = require('./models/Contact'); // Import the Contact model

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow Content-Type and other headers if needed
}));
app.use(express.json()); // To parse JSON bodies from incoming requests
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Serve static files (your frontend HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public'))); // If you have a 'public' folder for static assets
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve your index.html
});


// MongoDB Connection
const connectDB = async () => {
    try{
        const connection = await mongoose.connect(MONGODB_URI);
        console.log("Database Connected :",connection.connections.length)
    }catch(err){
        console.error(err)
    }
}
connectDB()
// API Endpoint to handle form submission
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Email format validation (already in schema, but good to have a quick check here too)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    try {
        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save(); // Save the data to MongoDB
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact message:', error);
        // Check for specific Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: errors.join(', ') });
        }
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});