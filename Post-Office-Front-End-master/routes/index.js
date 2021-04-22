var express = require('express');
var router = express.Router();
var configApi = require("../api/config")
var axios = require("axios")

//router.use(session({ secret: 'session id 12345', cookie: { maxAge: 60000 }}))

////// Access the session as req.session
//router.get('/', function(req, res, next) {
  //if (req.session.views) {
    //req.session.views++
    //res.setHeader('Content-Type', 'text/html')
    //res.write('<p>views: ' + req.session.views + '</p>')
    //res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    //res.end()
  //} else {
    //req.session.views = 1
    //res.end('welcome to the session demo. refresh!')
  //}

  //req.session.is_authorized = true

  //if(req.session.is_authorized){
    //res.write('<p>authorized: YES</p>')
  //} else {
    //res.write('<p>authorized: NOPE</p>')
  //}

//})

/* GET home page. */
router.get('/', function(req, res, next) {
  var isAuthorized = false;
  if(req.session.isAuthorized == true){
    isAuthorized = true;
  }
  res.render('index', { title: 'Post Office Project Group 8', isAuthorized: isAuthorized});
});

router.post('/tracking', function(req, res, next) {
  axios.post(configApi.baseurl + "/package/tracking/", req.body).then((response) => {
    if (response.data[0] == null) {
      res.render('tracking', { output: {'message':'This tracking number does not exist'} });
    }
    else {
      console.log('\n')
      console.log(response.data[0]);
      console.log('\n')
      res.render('tracking', { output: response.data[0] });
    }
  }).catch((err) => {
    console.log('\n')
    console.log(err)
    console.log('\n')
  })
});

module.exports = router;
