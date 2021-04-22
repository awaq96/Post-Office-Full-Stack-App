module.exports = app => {
    const report = require("../controllers/reportController.js");
  
    // Activity report
    app.post("/activityReport", report.getActivityReport);

    // Get all activity
    app.get('/activityReport', report.getAll);

    // Transaction report
    //app.post("/package/transactionReport", report.getTransactionReport);
  };