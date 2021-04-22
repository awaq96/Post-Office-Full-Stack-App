const Employee = require("../models/employee.js")
const Account = require("../models/account.js")
const exception = require("../error/exception")
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Employee object is empty"
        })
    }

    const employee = new Employee({
        is_admin: req.body.is_admin,
        phone_number: req.body.phone_number,
        position: req.body.position,
        schedule: req.body.schedule,
        salary: req.body.salary,
        vacation: req.body.vacation,
        office_id: req.body.office_id
    })

    console.log("employee ", employee)
    console.log(req.body)

    var employeeId = -1
    Employee.create(employee, (err, employeeData) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred"
            })
        } else {
            employeeId = employeeData.id

            const account = new Account({
                username: req.body.username,
                password: req.body.password,
                user_type: req.body.user_type,
                // employee_id: 
                employee_id: employeeId,
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                phone_number: req.body.phone_number
            })
        
            Account.create(account, (err, data)=>{
                if(err){
                    res.status(500).send({
                        message: err.message || "An error occured"
                    })
                } else {
                    res.send([data, employeeData])
                }
            })
        
        }
    });

    

};


exports.vacationApproval = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Date not entered"
        })
    }

    Package.vacationApproval(req.body, (err, data) => {
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
    Employee.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

exports.updateById = (req,res)=>{
    var employeeId = req.params.employeeId
    console.log(employeeId)
    console.log(req.body)
    Employee.updateById(employeeId, req.body, (err, data)=>{
        if(err){
            if(err.kind == exception.NOT_FOUND_ERROR){
                res.status(404).send({
                    message: "Employee not found"
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



exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeID, (err, data) => {
        if (err) {
            if (err.kind == exception.NOT_FOUND_ERROR) {
                res.status(404).send({
                    message: "Account Not Found"
                });
            } else {
                res.status(500).send({
                    message: "Error Retrieving Account"
                });
            }
        } else {
            res.send(data);
        }
    })
};

exports.remove = (req, res) => {
    var employee_id = req.params.employee_id
    Employee.removeById(employee_id, (err,data)=>{
        if(err){
            res.status(404).send({
                message: "Employee not deleted"
            });
        }
        res.status(200).send({
            message: "Successfully deleted"
        })
    })
};