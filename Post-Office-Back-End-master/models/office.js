const sql = require('../db.js')
const exception = require("../error/exception.js")

const Office = function(office){
    this.off_name = office.off_name
    this.off_zip = office.off_zip
    this.off_numPkgs = office.off_numPkgs
    this.off_numEmpl = office.off_numEmpl
    this.off_address = office.off_address
}


Office.create = (newOffice, result) => {

    sql.query("insert into office set off_name = ?, off_zip = ?, off_numPkgs = ?,off_numEmpl=?, off_address = ?", 
    [newOffice.off_name, newOffice.off_zip, newOffice.off_numPkgs,newOffice.off_numEmpl, newOffice.off_address] 
    , (err, res)=>{
            if(err){
                console.log("error :", err);
                result(err, null);
                return;
            }

            console.log("created Office: ", { id: res.insertId, ...newOffice });
            result(null, { id: res.insertId, ...newOffice })
        }
    );
}

Office.findById = (offId, result)=>{
    sql.query('select * from office where off_id = ?',[offId], (err, res)=>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            result(null, res[0]);
            return;
        } else {
            result({kind: exception.NOT_FOUND_ERROR }, null);

        }
    })
}

Office.getAll = result=>{
    sql.query("select * from office", (err, res)=>{
        if(err){
            console.log("Error: ", err)
            result(null, err)
            return;
        } else {
            result(null, res)
        }
    })
}


Office.updateByOfficeid = (officeId, office, result)=>{
    sql.query("update office set ? where off_id = ?", 
    [office, officeId]
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
                console.log("updated package: ", { off_id: officeId, ...office });
                result(null, { off_id: officeId, ...office });
            }
        }
    )
}

Office.removeById = (officeId, result)=>{
    sql.query(`DELETE FROM office WHERE off_id ='${officeId}'`, (err, res) => {
        if(err){
          console.log("error", err);
          result(err, null);
          return;
        }
        console.log("DELETE office id: ", officeId);
        if(res.length){
            result(null, res[0]);
            return;
        } else {
            result({kind: exception.NOT_FOUND_ERROR}, null);
        }
      });
}

module.exports = Office
