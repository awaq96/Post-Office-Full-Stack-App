module.exports = app=>{
    const accountController = require("../controllers/accountController.js")

    app.post('/account', accountController.create);

    app.get('/account/:accountId', accountController.findById);

    app.post('/authorize', accountController.authorize)

    app.post('/account/update/:accountId', accountController.updateById)

    app.delete('/account/:accountId',accountController.remove);
}