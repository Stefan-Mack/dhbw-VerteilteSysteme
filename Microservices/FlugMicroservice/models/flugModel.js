const mongoose = require('mongoose');

const flugModelSchema = new mongoose.Schema({
    fluggesellschaft: {
        type: String,
        required: true
    },
    flugnummer: {
        type: String,
        required: true
    },
    abflugort: {
        type: String,
        required: true
    },
    ankunftsort: {
        type: String,
        required: true
    },
    abflugszeit: {
        type: Date,
        required: true
    },
    ankunftszeit: {
        type: Date,
        required: true
    },
    anzahl_freier_sitzplaetze: {
        type: Number,
        required: true
    },
    preis_pro_sitzplatz: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('flugModel', flugModelSchema);