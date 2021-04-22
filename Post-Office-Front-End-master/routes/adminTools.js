var express = require('express')
var router = express.Router()  
const axios = require("axios")
const apiConfig = require("../api/config")


router.get('/', function(req, res, next){
  res.send("something")
  
})



module.exports = router