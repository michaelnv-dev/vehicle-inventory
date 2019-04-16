var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Vehicle = require('./Vehicle');

// CREATES A NEW Vehicle
router.post('/', function (req, res) {
    Vehicle.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, vehicle) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(vehicle);
        });
});

// RETURNS ALL THE VehicleS IN THE DATABASE
router.get('/', function (req, res) {
    Vehicle.find({}, function (err, vehicles) {
        if (err) return res.status(500).send("There was a problem finding the Vehicles.");
        res.status(200).send(vehicles);
    });
});

// GETS A SINGLE Vehicle FROM THE DATABASE
router.get('/:id', function (req, res) {
    Vehicle.findById(req.params.id, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem finding the Vehicle.");
        if (!vehicle) return res.status(404).send("No Vehicle found.");
        res.status(200).send(vehicle);
    });
});

// DELETES A Vehicle FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Vehicle.findByIdAndRemove(req.params.id, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem deleting the Vehicle.");
        res.status(200).send("Vehicle: "+ vehicle.name +" was deleted.");
    });
});

// UPDATES A SINGLE Vehicle IN THE DATABASE
router.put('/:id', function (req, res) {
    Vehicle.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem updating the vehicle.");
        res.status(200).send(vehicle);
    });
});


module.exports = router;