module.exports = app => {
    const vehicle = require("../controllers/vehicleController.js");
  
    // Create a new vehicle
    app.post("/vehicle", vehicle.create);
  
    // Retrieve all vehicles
    app.get("/vehicle", vehicle.findAll);
  
    // Retrieve a single vehicle with vehicle_id
    app.get("/vehicle/:vehicleID", vehicle.findOne);
  };