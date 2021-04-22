var express = require('express')
var router = express.Router()  
var configApi = require("../api/config")
var axios = require("axios")

positionArray = ['Warehouse Worker', 'Clerk', 'Package Handler', 'Delivery', 'Technichian', 'Manager', 'HR', 'Other ...']
dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
officeLocationArray = []
class NewAccount {
  constructor(name, email, username, password, address, phoneNumber){
    this.name = name
    this.email = email,
    this.username = username,
    this.password = password,
    this.address = address,
    this.phoneNumber = phoneNumber
  }
}

class NewEmployeeAccount extends NewAccount{
  constructor(name, email, username, password, address, phoneNumber,schedule, position, salary, isAdmin, officeId){
    super(name, email, username, password, address, phoneNumber)
    this.schedule = schedule,
    this.position = position,
    this.salary = salary,
    this.isAdmin = isAdmin,
    this.officeId = officeId 
  }
}

router.get('/', function(req, res){
 
  res.render('registration', { title: 'account' });
  
})

router.get("/employee", function(req,res){
  axios.get(configApi.baseurl + "/office").then((response)=>{

    officeLocationArray = response.data
    res.render('employee-registration', { title: 'empolyee account',days: dayArray, positions: positionArray, officeLocations: officeLocationArray, officeLocations: officeLocationArray});

  }).catch((err)=>{
    console.log(err)
  })
})

router.post('/', function(req, res, next){
  console.log(req.body)
  var name = req.body.name
  var email = req.body.email
  var username = req.body.username
  var password = req.body.password
  var address = req.body.address
  var phoneNumber = req.body.phoneNumber

  let newAccount = new NewAccount(name, email, username, password, address, phoneNumber)

  axios.post(configApi.baseurl + "/account/", {
    name: newAccount.name,
    address: newAccount.address,
    email: newAccount.email,
    phone_number: newAccount.phoneNumber,
    username: newAccount.username,
    password: newAccount.password,
    }).then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        }).catch((error) => {
        console.error(error)
    })

  statusCode = res.statusCode
  
  if(statusCode==200){
    //Successful
    res.redirect("/")
  }

  console.log(res.statusCode)
})

router.post("/employee", function(req,res, next){
  console.log(req.body)
  var schedule = ""
  for(i = 0; i< dayArray.length;i++){
    if(dayArray[i] in req.body){
      schedule = schedule + " " + dayArray[i];
    }
  }

  console.log(req.body)
  var isAdmin = false 
  if("isAdmin" in req.body){
    isAdmin = true 
  }
  var userType = (isAdmin) ? 2 : 1;

  console.log('user type ', userType)
  
  var position = positionArray[req.body.position]

  var officeId = officeLocationArray[req.body.officeLocation].off_id

  let newEmployeeAccount = new NewEmployeeAccount(
    req.body.name,
    req.body.email,
    req.body.username, 
    req.body.password,
    req.body.address,
    req.body.phoneNumber,
    schedule,
    position,
    req.body.salary,
    isAdmin,
    officeId) 

    console.log("position ", newEmployeeAccount.position)

  axios.post(configApi.baseurl + "/employee", {
    name: newEmployeeAccount.name,
    address: newEmployeeAccount.address,
    email: newEmployeeAccount.email,
    phone_number: newEmployeeAccount.phoneNumber,
    username: newEmployeeAccount.username,
    password: newEmployeeAccount.password,
    schedule: newEmployeeAccount.schedule,
    position: newEmployeeAccount.position,
    salary: newEmployeeAccount.salary,
    is_admin: newEmployeeAccount.isAdmin,
    office_id: newEmployeeAccount.officeId,
    user_type: userType
  }).then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    }).catch((error) => {
    console.error(error)
  })

  statusCode = res.statusCode

  if(statusCode==200){
  //Successful
  res.redirect("/")
  }
  console.log(res.statusCode)
})

module.exports = router