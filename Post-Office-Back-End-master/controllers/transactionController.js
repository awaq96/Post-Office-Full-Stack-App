const Transaction = require("../models/transaction.js")
const exception = require("../error/exception.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Transaction object is empty"
        })
    }

    const transaction = new Transaction({
        item_revenue_name: req.body.item_revenue_name,
        item_revenue_price: req.body.item_revenue_price,
        transaction_date: req.body.transaction_date
    })
        
    Transaction.create(transaction, (err, data) => {
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
    var transactionid = req.params.transactionid
    Transaction.findById(transactionid, (err,data)=>{
        if(err){
            if(err.kind=exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Transaction not found"
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
    var transactionid = req.params.transactionid
    console.log(req.body)
    Transaction.updateById(transactionid, req.body, (err, data)=>{
        if(err){
            if(err.kind==exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Transaction not found"
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



exports.getRevenue = (req, res) => {
    Transaction.getRevenue((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving transactionn."
            });
        else res.send(data);
    });
}


exports.getRevenueRange = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "POST Request requires body! None provided"
        })
    }

    Transaction.getRevenueRange(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}


exports.getNumTransactionsRange = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "POST Request requires body! None provided"
        })
    }

    Transaction.getNumTransactionsRange(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}

exports.getAvgTransactionRange = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "POST Request requires body! None provided"
        })
    }

    Transaction.getAvgTransactionRange(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}





exports.findAll = (req, res) => {
    Transaction.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving transaction."
            });
        else res.send(data);
    });
};

exports.remove = (req, res) => {
    var transactionid = req.params.transactionid
    Transaction.removeById(transactionid, (err,data)=>{
        if(err){
            if(err.kind=exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Transaction deleted"
                })
            } else {
                res.status(500).send({
                    message: "Internal error occured"
                })
            }
        }
    })
};

exports.getTransactionReport = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "POST Request requires body! None provided"
        })
    }

    Transaction.getTransactionReport(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            res.send(data);
        }
    });
}

exports.getNumTransactions = (req, res) => {
    Transaction.getNumTransactions((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving transactionn."
            });
        else res.send(data);
    });
}


exports.getAvgTransaction = (req, res) => {
    Transaction.getAvgTransaction((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving transactionn."
            });
        else res.send(data);
    });
}
