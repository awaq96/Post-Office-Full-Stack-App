const Account = require("../models/account.js")
const exception = require("../error/exception.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Account object is empty"
        })
    }

    const account = new Account({
        username: req.body.username,
        password: req.body.password,
        user_type: 0,
        // employee_id: 
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone_number: req.body.phone_number
    })
        
    Account.create(account, (err, data) => {
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
    var accountId = req.params.accountId
    Account.findById(accountId, (err,data)=>{
        if(err){
            if(err.kind=exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Account not found"
                })
            } else {
                res.status(500).send({
                    message: "Internal error occured"
                })
            }
        } else {
            res.send(data)
        }
    })
};

exports.updateById = (req,res)=>{
    var accountId = req.params.accountId
    console.log(req.body)
    Account.updateById(accountId, req.body, (err, data)=>{
        if(err){
            if(err.kind==exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Account not found"
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

exports.remove = (req, res) => {
    var accountId = req.params.accountId
    Account.removeById(accountId, (err,data)=>{
        if(err){
            if(err.kind=exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Account deleted"
                })
            } else {
                res.status(500).send({
                    message: "Internal error occured"
                })
            }
        }
    })
};


exports.authorize = (req,res)=>{
    var authorized_package = {
        isAuthorized: false,
        data: {},
        message: "null"
    }
    Account.findByUsername(req.body.username, req.body.password, (err, data) => {
        if (err) {
            if (err.kind == exception.NOT_FOUND_ERROR) {
                authorized_package.message = "Authorization Error"
                res.send(authorized_package)
            } else {
                authorized_package.message = "An error occured, try later"
                res.send(authorized_package)
            }
        } else {
            authorized_package.isAuthorized = true
            authorized_package.data = data
            res.send(authorized_package);
        }
    })
};