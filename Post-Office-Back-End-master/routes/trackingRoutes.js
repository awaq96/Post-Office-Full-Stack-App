module.exports = app=>{
    const trackingController = require("../controllers/trackingController.js")

    app.get("/tracking/history/:tracking_number", trackingController.getHistory);

    app.post('/tracking', trackingController.create);
    app.get('/tracking', trackingController.findById);
}