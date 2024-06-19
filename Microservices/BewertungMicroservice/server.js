const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middlewares
app.use(express.json());
app.use(cors());



// Read configuration from .env
const port = process.env.PORT;
const dburl = process.env.DBURL;


// Connect to database
mongoose.connect(dburl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Datenbank erfolgreich verbunden"));

// Import routes
const bewertungsRouter = require('./routes/bewertungsRouter');
app.use('/bewertung/', bewertungsRouter);

// Start server
app.listen(port, () => {
    console.log("Server erfolgreich gestartet auf Port " + port);
})