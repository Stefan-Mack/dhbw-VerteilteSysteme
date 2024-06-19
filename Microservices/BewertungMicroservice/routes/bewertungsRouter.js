const express = require('express');
const bewertungsModel = require('../models/bewertungsModel');
const router = express.Router();
router.use(express.json());




async function getBewertung(req, res, next) {
    try {
        const bewertung = await bewertungsModel.findById(req.params.id);
        if (!bewertung) {
            res.status(404).json({ message: "Keine Bewertung mit der ID " + req.params.id + " gefunden" });
        } else {
            req.bewertung = bewertung;
            next();
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


//API URLs


// Get all ratings
router.get('/', async (req, res) => {
    try {
        const bewertung = await bewertungsModel.find();
        res.json(bewertung);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get a list of all ratings that match the search criteria
router.get('/details', async (req, res) => {
    try {
      const query = {};
  
      for (const key in req.query) {
        query[key] = req.query[key];
      }
  
      const bewertung = await bewertungsModel.find(query);
  
      res.json(bewertung);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



// add a new rating
router.post('/', async(req, res) => {
    try {
        const bewertung = new bewertungsModel({
                fremdID: req.body.fremdID,
                kategorie: req.body.kategorie,
                anzahl_Sterne: req.body.anzahl_Sterne,
                freitext: req.body.freitext
            })
        const newBewertung = await bewertung.save();
        res.status(201).json(newBewertung);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// Delete an entry
router.delete('/:id', getBewertung, async(req, res) => {
    try {
        await bewertungsModel.deleteOne(res.bewertung);
        res.status(200).json({ "message": "Erfolgreich gelöscht" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

//update a rating
router.put('/:id', getBewertung, async(req, res) => {
    try {
        req.bewertung.fremdID = req.body.fremdID;
        req.bewertung.kategorie = req.body.kategorie;
        req.bewertung.anzahl_Sterne = req.body.anzahl_Sterne;
        req.bewertung.freitext = req.body.freitext;

        const updatedBewertung = await req.bewertung.save();
        res.status(200).json(updatedBewertung);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;