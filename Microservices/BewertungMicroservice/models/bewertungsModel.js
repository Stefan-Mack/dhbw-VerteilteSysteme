const mongoose = require('mongoose');

const bewertungsModelSchema = new mongoose.Schema({
    fremdID: {
        type: String,
        required: true
    },
    kategorie: {
        type: String,
        required: true
    },
    anzahl_Sterne: {
        type: Number,
        required: true
    },
    freitext: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('bewertungsModel', bewertungsModelSchema);