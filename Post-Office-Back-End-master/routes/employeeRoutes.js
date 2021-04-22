module.exports = app => {
    const employee = require("../controllers/employeeController.js");
  
    // Create a new Employee
    app.post("/employee", employee.create);
  
    // Retrieve all Employees
    app.get("/employee", employee.findAll);
  
    // Retrieve a single Employee with employeeId
    app.get("/employee/:employeeID", employee.findOne);

    //Send Vacation Request Result
    app.post("/employee",employee.vacationApproval);

    app.post("/employee/update/:employeeId", employee.updateById)

    // Delete employee
    app.get('/employee/remove/:employee_id',employee.remove);
  };



