// Import Express
const express = require('express');

// Import mietwagenModel
const mietwagenModel = require("../models/mietwagenModel");

const router = express.Router();
router.use(express.json());

// Middleware to get a Mietwagen by ID
async function getMietwagen(req, res, next) {
    try {
        const mietwagen = await mietwagenModel.findById(req.params.id);
        if (!mietwagen) {
            res.status(404).json({ message: "Kein Mietwagen mit der ID " + req.params.id + " gefunden"});
        } else {
            req.mietwagen = mietwagen;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete a Mietwagen by ID
router.delete("/:id", getMietwagen, async (req, res) => {
    try {
        await mietwagenModel.deleteOne(req.mietwagen);
        res.status(201).json({ message: "Mietwagen mit der ID " + req.params.id + " erfolgreich gelöscht" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a Mietwagen by ID
router.put("/:id", getMietwagen, async (req, res) => {
    try {
        req.mietwagen.anbieter = req.body.anbieter;
        req.mietwagen.standort_ausleihen = req.body.standort_ausleihen;
        req.mietwagen.standort_rueckgabe = req.body.standort_rueckgabe;
        req.mietwagen.datum_ausleihen = req.body.datum_ausleihen;
        req.mietwagen.datum_rueckgabe = req.body.datum_rueckgabe;
        req.mietwagen.preis = req.body.preis;
        req.mietwagen.fzg_modell = req.body.fzg_modell;
        req.mietwagen.anz_sitze = req.body.anz_sitze;
        req.mietwagen.verfuegbarkeit = req.body.verfuegbarkeit;

        const updatedMietwagen = await req.mietwagen.save();
        res.status(201).json(updatedMietwagen);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a list of all Mietwagen
router.get('/', async (req, res) => {
    try {
        const mietwagen = await mietwagenModel.find();
        res.status(200).json(mietwagen);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a list of Mietwagen that match search criteria
router.get('/details', async (req, res) => {
    try {
        const query = {};

        for (const key in req.query) {
            if (key === 'anz_sitze') {
                query[key] = { $gte: req.query[key] };
            } else if (key === 'preis') {
                query[key] = { $lte: req.query[key] };
            } else if (key === 'datum_ausleihen') {
                query['datum_ausleihen'] = {                    // Allows a date in YYYY-MM-DD format
                    $gte: req.query[key] + 'T00:00:00.000Z', 
                    $lte: req.query[key] + 'T23:59:59.999Z', 
                };
            } else if (key === 'datum_rueckgabe') {
                query['datum_rueckgabe'] = {                  // Allows a date in YYYY-MM-DD format
                    $gte: req.query[key] + 'T00:00:00.000Z',
                    $lte: req.query[key] + 'T23:59:59.999Z',
                };
            } else if (key === 'modell') {
                query[key] = { $regex: new RegExp(req.query[key], 'i') }; // Allows partial matches for model names
            } else {
                query[key] = req.query[key];
            }
        }

        const mietwagen = await mietwagenModel.find(query);
        res.json(mietwagen);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new Mietwagen
router.post('/', async (req, res) => {
    try {
        const mietwagen = new mietwagenModel({
            anbieter: req.body.anbieter,
            standort_ausleihen: req.body.standort_ausleihen,
            standort_rueckgabe: req.body.standort_rueckgabe,
            datum_ausleihen: req.body.datum_ausleihen,
            datum_rueckgabe: req.body.datum_rueckgabe,
            preis: req.body.preis,
            fzg_modell: req.body.fzg_modell,
            anz_sitze: req.body.anz_sitze,
            verfuegbarkeit: req.body.verfuegbarkeit
        });

        const newMietwagen = await mietwagen.save();
        res.status(201).json(newMietwagen);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
