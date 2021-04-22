const Vehicle = require("../models/vehicle.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Vehicle object is empty"
        })
    }

    const vehicle = new Vehicle({
        vehicle_id: req.body.vehicle_id,
        plate_number: req.body.plate_number,
        vehicle_description: req.body.vehicle_description,
        miles_driven: req.body.miles_driven,
        location: req.body.location,
        VIM: req.body.VIM,
        capacity: req.body.capacity,
        current_location: req.body.current_location

    })

    Vehicle.create(account, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Vehicle.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};


exports.findOne = (req, res) => {
    Vehicle.findById(req.params.vehicleId, (err, data) => {
        if (err) {
            if (err.kind == Vehicle.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "Vehicle Not Found"
                });
            } else {
                res.status(500).send({
                    message: "Error Retrieving Vehicle"
                });
            }
        } else {
            res.send(data);
        }
    })
};