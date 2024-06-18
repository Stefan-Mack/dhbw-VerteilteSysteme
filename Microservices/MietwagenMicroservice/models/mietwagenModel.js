const mongoose = require('mongoose');

const mietwagenModelSchema = new mongoose.Schema({
    anbieter: {
        type: String,
        required: true
    },
    standort_ausleihen: {
        type: String,
        required: true
    },
    standort_rueckgabe: {
        type: String,
        required: true
    },
    datum_ausleihen: {
        type: Date,
        required: true
    },
    datum_rueckgabe: {
        type: Date,
        required: true
    },
    fzg_modell: {
        type: String,
        required: true
    },
    anz_sitze: {
        type: Number,
        required: true
    },
    preis: {
        type: Number,
        required: true
    },
    verfuegbarkeit: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('mietwagenModel', mietwagenModelSchema);