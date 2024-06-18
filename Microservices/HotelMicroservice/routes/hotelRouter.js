// Import Express
const express = require('express');

// Import hotelModel
const hotelModel = require("../models/hotelModel");
const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// Middleware function to fetch a hotel by ID
async function getHotel(req, res, next) {
    try {
        const hotel = await hotelModel.findById(req.params.id);
        if (!hotel) {
            res.status(404).json({ message: "Kein Hotel mit der ID " + req.params.id + " gefunden" });
        } else {
            req.hotel = hotel;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete a hotel entry by ID
router.delete("/:id", getHotel, async(req, res) => {
    try {
        await hotelModel.deleteOne(req.hotel);
        res.status(200).json({ message: "Hotel mit der ID " + req.params.id + " erfolgreich gelöscht" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a hotel entry by ID
router.put("/:id", getHotel, async(req, res) => {
    try {
        req.hotel.name_hotel = req.body.name_hotel;
        req.hotel.standort_hotel = req.body.standort_hotel;
        req.hotel.datum = req.body.datum;
        req.hotel.preis_zimmer = req.body.preis_zimmer;
        req.hotel.anz_zimmer_frei = req.body.anz_zimmer_frei;

        const updatedHotel = await req.hotel.save();

        res.status(201).json(updatedHotel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a list of all hotels
router.get('/', async(req, res) => {
    try {
        const hotels = await hotelModel.find();
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a list of hotels matching search criteria
router.get('/details', async (req, res) => {
    try {
        const query = {};

        for (const key in req.query) {
            if (key === 'anz_zimmer_frei') {
                query[key] = { $gte: req.query[key] };  // $gte = greater than or equal - User wants X rooms, show hotels with X or more available rooms
            } else if (key === 'preis_zimmer') {
                query[key] = { $lte: req.query[key] };  // $lte = less than or equal - User wants a room up to a certain price, show hotels with cheaper rooms
            } else if (key === 'anreisetag') {
                query['datum'] = { $gte: new Date(req.query[key]) };
            } else if (key === 'abreisetag') {
                query['datum'] = {
                    ...query['datum'],
                    $lte: new Date(req.query[key]),
                };
            } else {
                query[key] = req.query[key];
            }
        }

        let hotels = [];
        // If both arrival and departure dates are provided, find hotels with available rooms throughout that period
        // In this case, the JSON response won't contain dates but will include total booking price and minimum available rooms during the period.
        // Using aggregation pipeline for data grouping and simple calculations.
        if ('anreisetag' in req.query && 'abreisetag' in req.query) {
            if ('preis_zimmer' in req.query) {
                query['preis_zimmer'] = { $lte: parseInt(req.query['preis_zimmer']) };
            }
            if ('anz_zimmer_frei' in req.query) {
                query['anz_zimmer_frei'] = { $gte: parseInt(req.query['anz_zimmer_frei']) };
            }
            hotels = await hotelModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: { name_hotel: "$name_hotel", location: "$standort_hotel" },
                        preis_zimmer: { $sum: "$preis_zimmer" },
                        anz_zimmer_frei: { $min: "$anz_zimmer_frei" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name_hotel: "$_id.name_hotel",
                        standort_hotel: "$_id.standort_hotel",
                        preis_zimmer: 1,
                        anz_zimmer_frei: 1
                    }
                }
            ]);
        } else {
            hotels = await hotelModel.find(query);
        }

        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new hotel entry
router.post('/', async(req, res) => {
    try {
        const hotel = new hotelModel({
            name_hotel: req.body.name_hotel,
            standort_hotel: req.body.standort_hotel,
            datum: req.body.datum,
            preis_zimmer: req.body.preis_zimmer,
            anz_zimmer_frei: req.body.anz_zimmer_frei
        });

        const newHotel = await hotel.save();
        res.status(201).json(newHotel);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
