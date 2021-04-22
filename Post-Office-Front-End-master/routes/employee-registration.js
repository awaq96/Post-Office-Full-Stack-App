var express = require('express')
var router = express.Router()  


positionArray = ['Warehouse Worker', 'Clerk', 'Package Handler', 'Delivery', 'Technichian', 'Manager', 'HR', 'Other ...']
dayss = []

router.get('/', function(req, res){
 
  res.render('employee-registration', { title: 'empolyee account', positions: positionArray});
  
})


module.exports = router