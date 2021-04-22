const sql = require('../db.js')

const Vehicle = function(vehicle){
    this.vehicle_id = account.vehicle_id
    this.plate_number = account.plate_number
    this.vehicle_description = account.vehicle_description
    this.miles_driven = account.miles_driven
    this.location = account.location
    this.VIM = account.VIM
    this.capacity = account.capacity
    this.current_location = account.current_location


    //Constant
    this.NOT_FOUND_ERROR = "not_found_account"
}


Vehicle.create = (newVehicle, result) => {

    sql.query("insert into vehicle set vehicle_id = ?, plate_number = ?, vehicle_description = ?, miles_driven = ?,location=?,VIM=?,capacity=?,current_location=?", 
    [newVehicle.vehicle_id, newVehicle.plate_number, newVehicle.vehicle_description, newVehicle.miles_driven, newVehicle.location, newVehicle.VIM, newVehicle.capacity, newVehicle.current_location] 
    , (err, res)=>{
            if(err){
                console.log("error :", err);
                result(err, null);
                return;
            }

            result(null, { id: res.insertId, ...newVehicle })
        }
    );
}

Vehicle.findById = (vehicleId, result)=>{
    sql.query('select * from vehicle where id = ${vehicleId}', (err, res)=>{
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


Vehicle.getAll = result => {
    sql.query("SELECT * FROM vehicle", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("vehicle: ", res);
      result(null, res);
    });
  };



Vehicle.updateById = (id, vehicle, result)=>{
    sql.query(
        "update vehicle set vehicle_id = ?, plate_number = ?, vehicle_description = ?, miles_driven = ?,location=?,VIM=?,capacity=?,current_location=?", 
        [newVehicle.vehicle_id, newVehicle.plate_number, newVehicle.vehicle_description, newVehicle.miles_driven, newVehicle.location, newVehicle.VIM, newVehicle.capacity, newVehicle.current_location] ,
        [account.email, account.username, account.password, account.userType],
        (err, res)=>{
            if(err){
                console.log("error", err);
                result(err, null);
                return;
            }

            if ( res.affectedRows == 0){
                result({kind: NOT_FOUND_ERROR}, null)
                return;
            } else {
                console.log("updated vehicle: ", { id: id, ...vehicle });
                result(null, { id: id, ...vehicle });
            }
        }
    )
}

Vehicle.removeById = (id, result)=>{
    sql.query("DELETE FROM vehicle WHERE vehicle_id = ?", id, (err, res) => {
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
  
      console.log("DELETED Vehicle ID ", id);
      result(null, res);
    });
}

Vehicle.removeAll = result => {
    sql.query("DELETE FROM vehicle", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} vehicles`);
      result(null, res);
    });
  };

module.exports = Vehicle



