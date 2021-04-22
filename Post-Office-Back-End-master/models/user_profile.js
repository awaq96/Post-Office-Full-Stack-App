const sql = require('../db.js')
const user_profile = function(profile){
    this.name=profile.name
    this.address=profile.address
    this.phone_number=profile.phone_number
    this.userType=profile.userType
    this.email=profile.email
}

user_profile.create = (newUser,result)=>{

    sql.query("insert into user_profile set name =?, address = ?, phone_number=?,userType=?, email=?",
    [newUser.name, newUser.address,newUser.phone_number,newUser.usertype,newUser.email],
    (err, res)=>{
        if(err){
            console.log("error :", err);
            result(err, null);
            return;
        }
        console.log("created user profile: ", {name: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser})
    }
    );
}

user_profile.findById = (id,result)=> {
    sql.query('select * from user_profile where user_name =${id}',(err,res)=>{
        if(err){
            console.log("error",err);
            result(err,null);
            return;}
            if(res.length){
                result(null, res[0]);
                return;
            } else {
                result({kind: NOT_FOUND_ERROR}, null);
            }
        })
}

user_profile.updateById=(id,profile,result)=>
    sql.query("update user_profile set set name =?, address = ?, phone_number=?,userType=?, email=?",
    [newUser.name, newUser.address,newUser.phone_number,newUser.usertype,newUser.email],
     (err, res)=>{
        if(err){
            console.log("error",err);
            result(err,null);
            return;
        }
        if ( res.affectedRows == 0){
            result({kind: NOT_FOUND_ERROR}, null)
            return;
        } else {
            console.log("updated user_profile: ", { id: id, ...user_profile });
            result(null, { id: id, ...customer });
        }
    }
)


user_profile.removeById = (id,result)=>{
    sql.query("delete from user_profile where id = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            //return;
            if (res.affectedRows == 0) {
                // not found userprofile with the id
                result({ kind: NOT_FOUND_ERROR }, null);
                return;
              }
          
              console.log("DELETED user ID ", id);
              result(null, res);
            }
        }
    )};
        
module.exports = user_profile