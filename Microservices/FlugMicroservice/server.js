const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());


// read configuration from .env file
const port = process.env.PORT;
const dburl = process.env.DBURL;


// connect to MongoDB
mongoose.connect(dburl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Datenbank erfolgreich verbunden"));

const flugRouter = require('./routes/flugRouter');
app.use('/fluege/', flugRouter);

app.listen(port, () => {
    console.log("Server erfolgreich gestartet auf Port " + port);
})