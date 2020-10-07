
const db = require('../util/database');


var Employee = function(employee){
    this.id    = employee.id;
    this.name  = employee.name;
    this.email = employee.email;
    this.phone = employee.phone;
   
};



Employee.findAll = function (result) {
	db.query("Select * from employee", function (err, res) {
	if(err) {
	  console.log("error: ", err);
	  result(null, err);
	}
	else{
	  result(null, res);
	}
	});
};

Employee.create = function (newEmp, result) {  
    		let email = newEmp.email;
    		let name = newEmp.name;
    		let phone = newEmp.phone;
    		db.query("SELECT * FROM employee WHERE email = '"+ email +"' or name = '"+ name +"';", function(err, duplicateResult){
    	
    			if(duplicateResult.length > 0) {
    				result(null, duplicateResult);
    			}
    			else{

	    			db.query('INSERT INTO employee (email, name, phone) VALUES ("'+ email +'","'+ name +'","'+ phone +'")', function (err, res) {
		    			result(null, res);
		    
		    		});

    			}
		 
    });
              
};

Employee.update = function(id, employee, result) {
	var id = id;
	const email = employee.email;
	const name = employee.name;
	const phone = employee.phone;
	db.query("SELECT * FROM employee WHERE email = '"+ email +"' or name = '"+ name +"'", function(err, dupliResult){
		var getempLength = Object.keys(dupliResult).length;

		if(getempLength > 0) {
			/*console.log('employrees are more');*/
			result(null, dupliResult);
		}
		else{
			
		db.query("Update employee SET email='"+ email +"',name='"+ name +"',phone='"+ phone +"' WHERE id = '"+ id +"'", function(err, updateResult){
			if(err) throw err;
			result(null, updateResult);
		});
		}
	});
}

Employee.editEmployee = function(id, result) {
	   var newId = id;

       db.query("SELECT * FROM employee WHERE id = '" + newId + "'", function(err, updateResult){
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, updateResult);
        }
  });
}




Employee.deleteEmployee = function(id, result){

     db.query("DELETE FROM employee WHERE id = ?", [id], function (err, res) {
     	console.log('id...............>>>>>>>>>>');
	console.log(id);
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};


module.exports = Employee;