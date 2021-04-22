const sql = require('../db.js')
const exception = require("../error/exception.js")

const Account = function(account){
    this.username = account.username
    this.password = account.password
    this.employee_id = account.employee_id
    //user type:
    // 0 normal customer
    // 1 employee
    // 2 admin
    this.user_type= account.user_type
    this.name = account.name
    this.email = account.email
    this.address = account.address
    this.phone_number = account.phone_number
}

Account.create = (newAccount, result) => {
    sql.query("insert into account set username = ?, password = ?, employee_id = ?, user_type = ?, name = ?, email = ?, address = ?, phone_number = ?", 
    [newAccount.username, newAccount.password, newAccount.employee_id, newAccount.user_type, newAccount.name, newAccount.email, newAccount.address, newAccount.phone_number] 
    , (err, res)=>{
            if(err){
                console.log("error :", err);
                result(err, null);
                return;
            }
            console.log("created account: ", { id: res.insertId, ...newAccount });
            result(null, { id: res.insertId, ...newAccount })
        }
    );
}

Account.findById = (accountId, result)=>{
    sql.query(`select name, email, address, phone_number, user_type from account where id = '${accountId}'`, (err, res)=>{
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

Account.findByUsername = (username, password, result)=>{
    sql.query(`select * from account where username = '${username}' and password = '${password}'`, (err, res)=>{
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

Account.updateById = (id, account, result)=>{
    sql.query(
        "update account set ? where id = ?;",
        [account, id],
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
                console.log("updated account: ", { id: id, ...account });
                result(null, { id: id, ...account });
            }
        }
    )
}

Account.removeById = (id, result)=>{
    sql.query(`DELETE FROM account WHERE id ='${id}'`, (err, res) => {
        if(err){
          console.log("error", err);
          result(err, null);
          return;
        }
        console.log("DELETE account id: ", id);
        if(res.length){
            result(null, res[0]);
            return;
        } else {
            result({kind: exception.NOT_FOUND_ERROR}, null);
        }
      });
}

module.exports = Account





