const Report = require("../models/report.js")

exports.getActivityReport = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "POST Request requires body! None provided"
        })
    }

    Report.getActivityReport(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}

exports.getAll = (req, res) => {
    Report.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving activities."
            });
        else res.send(data);
    });
}