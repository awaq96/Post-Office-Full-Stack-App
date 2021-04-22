module.exports = app=>{
    const user_profileController = require("../controllers/user_profileController.js")

    app.post('/user_profile', user_profileController.create);

    app.get('/user_profile', user_profileController.findById);
}