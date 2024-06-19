// Import Express
const express = require('express');

// Get the flight model
const flugModel = require("../models/flugModel");
const router = express.Router();

router.use(express.json());



async function getFlug(req, res, next) {
    try {
        const flug = await flugModel.findById(req.params.id);
        if (!flug) {
            res.status(404).json({ message: "Kein Flug mit der ID " + req.params.id + " gefunden" });
        } else {
            req.flug = flug;
            next();
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


//API-URLs

// Delete an entry
router.delete("/:id", getFlug, async(req, res) => {
    try {
        await flugModel.deleteOne(req.flug);
        res.status(200).json({ message: "Flug mit der ID " + req.params.id + " erfolgreich gelöscht" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


// Update an entry
router.put("/:id", getFlug, async (req, res) => {
    try {
        Object.assign(req.flug, {
            fluggesellschaft: req.body.fluggesellschaft,
            flugnummer: req.body.flugnummer,
            abflugort: req.body.abflugort,
            ankunftsort: req.body.ankunftsort,
            abflugszeit: req.body.abflugszeit,
            ankunftszeit: req.body.ankunftszeit,
            anzahl_freier_sitzplaetze: req.body.anzahl_freier_sitzplaetze,
            preis_pro_sitzplatz: req.body.preis_pro_sitzplatz
        });

        const updatedFlug = await req.flug.save();
        res.status(200).json(updatedFlug);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get a list of all flights
router.get('/', async(req, res) => {
    try {
        const flug = await flugModel.find();
        res.status(200).json(flug);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


// Get a list of all flights that match the query parameters
router.get('/details', async (req, res) => {
    try {
      const query = {};
  
      for (const key in req.query) {
        if (key === 'anzahl_freier_sitzplaetze') {
          query[key] = { $gte: req.query[key] };
        } else if (key === 'preis_pro_sitzplatz') {
          query[key] = { $lte: req.query[key] };
        } else if (key === 'abflugszeit') { // here it is possible to specify a date in the format YYYY-MM-DD
            query['abflugszeit'] = {
                $gte: req.query[key] + 'T00:00:00.000Z',
                $lte: req.query[key] + 'T23:59:59.999Z',
              };
        } else if (key === 'ankunftszeit') {
            query['ankunftszeit'] = {
                $gte: req.query[key] + 'T00:00:00.000Z',
                $lte: req.query[key] + 'T23:59:59.999Z',
              };
        } else {
          query[key] = req.query[key];
        }};
  
        const fluege = await flugModel.find(query);
        res.json(fluege);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


// create a new flight entry
router.post('/', async(req, res) => {
    try {
        const flug = new flugModel({
        fluggesellschaft: req.body.fluggesellschaft,
        flugnummer: req.body.flugnummer,
        abflugort: req.body.abflugort,
        ankunftsort: req.body.ankunftsort,
        abflugszeit: req.body.abflugszeit,
        ankunftszeit: req.body.ankunftszeit,
        anzahl_freier_sitzplaetze: req.body.anzahl_freier_sitzplaetze,
        preis_pro_sitzplatz: req.body.preis_pro_sitzplatz
        })

        const newFlug = await flug.save();
        res.status(201).json(newFlug);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;