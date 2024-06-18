const mongoose = require('mongoose');

const hotelModelSchema = new mongoose.Schema({
    name_hotel: {
        type: String,
        required: true
    },
    standort_hotel: {
        type: String,
        required: true
    },
    datum: {
        type: Date,
        required: true
    },
    preis_zimmer: {
        type: Number,
        required: true
    },
    anz_zimmer_frei: {
        type: Number,
        required: true
    },

})

module.exports = mongoose.model('hotelModel', hotelModelSchema);