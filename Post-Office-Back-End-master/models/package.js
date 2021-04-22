const sql = require('../db.js')
const exception = require("../error/exception")

const Package = function(package){
    this.package_type = package.package_type
    this.weight = package.weight
    this.height = package.height
    this.width= package.width
    this.length = package.length
    this.tracking_number = package.tracking_number
    this.price = package.price
    this.insurance = package.insurance
    this.package_value = package.package_value
    this.recipient_id = package.recipient_id
    this.sender_id = package.sender_id
    this.is_delivered = package.is_delivered
    this.note = package.note
    this.recipient_name = package.recipient_name
    this.recipient_address = package.recipient_address
    this.recipient_phone_number = package.recipient_phone_number
    this.recipient_email = package.recipient_email
    this.sender_name = package.sender_name
    this.sender_address = package.sender_address
    this.sender_phone_number = package.sender_phone_number
    this.sender_email = package.sender_email
    this.current_location = package.current_location
    this.delivery_status= package.delivery_status
    this.office_id = package.office_id
}


Package.create = (newPackage, result) => {

    sql.query("insert into package set ?", newPackage 
    , (err, res)=>{
            if(err){
                console.log("error :", err);
                result(err, null);
                return;
            }

            console.log("created package: ", { id: res.insertId, ...newPackage });
            result(null, { id: res.insertId, ...newPackage })
        }
    );
}


Package.updateLocation = (newPkgInfo, result) => {
    console.log("\n\n" + newPkgInfo["current_location"] + "\n\n");
    var updateQuery = "UPDATE package SET current_location='" + newPkgInfo["current_location"] + "' WHERE package_id='" + newPkgInfo["package_id"] + "'";
    sql.query(
        updateQuery,
        [
        newPkgInfo["current_location"],
        newPkgInfo["package_id"]
        ],
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            console.log("updated package current_location", {id: newPkgInfo["package_id"]});
            result(null, {id: res.insertId})
        }
    );
}

Package.checkTracking = (trackingNumber, result) => {
    sql.query("SELECT * from package WHERE tracking_number = " + trackingNumber,
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            result(null, res[0])
        }
    );
}
Package.showPackagesByAccountId = (accountId, result) => {
    sql.query("SELECT * from package WHERE recipient_id = ? or sender_id = ?",[accountId, accountId],
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            console.log(res);

            result(null, res)
        }
    );
}

Package.addNewPackageToAccountId = (data, result) => {
    sql.query("update package set recipient_id = ? where tracking_number = ?",
    [data.account_id, data.tracking_number],
        (err, res) => {
            if (err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
            console.log(res);

            result(null, res)
        }
    );
}
 


Package.findById = (packageId, result)=>{
    console.log(packageId)
    sql.query('select * from package where package_id = ?',[packageId], (err, res)=>{
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


Package.findByOfficeId = (officeId, result)=>{
    sql.query('select * from package where office_id = ?',officeId, (err, res)=>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            result(null, res);
            return;
        } else {
            result({kind: exception.NOT_FOUND_ERROR}, null);
        }
    })
}


Package.getAll = result => {
    sql.query("SELECT * FROM package", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      //console.log("Package: ", res);
      result(null, res);
    });
  };
  
Package.updateByTrackingNumber = (trackingNumber, package, result)=>{
    sql.query("update package set ? where tracking_number = ?", 
    [package, trackingNumber]
    , (err, res)=>{
            if(err){
                console.log("error", err);
                result(err, null);
                return;
            }

            if ( res.affectedRows == 0){
                result({kind: exception.NOT_FOUND_ERROR}, null)
                return;
            } else {
                console.log("updated package: ", { tracking_number: trackingNumber, ...package });
                result(null, { tracking_number: trackingNumber, ...package });
            }
        }
    )
}




Package.updateById = (id, package, result)=>{
    sql.query("update into package set package_id = ?, package_type = ?, weight = ?, dimension = ?,tracking_number = ?, digital_signature = ?, price = ?, insurance = ?, pkgvalue = ?, recipient_id = ?, sender_id = ?,note = ?, is_delivered = ?", 
    [newPackage.package_id, newPackage.package_type, newPackage.weight, newPackage.dimension,newPackage.tracking_number, newPackage.digital_signature, newPackage.price, newPackage.insurance,newPackage.pkgvalue, newPackage.recipient_id, newPackage.sender_id, newPackage.note,newPackage.is_delivered] 
    , (err, res)=>{
            if(err){
                console.log("error", err);
                result(err, null);
                return;
            }

            if ( res.affectedRows == 0){
                result({kind: exception.NOT_FOUND_ERROR}, null)
                return;
            } else {
                console.log("updated package: ", { id: id, ...package });
                result(null, { id: id, ...package });
            }
        }
    )
}

Package.removeById = (packageID, result)=>{
    sql.query(`DELETE FROM package WHERE package_id ='${packageID}'`, (err, res) => {
        if(err){
          console.log("error", err);
          result(err, null);
          return;
        }
        console.log("DELETE package id: ", packageID);
        if(res.length){
            result(null, res[0]);
            return;
        } else {
            result({kind: exception.NOT_FOUND_ERROR}, null);
        }
      });
}

Package.removeByTrackingNumber = (trackingNumber, result)=>{

    sql.query('delete from package where tracking_number = ?', trackingNumber, (err, res) => {
        if(err){
            console.log("error", err);
            result(err, null);
            return;
          }
          if(res.length){
              result(null, res[0]);
              return;
          } else {
              result(null,{message: "Successfully deleted package with tracking number = " + trackingNumber});
          }
        });
}


Package.removeAll = result => {
    sql.query("DELETE FROM package", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} packages`);
      result(null, res);
    });
  };
  

module.exports = Package