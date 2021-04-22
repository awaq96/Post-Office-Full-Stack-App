const sql = require('../db.js')
const exception = require("../error/exception")

const Employee=function(employee){
this.is_admin=employee.is_admin
this.phone_number=employee.phone_number
this.position=employee.position
this.schedule = employee.schedule
this.salary=employee.salary
this.vacation=employee.vacation
this.office_id = employee.office_id
}

Employee.create=(newEmployee,result)=>{
    console.log("employee data ", newEmployee)
    sql.query("insert into employee set is_admin=?,phone_number=?,position=?,schedule=?,vacation=?, salary = ?, office_id = ?",
    [newEmployee.is_admin,newEmployee.phone_number,newEmployee.position,newEmployee.schedule,newEmployee.vacation, newEmployee.salary, newEmployee.office_id],
    (err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        result(null,{id:res.insertId,...newEmployee})

    });}


Employee.findById=(EmployeeID,result)=>{
    sql.query("select * from employee where employee_id=?",EmployeeID,(err,res)=>{
        if(err){
            console.log("error",err);
            result(err,null);
            return;}
            if(res.length){
                result(null,res[0]);
                return;
            }else {
                result({kind: exception.NOT_FOUND_ERROR},null);
            }
        });
    }


    Employee.getPosition = (Emplposition,result)=>{
        sql.query("SELECT * FROM employee WHERE position where position=?",Emplposition,(err,res)=>{
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
          
              console.log("Employees with This position: ", res);
              result(null, res);
        });


    }
    Employee.getAll = result => {
        sql.query("SELECT * FROM employee", (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("employees: ", res);
          result(null, res);
        });
      };

Employee.updateById=(id,employee,result)=>{
    sql.query("update employee set ? where employee_id = ?;",
    [employee, id],
    (err,res)=>{
        if(err){
            console.log("error",err);
            result(err,null);
            return;
        }
        if(res.affectedRows==0){
            result({kind: exception.NOT_FOUND_ERROR},null)
            return;
        }else {
            result(null,{id,...newEmployee});
        }
        })}



Employee.vacationApproval =(EmployeeInfo,Date_requested,result)=>{
    sql.query("CREATE TRIGGER Vacation_Violation BEFORE INSERT ON EMPLOYEE FOR EACH ROW IF EXIST(SELECT * FROM EMPLOYEE WHERE VACATION=? ) INSERT INTO EMPLOYEE SET VACATION=NULL WHERE employee_id=?",Date_requested,[EmployeeInfo.employee_id],(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    });

    
    var vacStatus =[];
    
    sql.query("SELECT vacation from employee where employee_id=?",[EmployeeInfo.employee_id],(err,res)=>{

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          else {
               setValue(res); 
    

          }
    });

    function SetValue(value){
        vacStatus=value;
        if(vacStatus==Date_requested){
            console.log("Vacation has been approved");
            var approval="Vacation has been approved";
            result(null,approval);

        }
        else{
            console.log("Vacation has been denied");
            var deny="Vacation has been denied";
            result(null,deny);
        }
    }
    
}
        
    Employee.removeById=(employee_id,result)=>{
        sql.query("delete from employee where employee_id=?",employee_id,(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;}
                if(res.affectedRows==0){
                    result({kind:exception.NOT_FOUND_ERROR},null);
                    return;
                }
                result(null,res);
            });
        }

        Employee.removeAll = result => {
            sql.query("DELETE FROM employee", (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
          
              console.log(`deleted ${res.affectedRows} employees`);
              result(null, res);
            });
          };
        module.exports=Employee