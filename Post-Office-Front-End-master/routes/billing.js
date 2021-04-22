var express = require('express')
var router = express.Router()  





router.get('/', function(req, res){
 
  res.render('billing', { title: 'Pay Bill' });
  
})


module.exports = router