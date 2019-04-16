const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../logger').getLogger("vehicle");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Vehicle = require('./Vehicle');

// CREATES A NEW VEHICLE
router.post('/', function (req, res) {
    Vehicle.create({
            name : req.body.name,
            type : req.body.type,
            last_successful_connection : req.body.conn,
            timestamp: Math.floor(new Date() / 1000)
        }, 
        function (err, vehicle) {
            console.log("Error " + err);
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            logger.info('New vehicle created: ' + vehicle.name);
            res.status(200).send(vehicle);
        });
});

// RETURNS ALL THE VEHICLE IN THE DATABASE
router.get('/', function (req, res) {
    Vehicle.find({}, function (err, vehicles) {
        if (err) return res.status(500).send("There was a problem finding the Vehicles.");
        res.status(200).send(vehicles);
    });
});

// GETS A SINGLE VEHICLE FROM THE DATABASE
router.get('/:id', function (req, res) {
    Vehicle.findById(req.params.id, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem finding the Vehicle.");
        if (!vehicle) return res.status(404).send("No Vehicle found.");
        res.status(200).send(vehicle);
    });
});

// DELETES A VEHICLE FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Vehicle.findByIdAndRemove(req.params.id, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem deleting the Vehicle.");
        logger.info("Vehicle: "+ vehicle.name +" was deleted.");
        res.status(200).send("Vehicle: "+ vehicle.name +" was deleted.");
    });
});

// UPDATES A SINGLE VEHICLE IN THE DATABASE
router.put('/:id', function (req, res) {
    Vehicle.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem updating the vehicle.");
        logger.info("Vehicle: "+ vehicle.name +" was updated.");
        res.status(200).send(vehicle);
    });
});


module.exports = router;