var express = require('express');
var router = express.Router();
var configApi = require("../api/config")
var axios = require("axios")
var variables = require("../session/variables")

router.get("/update/:employeeId", async function(req,res,next){
  if(req.session.isAuthorized == true){
    var employeeData = await axios.get(apiConfig.baseurl + "/employee/" + req.params.employeeId)
    res.render("employee", {employeeData: employeeData.data})
  }
})