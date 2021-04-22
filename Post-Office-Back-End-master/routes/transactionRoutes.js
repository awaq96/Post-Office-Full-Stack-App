module.exports = app=>{
    const transactionController = require("../controllers/transactionController.js")

    app.post('/transaction', transactionController.create);

    app.get('/transaction/:transactionid', transactionController.findById);

    app.post('/transaction/update/:transactionid', transactionController.updateById)

    app.get("/transaction", transactionController.findAll);

    // Revenue statistics GET (no params / get all)
    app.get('/revenue', transactionController.getRevenue);
    app.get('/numTransactions', transactionController.getNumTransactions);
    app.get('/avgTransaction', transactionController.getAvgTransaction);

    // Revenue statistics POST (restricted w/ date, time, alerts from adminTool frontend)
    app.post('/revenue', transactionController.getRevenueRange);
    app.post('/numTransactions', transactionController.getNumTransactionsRange);
    app.post('/avgTransaction', transactionController.getAvgTransactionRange);
    
    app.delete('/transaction/:transactionid',transactionController.remove);

    app.post("/transactionReport", transactionController.getTransactionReport);
}