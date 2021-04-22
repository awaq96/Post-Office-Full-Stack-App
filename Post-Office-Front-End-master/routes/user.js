var express = require('express');
var router = express.Router();
const axios = require("axios")
const apiConfig = require("../api/config")
const variables = require("../session/variables")


/* GET users listing. */

router.get('/userProfile', function(req,res,next){

  console.log(req.originalUrl)

  console.log(req.session.data)
  if(req.session.isAuthorized == true){
    res.render("userProfile", { isAuthorized: req.session.isAuthorized, data: req.session.data})
  }else{
    res.send("Autorization error, please login")
  }
})


router.get("/packages", function(req,res,next){

  axios.get(apiConfig.baseurl + "/package/findByAccountId/" + req.session.data.id)
  .then(resApi=>{
    console.log(resApi)

    res.render("package",{ 
      isAuthorized: req.session.isAuthorized,
      data: req.session.data,
      packageData: resApi.data
    })

  }).catch(err=>{
    console.log(err)
  })
})

router.get("/packageDetail/:trackingNumber", async function(req,res,next){
  console.log('here')
  var packageData = await axios.get(apiConfig.baseurl + "/package/tracking/" + req.params.trackingNumber) 
  var historyData = await axios.get(apiConfig.baseurl + "/tracking/history/" + req.params.trackingNumber)

  res.render("package-detail", {
    isAuthorized: req.session.isAuthorized,
    data: req.session.data, 
    package: packageData.data,
    history: historyData.data
  } )
})

router.get("/employeeUpdate/:employeeId", async function(req,res,next){
  if(req.session.isAuthorized == true){
    var employeeData = await axios.get(apiConfig.baseurl + "/employee/" + req.params.employeeId)
    console.log(employeeData)

    var schedule = employeeData.data.schedule.split(" ") 
    schedule.splice(0,1)

    res.render("employee", {
      isAuthorized: req.session.isAuthorized,
      data: req.session.data,
      employeeData: employeeData.data, 
      positions: variables.positionArray,
      days: variables.dayArray,
      schedule: schedule

    })
  }
})


router.post("/employeeUpdate/:employeeId", function(req, res,next){
  var schedule = ""
    for(i = 0; i< dayArray.length;i++){
      if(dayArray[i] in req.body){
        schedule = schedule + " " + dayArray[i];
      }
    }

    var position = req.body.position
    var vactionStatus = req.body.vacation
    var salary = req.body.salary  
    var id = req.params.employeeId
    console.log(schedule)
    
    axios.post(apiConfig.baseurl + "/employee/update/" + id, {
      position: position,
      vacation_status: vactionStatus,
      salary: salary,
      schedule: schedule
    }).then(data=>{

      res.redirect("/user/adminTool")
    }).catch(err=>{
      console.log(err)
    })

})
router.get("/packageDetailStaff/:trackingNumber", async function(req,res,next){

  var packageData = await axios.get(apiConfig.baseurl + "/package/tracking/" + req.params.trackingNumber) 
  var historyData = await axios.get(apiConfig.baseurl + "/tracking/history/" + req.params.trackingNumber)
  res.render("package-detail-staff", {
    isAuthorized: req.session.isAuthorized,
    data: req.session.data, 
    deliveryOptions: variables.deliveryStatusStrings,
    package: packageData.data,
    history: historyData.data
  } )
})

router.post("/packages/addPackage", function(req,res,next){
  console.log(req.body)
  axios.post(apiConfig.baseurl + "/package/addPackage", {account_id: req.session.data.id, tracking_number: req.body.tracking_number})
  .then(resApi=>{
    console.log(resApi)
    res.redirect("/user/packages")
  }).catch(error=>{
    console.log(error)
  })
})


router.get("/packageManagement", async function(req,res,next){
  //fetch office id 

  var employeeData = await axios.get(apiConfig.baseurl + "/employee/" + req.session.data.employee_id); 
  
  var officeData = await axios.get(apiConfig.baseurl + "/office/" + employeeData.data.office_id)

  var packageData = await axios.get(apiConfig.baseurl + "/package/office/" + officeData.data.off_id)

  inTransitPackages = []        
  deliveredPackages = []        
  failedPackages = []        
  latePackages = []
        
  console.log(packageData.data)

  packageData.data.forEach(package => {
    if(package.delivery_status.startsWith("IN TRANSIT")){
      inTransitPackages.push(package)
    } else if(package.delivery_status.startsWith("DELIVERED")){
      deliveredPackages.push(package)
    } else if(package.delivery_status.startsWith("FAILED")){
      failedPackages.push(package)
    } else if(package.delivery_status.startsWith("LATE")){
      latePackages.push(package)
    }
  });

  req.session.current_url = req.originalUrl

  res.render("package-management", 
  {isAuthorized: req.session.isAuthorized, 
    data:req.session.data,
    officeData: officeData.data,
    employeeData: employeeData.data,
    allPackageData: packageData.data,
    inTransitPackageData: inTransitPackages,
    deliveredPackageData: deliveredPackages,
    failedPackageData: failedPackages,
    latePackageData: latePackages
          
  })
})

router.get("/packageCreation", (req,res,next)=>{
  axios.get(apiConfig.baseurl + "/employee/" + req.session.data.employee_id)
  .then((employeeData)=>{
    console.log(employeeData.data)

    axios.get(apiConfig.baseurl + "/office/" + employeeData.data.office_id).then(officeData=>{
      res.render("package-creation", 
      {isAuthorized: req.session.isAuthorized, 
        data:req.session.data,
        officeData: officeData.data,
        employeeData: employeeData.data,
        packageTypes: variables.packageTypes,
        insurancePolicies: variables.insurancePolicies
      })
    }).catch(error=>{
      console.log(error.data.message)
    
    })

  }).catch(error=>{
    console.log(error.message)
  })
});

router.get("/notifications", function(req,res,next){
  res.render("notifications", {isAuthorized: req.session.isAuthorized, data: req.session.data})
})

// router.get("/adminTool", function(req,res,next){
  // res.render('adminTools', {isAuthorized: req.session.isAuthorized, data: req.session.data });
// })

router.get("/deleteEmployee/:employeeId", function(req,res,next){

  axios.get(apiConfig.baseurl + "/employee/remove/" + req.params.employeeId)
  .then(data=>{
    console.log(data)
    res.redirect("/user/adminTool")
  }).catch(err=>{
    console.log(err)
  })

})

router.get("/logout", function(req,res,next){
  req.session.isAuthorized = false;
  req.session.accountId = -1;

  res.redirect("/")
})

router.post('/authorize', function(req, res, next) {
  axios.post(apiConfig.baseurl + "/authorize/", {
    username: req.body.username,
    password: req.body.password
  }).then((apiRespond)=>{
      if(apiRespond.data.isAuthorized){
        //redirect to user profile page
        req.session.data = apiRespond.data.data
        req.session.isAuthorized = apiRespond.data.isAuthorized 

        console.log(req.session.data)

        res.redirect("/user/userProfile")
      } else {
          //redirect to a new page says does not recognize this credentials
        res.send("Login failed")
      }

  }).catch((error)=>{
      console.log(error)
  })

});

router.post("/update", function(req,res,next){
  axios.post(apiConfig.baseurl + "/account/update/" + req.session.data.id, 
    {
      email: req.body.email,
      address: req.body.address,
      phone_number: req.body.phone_number
    }
  ).then((data)=>{
    for(var key in data.data){
      req.session.data[key] = data.data[key]
    }

    res.redirect("/user/userProfile")
  }).catch(error=>{
    console.log(error)
  })
})

router.get("/adminTool", async (req,res,next)=>{

  req.session.current_url = req.originalUrl

  const activityDataRes = await axios.get(apiConfig.baseurl + "/activityReport")
  const transactionData = await axios.get(apiConfig.baseurl + "/transaction") 
  const packageData = await axios.get(apiConfig.baseurl + "/package") 
  const revenue = await axios.get(apiConfig.baseurl + "/revenue")
  const numTransactions = await axios.get(apiConfig.baseurl + "/numTransactions")
  const revenueAvg = await axios.get(apiConfig.baseurl + "/avgTransaction")
  const employeeData = await axios.get(apiConfig.baseurl + "/employee")
  const officeData = await axios.get(apiConfig.baseurl + "/office") 
  console.log(revenue.data[0])
  res.render("adminTools",{
    isAuthorized: req.session.isAuthorized, 
    data:req.session.data,
    activityData: activityDataRes.data,
    transactionData:transactionData.data,
    packageData: packageData.data,
    revenueData: revenue.data[0],
    numTransactions: numTransactions.data[0],
    revenueAvg: revenueAvg.data[0],
    officeData: officeData.data,
    employeeData: employeeData.data
  })
})

router.post("/adminTool", async (req,res,next)=>{
  const activityDataRes = await axios.post(apiConfig.baseurl + "/activityReport", req.body)
  const transactionData = await axios.post(apiConfig.baseurl + "/transactionReport", req.body) 
  const packageData = await axios.get(apiConfig.baseurl + "/package") 
  const revenue = await axios.post(apiConfig.baseurl + "/revenue", req.body)
  const numTransactions = await axios.post(apiConfig.baseurl + "/numTransactions",req.body)
  const revenueAvg = await axios.post(apiConfig.baseurl + "/avgTransaction",req.body)
  const employeeData = await axios.get(apiConfig.baseurl + "/employee")
  const officeData = await axios.get(apiConfig.baseurl + "/office") 
  //console.log(revenue.data[0])
  //console.log("\n------------\n");
  //console.log("req.body\n",activityDataRes.data);
  //console.log("activityDatares.data\n",activityDataRes.data);
  //console.log("\n------------\n");
  res.render("adminTools",{
    isAuthorized: req.session.isAuthorized, 
    data:req.session.data,
    activityData: activityDataRes.data,
    transactionData:transactionData.data,
    packageData: packageData.data,
    revenueData: revenue.data[0],
    numTransactions: numTransactions.data[0],
    revenueAvg: revenueAvg.data[0],
    officeData: officeData.data,
    employeeData: employeeData.data
  })
})


//router.post('/', function(req, res, next) {
//  axios.post(configApi.baseurl + "/package/location/", req.body).then((response) => {
//      console.log('POSTED json object', req.body,'to', configApi.baseurl+"/package/location")
//      res.render('package-management2', { output: {'message':'Successfully updated package location'} });
//  }).catch((err) => {
//    console.log('\n')
//    console.log(err)
//    console.log('\n')
//  })
//});




module.exports = router;
