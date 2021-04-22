const user_profile = require("../models/user_profile.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "User_profile object is empty"
        })
    }

    const profile = new user_profile({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        userType: req.body.usertype
    })

    user_profile.create(profile, (err, data) => {
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
    user_profile.findById(req.params.accountId, (err, data) => {
        if (err) {
            if (err.kind == user_profile.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "User_profile Not Found"
                });
            } else {
                res.status(500).send({
                    message: "Error Retrieving User_profile"
                });
            }
        } else {
            res.send(data);
        }
    })
};