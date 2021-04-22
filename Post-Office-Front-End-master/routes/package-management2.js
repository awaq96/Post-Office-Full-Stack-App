var express = require('express');
var router = express.Router();
var configApi = require("../api/config")
var axios = require("axios")

router.get('/', function(req, res, next){
    res.render('package-management2', {})
})

router.post('/', function(req, res, next) {
  axios.post(configApi.baseurl + "/package/location/", req.body).then((response) => {
      console.log('POSTED json object', req.body,'to', configApi.baseurl+"/package/location")
      res.render('package-management2', { output: {'message':'Successfully updated package location'} });
  }).catch((err) => {
    console.log('\n')
    console.log(err)
    console.log('\n')
  })
});

module.exports = router;
