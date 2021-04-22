var express = require('express')
var router = express.Router()  





router.get('/', function(req, res){
 
  res.render('calculator', { title: 'Calculate a Price' });
  
})


module.exports = router