// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cors());          // Middleware to enable CORS for all routes

// Read the server port and database URL from environment variables
const port = process.env.PORT;
const dburl = process.env.DBURL;

// Connect to the MongoDB database using mongoose
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.error('Database connection error:', error)); // Handle database connection errors
db.once('open', () => console.log("Successfully connected to the database"));  // Log a success message

const mietwagenRouter = require('./routes/mietwagenRouter');
app.use('/autos/', mietwagenRouter);

// Start the server
app.listen(port, () => {
    console.log("Server successfully started on port " + port);
});
