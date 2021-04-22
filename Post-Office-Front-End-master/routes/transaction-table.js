var express = require('express')
var router = express.Router()  





router.get('/', function(req, res){
 
  res.render('transaction-table', { title: 'transaction' });
  
})


module.exports = router