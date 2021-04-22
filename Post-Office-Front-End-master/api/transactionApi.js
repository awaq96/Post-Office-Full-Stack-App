const axios = require("axios")

const config ={
    baseUrl: "http://localhost:8080",
};

exports.createTransaction = function(newTransaction){
    axios.post(config.baseUrl + "/transaction/", {
        item_revenue_name : newTransaction.item_revenue_name,
        item_revenue_price : newTransaction.item_revenue_price,
        transaction_date : newTransaction.transaction_date,
        item_expend_name : newTransaction.item_expend_name,
        item_expend_price : newTransaction.item_expend_price,
        revenue_daily : newTransaction.revenue_daily,
        revenue_weekly : newTransaction.revenue_weekly,
        revenue_monthly : newTransaction.revenue_monthly,
        revenue_yearly : newTransaction.revenue_yearly,
        off_id : newTransaction.off_id
    }).then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        }).catch((error) => {
        console.error(error)
    })
}

