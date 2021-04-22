const Package = require("../models/package.js")
const Transaction = require("../models/transaction.js")
const exception = require("../error/exception")
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Package object is empty"
        })
    }
    var tracking_number = Math.round(Math.random() * 1000000) 

    const package = new Package({
        package_type: req.body.package_type,
        weight: req.body.weight,
        height: req.body.height,
        width: req.body.width,
        length: req.body.length,
        tracking_number: tracking_number,
        price: req.body.price,
        insurance: req.body.insurance,
        package_value: req.body.package_value,
        recipient_id: req.body.recipient_id,
        sender_id: req.body.sender_id,
        is_delivered: req.body.is_delivered,
        note: req.body.note,
        recipient_name : req.body.recipient_name,
        recipient_address: req.body.recipient_address,
        recipient_phone_number: req.body.recipient_phone_number,
        recipient_email: req.body.recipient_email,
        sender_name: req.body.sender_name,
        sender_address: req.body.sender_address,
        sender_phone_number: req.body.sender_phone_number,
        sender_email: req.body.sender_email,
        current_location: req.body.current_location,
        delivery_status: req.body.delivery_status,
        office_id: req.body.office_id
    })

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    const transaction = new Transaction({
        item_revenue_name: req.body.package_type,
        item_revenue_price: req.body.price,
        transaction_date: dateTime
    })
    
    console.log(package)
    console.log(transaction)
    
    Package.create(package, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
};

exports.updateByTrackingNumber = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Package object is empty"
        })
    }
    console.log(req.body)
    Package.updateByTrackingNumber(req.body.tracking_number, req.body.package, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}

exports.updateLocation = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Location not set"
        })
    }

    Package.updateLocation(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}

exports.checkTracking = (req, res) => {

    console.log(req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Location not set"
        })
    }

    Package.checkTracking(req.params.trackingNumber, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}
exports.showPackagesByAccountId = (req, res) => {

    Package.showPackagesByAccountId(req.params.accountId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}
exports.addNewPackageToAccountId = (req, res) => {

    console.log(req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Location not set"
        })
    }

    Package.addNewPackageToAccountId(
        {account_id: req.body.account_id, tracking_number: req.body.tracking_number},
        (err, data) => {
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
    Package.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};


exports.findById = (req,res) => {
    var packageID = req.params.packageID
    Package.findById(packageID, (err, data) => {
        if (err) {
            if (err.kind == Package.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "Package Not Found"
                });
            } else {
                res.status(500).send({
                    message: "Error Retrieving Package"
                });
            }
        } else {
            res.send(data);
        }
    })
};

exports.findByOfficeId = (req,res) => {
    var officeId = req.params.officeId
    Package.findByOfficeId(officeId, (err, data) => {
        if (err) {
            if (err.kind == Package.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "Package Not Found"
                });
            } else {
                res.status(500).send({
                    message: "Error Retrieving Package"
                });
            }
        } else {
            res.send(data);
        }
    })
};

exports.remove = (req, res) => {
    var packageID = req.params.packageID
    Package.removeById(packageID, (err,data)=>{
        if(err){
            if (err.kind == exception.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "Package not deleted"
                });
            } else {
                res.status(500).send({
                    message: "Package deleted"
                });
            }
        }
    })
};
exports.removeByTrackingNumber = (req, res) => {
    var trackingNumber = req.params.trackingNumber
    console.log(trackingNumber)
    Package.removeByTrackingNumber(trackingNumber, (err,data)=>{
        if(err){
            if (err.kind == exception.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "Package not deleted"
                });
            } else {
                console.log('3')
                console.log("Deleted")
                res.status(200).send({
                    message: "Successfully Deleted"
                });
            }
        } else {
            res.send(data)
        }
    })
};