const sql = require('../db.js')
const exception = require("../error/exception.js")

const Transaction = function(transaction){
    this.item_revenue_name = transaction.item_revenue_name,
    this.item_revenue_price = transaction.item_revenue_price,
    this.transaction_date = transaction.transaction_date
    
}

Transaction.create = (newTransaction, result) => {
    sql.query("insert into transaction set item_revenue_name = ?, item_revenue_price = ?, transaction_date = ?", 
    [newTransaction.item_revenue_name, newTransaction.item_revenue_price, newTransaction.transaction_date] 
    , (err, res)=>{
            if(err){
                console.log("error :", err);
                result(err, null);
                return;
            }
            console.log("created transaction: ", { transaction_id: res.insertId, ...newTransaction });
            result(null, { transaction_id: res.insertId, ...newTransaction })
        }
    );
}

Transaction.findById = (transactionid, result)=>{
    sql.query(`select item_revenue_name, item_revenue_price, transaction_date from transaction where transaction_id = '${transactionid}'`, (err, res)=>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            result(null, res[0]);
            return;
        } else {
            result({kind: exception.NOT_FOUND_ERROR}, null);
        }
    })
}

Transaction.updateById = (transactionid, transaction, result)=>{
    sql.query(
        "update transaction set ? where transaction transaction_id = ?;",
        [transaction, transactionid],
        (err, res)=>{
            if(err){
                console.log("error", err);
                result(err, null);
                return;
            }

            if ( res.affectedRows == 0){
                result({kind: exception.NOT_FOUND_ERROR}, null)
                return;
            } else {
                console.log("updated transaction: ", { transactionid: transactionid, ...transaction });
                result(null, { transactionid: transactionid, ...transaction });
            }
        }
    )
}

Transaction.removeById = (transactionid,result)=>{
  sql.query(`DELETE FROM transaction WHERE transaction_id ='${transactionid}'`, (err, res) => {
    if(err){
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("DELETE transaction id: ", transactionid);
    if(res.length){
        result(null, res[0]);
        return;
    } else {
        result({kind: exception.NOT_FOUND_ERROR}, null);
    }
  });
  
}


Transaction.getAll = result => {
    sql.query("SELECT * FROM transaction", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      //console.log("transaction: ", res);
      result(null, res);
    });
  };




Transaction.getRevenue = result => {
    sql.query("SELECT SUM( item_revenue_price ) AS revenue FROM transaction", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Transaction revenue: ", res);
      result(null, res);
    });
  };

function fixDate(date) {
    //console.log("old: " + date.toISOString());
    date.setHours(date.getHours() - date.getTimezoneOffset()/60);
    //console.log("new: " + date.toISOString());
    return date.toISOString();
}

Transaction.getTransactionReport = (transReqParams, result) => {
    var start_date = transReqParams.start_date || '0100-01-01' ;
    var start_time = transReqParams.start_time || '00:00';
    var end_date = transReqParams.end_date || '9999-01-01';
    var end_time = transReqParams.end_time || '00:00';
    var start_sqldate = fixDate(new Date(start_date + " " + start_time));
    var end_sqldate = fixDate(new Date(end_date + " " + end_time));
    var transactionQuery = "SELECT * FROM transaction WHERE transaction_date BETWEEN + '" + start_sqldate + "' AND '" + end_sqldate + "';";
    console.log("Sent query: ", transactionQuery);
    sql.query(
        transactionQuery,
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            result(null, res);
        }
    );
}

Transaction.getNumTransactions = result => {
    sql.query("SELECT COUNT(*) 'count' FROM transaction;", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Total number of transactions: ", res);
      result(null, res);
    });
  };

Transaction.getAvgTransaction = result => {
    sql.query("SELECT ROUND(AVG(item_revenue_price),2) 'average' FROM transaction;", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Average transaction value: ", res);
      result(null, res);
    });
  };


Transaction.getRevenueRange = (transReqParams, result) => {
    var start_date = transReqParams.start_date || '0100-01-01' ;
    var start_time = transReqParams.start_time || '00:00';
    var end_date = transReqParams.end_date || '9999-01-01';
    var end_time = transReqParams.end_time || '00:00';
    var start_sqldate = fixDate(new Date(start_date + " " + start_time));
    var end_sqldate = fixDate(new Date(end_date + " " + end_time));
    // SELECT SUM( item_revenue_price ) AS revenue FROM transaction WHERE transaction_date BETWEEN '2020-04-21 00:00:00' AND '2020-04-22 14:49:19';
    var transactionQuery = "SELECT SUM( item_revenue_price ) AS revenue FROM transaction WHERE transaction_date BETWEEN + '" + start_sqldate + "' AND '" + end_sqldate + "';";
    console.log("Sent query: ", transactionQuery);
    sql.query(
        transactionQuery,
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            result(null, res);
        }
    );
}


Transaction.getNumTransactionsRange = (transReqParams, result) => {
    var start_date = transReqParams.start_date || '0100-01-01' ;
    var start_time = transReqParams.start_time || '00:00';
    var end_date = transReqParams.end_date || '9999-01-01';
    var end_time = transReqParams.end_time || '00:00';
    var start_sqldate = fixDate(new Date(start_date + " " + start_time));
    var end_sqldate = fixDate(new Date(end_date + " " + end_time));
    var transactionQuery = "SELECT COUNT(*) 'count' FROM transaction WHERE transaction_date BETWEEN + '" + start_sqldate + "' AND '" + end_sqldate + "';";
    console.log("Sent query: ", transactionQuery);
    sql.query(
        transactionQuery,
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            result(null, res);
        }
    );
}

Transaction.getAvgTransactionRange = (transReqParams, result) => {
    var start_date = transReqParams.start_date || '0100-01-01' ;
    var start_time = transReqParams.start_time || '00:00';
    var end_date = transReqParams.end_date || '9999-01-01';
    var end_time = transReqParams.end_time || '00:00';
    var start_sqldate = fixDate(new Date(start_date + " " + start_time));
    var end_sqldate = fixDate(new Date(end_date + " " + end_time));
    //sql.query("SELECT ROUND(AVG(item_revenue_price),2) 'average' FROM transaction;", (err, res) => {
    var transactionQuery = "SELECT ROUND(AVG(item_revenue_price),2) 'average' FROM transaction WHERE transaction_date BETWEEN + '" + start_sqldate + "' AND '" + end_sqldate + "';";
    console.log("Sent query: ", transactionQuery);
    sql.query(
        transactionQuery,
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            result(null, res);
        }
    );
}





 

module.exports = Transaction