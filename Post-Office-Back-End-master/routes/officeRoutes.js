module.exports = app=>{
    const officeController = require("../controllers/officeController.js")

    app.post('/office', officeController.create);

    app.get('/office', officeController.getAllLocations);

    app.get('/office/:officeId', officeController.findById);

    app.post("/office/:officeId", officeController.updateByOfficeid);

    app.delete('/office/:officeId',officeController.remove);
}