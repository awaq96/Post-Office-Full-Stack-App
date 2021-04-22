var express = require('express')
var router = express.Router()  
var apiConfig = require("../api/config")
var axios = require("axios")
var variables = require("../session/variables")

class NewPackage{
  constructor(package_type, weight, height, width, length, tracking_number, price, insurance, package_value, recipient_id, sender_id, is_delivered, note, recipient_name, recipient_address, recipient_phone_number, recipient_email, sender_name, sender_address, sender_phone_number, sender_email, current_location, delivery_status, office_id){
    this.package_type = package_type 
    this.weight = weight
    this.height = height
    this.width = width 
    this.length = length 
    this.tracking_number = tracking_number
    this.price = price 
    this.insurance = insurance,
    this.package_value = package_value 
    this.recipient_id = recipient_id 
    this.sender_id = sender_id 
    this.is_delivered = is_delivered 
    this.note = note 
    this.recipient_name = recipient_name 
    this.recipient_address = recipient_address
    this.recipient_phone_number = recipient_phone_number 
    this.recipient_email = recipient_email 
    this.sender_name = sender_name 
    this.sender_address = sender_address 
    this.sender_phone_number = sender_phone_number 
    this.sender_email = sender_email 
    this.current_location = current_location 
    this.delivery_status= delivery_status 
    this.office_id = office_id
  }

  toDict(){
    var dict = {}
    for(var prop in this){
      dict[prop] = this[prop]
    }
    return dict
  }
}

router.get('/', function(req, res){
 
  res.render('package', { title: 'package', });
  
})
router.post('/quickSearch/',async function(req,res,next){
  console.log(req.body.trackingNumber)
  axios.get(apiConfig.baseurl + "/package/tracking/" + req.body.trackingNumber)
  .then(packageData=>{
    axios.get(apiConfig.baseurl + "/tracking/history/" + req.body.trackingNumber)
    .then(historyData=>{
      res.render("package-detail-quick-search", {
        isAuthorized: req.session.isAuthorized,
        package: packageData.data,
        history: historyData.data}
        )
    }).catch(err=>{
      console.log(err)
    })
  }).catch(err=>{
    console.log(err)
  })

})

router.get('/history/:tracking_number',(req,res,next)=>{
  console.log("\n\n\n");
  console.log(req.params.tracking_number)
  console.log("\n\n\n");
  axios.get(apiConfig.baseurl + "/tracking/history/" + req.params.tracking_number)
  .then(resApi=>{
    res.render("trackinghistory", {
      tracking_number: req.params.tracking_number,
      history: resApi.data} )
  }).catch(err=>{
    console.log(err)
  })
})

router.post("/", (req,res,next)=>{
  console.log(req.body)

  var tracking_number =0 
  var is_delivered = false
  var deliver_status= "IN TRANSIT"
  var current_location = req.body.current_location
  console.log("req ", req.body)
  var package = new NewPackage(
   req.body.package_type,
   req.body.weight,
   req.body.height,
   req.body.width,
   req.body.length,
   tracking_number,
   req.body.price,
   req.body.insurance,
   req.body.package_value,
   req.body.recipient_id,
   req.body.sender_id,
   is_delivered,
   req.body.note,
   req.body.recipient_name,
   req.body.recipient_address,
   req.body.recipient_phone_number,
   req.body.recipient_email,
   req.body.sender_name,
   req.body.sender_address,
   req.body.sender_phone_number,
   req.body.sender_email,
   current_location,
   deliver_status,
   req.body.office_id
  )
  axios.post(apiConfig.baseurl + "/package", package.toDict())
  .then(apiRes=>{
    console.log(apiRes)
    res.send("Your package tracking number is " +  apiRes.data.tracking_number.toString() + ".")
  }).catch(err=>{
    console.log(err)
  })
})

router.post("/update", (req,res,next)=>{
  console.log(req.body)

  if(req.body.sender_id==""){
    req.body.sender_id = undefined
  }
  if(req.body.recipient_id==""){
    req.body.recipient_id= undefined
  }

  axios.post(apiConfig.baseurl + "/package/update/", {tracking_number: req.body.tracking_number, package: req.body })
  .then(resApi=>{
    res.redirect("/user/packageManagement/")
  }).catch(err=>{
    console.log(err.message)
  })
})


router.get("/removePackage/:trackingNumber", async function(req,res,next){

  axios.get(apiConfig.baseurl + "/package/removeTrackingNumber/" + req.params.trackingNumber)
  .then(data=>{
    if(req.session.current_url){
      res.redirect(req.session.current_url)
    } else {
      res.redirect("/user/userProfile")
    }
  }).catch(err=>{
    console.log(err)
  })
})

module.exports = router