const Office = require("../models/office.js")
const exception = require("../error/exception")
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Office object is empty"
        })
    }

    const office = new Office({
        off_name: req.body.off_name,
        off_zip: req.body.off_zip,
        off_numPkgs: req.body.off_numPkgs,
        off_numEmpl: req.body.off_numEmpl,
        off_address: req.body.off_address

    })

    Office.create(office, (err, data) => {
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
    Office.findById(req.params.officeId, (err, data) => {
        if (err) {
            if (err.kind == exception.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "Office Not Found"
                });
            } else {
                res.status(500).send({
                    message: "Error Retrieving Office"
                });
            }
        } else {
            res.send(data);
        }
    })
};

exports.getAllLocations = (req,res)=>{
    Office.getAll((err,data)=>{
        if(err){
            res.status(500).send({
                messge: err || "Some error occured"
            })
        } else {
            res.send(data)
        }
    })
    
}

exports.remove = (req, res) => {
    var officeId = req.params.officeId
    Office.removeById(officeId, (err,data)=>{
        if(err){
            if(err.kind=exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Office deleted"
                })
            } else {
                res.status(500).send({
                    message: "Internal error occured"
                })
            }
        }
    })
};


exports.updateByOfficeid = (req, res) => {
    var officeId = req.params.officeId
    console.log(req.body)
    Office.updateByOfficeid(officeId, req.body, (err, data)=>{
        if(err){
            if(err.kind==exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Office not found"
                })
            } else {
                res.send(500).send({
                    message: "An error occured"
                })
            } 
        } else {
            res.send(data)
        }
    })
}