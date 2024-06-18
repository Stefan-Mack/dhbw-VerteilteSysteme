// Import necessary modules
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware setup
app.use(express.json());
app.use(cors());

// Read configuration from .env file
const port = process.env.PORT; // Port for the server
const dburl = process.env.DBURL; // MongoDB connection URL from .env

// Connect to MongoDB database
mongoose.connect(dburl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error)); // Database connection error handling
db.once('open', () => console.log("Database connected successfully")); // Database connection successful message

// Import hotelRouter from routes/hotelRouter.js
const hotelRouter = require('./routes/hotelRouter');

app.use('/hotels/', hotelRouter); 

// Start the server
app.listen(port, () => {
    console.log("Server is running successfully on port " + port);
});
