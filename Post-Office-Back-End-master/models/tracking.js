const sql = require('../db.js')

const Tracking = function(tracking){
    this.tracking_number = account.tracking_number
    this.final_location = account.final_location
    this.final_location = account.current_location
    this.previous_location = account.previous_location
    this.sent_date = account.sent_date
    this.Pkgstatus = account.Pkgstatus
    this.is_delivered = account.is_delivered
    this.estimated_arrival = account.estimated_arrival

    //Constant
    this.NOT_FOUND_ERROR = "not_found_account"
}


Tracking.create = (newTracking, result) => {

    sql.query("insert into tracking set tracking_number = ?, final_location = ?, current_location = ?, previous_location = ?,sent_date = ?, Pkgstatus = ?, is_delivered = ?, estimated_arrival = ?", 
    [newTracking.tracking_number, newTracking.final_location, newTracking.final_location, newTracking.previous_location,newTracking.sent_date,newTracking.Pkgstatus,newTracking.is_delivered,newTracking.estimated_arrival] 
    , (err, res)=>{
            if(err){
                console.log("error :", err);
                result(err, null);
                return;
            }

            console.log("created customer: ", { id: res.insertId, ...newTracking });
            result(null, { id: res.insertId, ...newTracking })
        }
    );
}

Tracking.findById = (trackingId, result)=>{
    sql.query('select * from tracking where id = ${trackingId}', (err, res)=>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res[0]);
            return;
        } else {
            result({kind: NOT_FOUND_ERROR}, null);
        }
    })
}


Tracking.updateById = (id, account, result)=>{
    sql.query("update into tracking set tracking_number = ?, final_location = ?, current_location = ?, previous_location = ?,sent_date = ?, Pkgstatus = ?, is_delivered = ?, estimated_arrival = ?", 
    [newTracking.tracking_number, newTracking.final_location, newTracking.final_location, newTracking.previous_location,newTracking.sent_date,newTracking.Pkgstatus,newTracking.is_delivered,newTracking.estimated_arrival] 
    , (err, res)=>{
            if(err){
                console.log("error", err);
                result(err, null);
                return;
            }

            if ( res.affectedRows == 0){
                result({kind: NOT_FOUND_ERROR}, null)
                return;
            } else {
                console.log("updated customer: ", { id: id, ...tracking });
                result(null, { id: id, ...tracking });
            }
        }
    )
}

Tracking.removeById = (id, result)=>{
    sql.query("DELETE FROM tracking WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: NOT_FOUND_ERROR }, null);
        return;
      }
  
      console.log("DELETED Tracking ID ", id);
      result(null, res);
    });
}

Tracking.getHistory = (trackingNumber, result) => {
    sql.query("SELECT tracking_date, tracking_location, tracking_status from tracking WHERE tracking_number = " + trackingNumber,
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            result(null, res)
        }
    );
}

module.exports = Tracking




