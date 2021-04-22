module.exports = app => {
    const package = require("../controllers/packageController.js");
  
    // Create a new Package
    app.post("/package", package.create);
  
    // Retrieve all Packages
    app.get("/package", package.getAll);
  
    // Retrieve a single Package with packageId
    app.get("/package/:packageID", package.findById);
    app.get("/package/office/:officeId", package.findByOfficeId);

    // Check tracking number
    app.get("/package/tracking/:trackingNumber", package.checkTracking);
    app.get("/package/findByAccountId/:accountId", package.showPackagesByAccountId);
    app.post("/package/addPackage", package.addNewPackageToAccountId);

    // Update package location
    app.post("/package/location", package.updateLocation);
    app.post("/package/update/", package.updateByTrackingNumber);

    app.get('/package/removeId/:packageID',package.remove);
    app.get('/package/removeTrackingNumber/:trackingNumber',package.removeByTrackingNumber);
  };