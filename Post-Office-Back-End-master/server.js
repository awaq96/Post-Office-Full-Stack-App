const express = require('express');
const bodyParser = require('body-parser');
//const officeRoutes = require('./offices');

var app = express();
app.use(bodyParser.json());


app.get("/", (req, res) => {
	res.json({message: "it is a site or something"});
});
//app.use('/offices', officeRoutes);

require("./routes/accountRoutes.js")(app);
require("./routes/employeeRoutes.js")(app);
require("./routes/officeRoutes.js")(app);
require("./routes/packageRoutes.js")(app);
require("./routes/trackingRoutes.js")(app);
require("./routes/user_profileRoutes.js")(app);
require("./routes/vehicleRoutes.js")(app);
require("./routes/transactionRoutes.js")(app);
require("./routes/reportRoutes.js")(app);
app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});