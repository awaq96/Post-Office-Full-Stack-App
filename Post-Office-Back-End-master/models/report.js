const sql = require('../db.js')

/*
activity table in DB columns:
    activity_id
    activity_type
    activity_date
    activity_user

example req:
    curl  --header "Content-Type: application/json" -d "{\"activity_type\":\"pkg_update\",\"activity_date\":\"2020-04-18 00:00:00\",\"activity_alert\":\"1\"}" http://localhost:8080/activityReport
*/


function fixDate(date) {
    //console.log("old: " + date.toISOString());
    date.setHours(date.getHours() - date.getTimezoneOffset()/60);
    //console.log("new: " + date.toISOString());
    return date.toISOString();
}

exports.getActivityReport = (actReqParams, result) => {
    var start_date = actReqParams.start_date || '0100-01-01' ;
    var start_time = actReqParams.start_time || '00:00';
    var end_date = actReqParams.end_date || '9999-01-01';
    var end_time = actReqParams.end_time || '00:00';
    var start_sqldate = fixDate(new Date(start_date + " " + start_time));
    var end_sqldate = fixDate(new Date(end_date + " " + end_time));
    var activityQuery = "SELECT * FROM activity WHERE activity_date BETWEEN + '" + start_sqldate + "' AND '" + end_sqldate + "'";
    if (actReqParams.alert_only) {
        activityQuery += " AND activity_alert = 1";
    }
    activityQuery += ';'
    console.log("Sent query: ", activityQuery);
    sql.query(
        activityQuery,
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            console.log("Retrieving activity log w/ parameters: ", actReqParams);
            result(null, res);
        }
    );
}

exports.getAll = result => {
    sql.query("SELECT * FROM activity", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      //console.log("Activity: ", res);
      result(null, res);
    });
  };
 