var express = require('express')
var router = express.Router()  
var configApi = require("../api/config")
var axios = require("axios")


class NewTransaction {
  constructor(item_revenue_name, item_revenue_price, transaction_date, revenue_daily, revenue_weekly,revenue_monthly, revenue_yearly, off_id){

    this.item_revenue_name = item_revenue_name,
    this.item_revenue_price = item_revenue_price,
    this.transaction_date = transaction_date,
    this.item_expend_name = item_expend_name,
    this.item_expend_price = item_expend_price,
    this.revenue_daily = revenue_daily,
    this.revenue_weekly = revenue_weekly,
    this.revenue_monthly = revenue_monthly,
    this.revenue_yearly = revenue_yearly,
    this.off_id = off_id
  }
}



router.get('/', function(req, res){
 
  res.render('transaction-creation', { title: 'transaction' });
  
})



router.post('/', function(req, res, next){
  console.log(req.body)
  var item_revenue_name = req.body.item_revenue_name
  var item_revenue_price = req.body.item_revenue_price
  var transaction_date = req.body.transaction_date
  var revenue_daily= req.body.revenue_daily
  var revenue_weekly= req.body.revenue_weekly
  var revenue_monthly= req.body.revenue_monthly
  var revenue_yearly= req.body.revenue_yearly
  var off_id = req.body.off_id

  let newTransaction = new NewTransaction(item_revenue_name, item_revenue_price, transaction_date,  transaction_date, revenue_daily, revenue_weekly,revenue_monthly, revenue_yearly, off_id)

  axios.post(configApi.baseurl + "/transaction/", {
    item_revenue_name : newTransaction.item_revenue_name,
    item_revenue_price : newTransaction.item_revenue_price,
    transaction_date : newTransaction.transaction_date,
    item_expend_name : newTransaction.item_expend_name,
    item_expend_price : newTransaction.item_expend_price,
    off_id : newTransaction.off_id,
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