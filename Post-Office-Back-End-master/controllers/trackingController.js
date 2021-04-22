const Tracking = require("../models/tracking.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Tracking object is empty"
        })
    }

    const tracking = new Tracking({
        tracking_number: req.body.tracking_number,
        final_location: req.body.final_location,
        current_location: req.body.current_location,
        previous_location: req.body.previous_location,
        sent_date: req.body.sent_date,
        Pkgstatus: req.body.Pkgstatus,
        is_delivered: req.body.is_delivered,
        estimated_arrival: req.body.estimated_arrival

    })

    Tracking.create(tracking, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req,res) => {
    Tracking.findById(req.params.trackingId, (err, data) => {
        if (err) {
            if (err.kind == Tracking.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "Tracking Not Found"
                });
            } else {
                res.status(500).send({
                    message: "Error Retrieving Tracking"
                });
            }
        } else {
            res.send(data);
        }
    })
};

exports.getHistory = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Location not set"
        })
    }
    Tracking.getHistory(req.params.tracking_number, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            console.log("history: ", data)
            res.send(data);
        }
    });
}
