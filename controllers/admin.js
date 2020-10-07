
var Employee = require('../models/employee');


exports.getEmployee = function(req, res) {
  Employee.findAll(function(err, listResult) {
        res.render('employeeList' , {
          pageTitle: 'employee list page',
          employ: listResult,
          message: req.flash('message'),
          errormessage : req.flash('errormessage'),
  });
  });
};

exports.getNewEmployee = function(req,res) {
	
  res.render('newEmployee', {
    pageTitle: 'New Employee Page'
  });
  
}



exports.createEmployee = function(req, res) {

    	const new_employee = new Employee(req.body);
	    Employee.create(new_employee, function(err, employee) {
	    var empLength = Object.keys(new_employee).length;
		/*console.log("employeeadmin page....................////////////////");
		console.log(employee);*/
		if(employee.length > 0) {
			console.log('employeeList is large....')
			req.flash('errormessage', 'Employee Already Exists');
         		res.redirect('/employee');
		}
		else{
	            req.flash('message', 'Employee Created Succesfully');
	         	res.redirect('/employee');
	     }
	       });
    
};

exports.updateEmployee = (req,res)=>{
	const employee = new Employee(req.body);	
	Employee.update(req.query.id, employee , function(err, result) {
		
		/*var updateEmpResult = Object.keys(result).length; */
		if(result.length > 0) {
			req.flash('errormessage', 'Employee Already Exists');
        	res.redirect('/employee');
		}
		else{
			 req.flash('message', 'Employee Updated Succesfully');
         	 res.status(201).redirect('/employee');
		}		
	})

}

exports.editEmployee = (req,res)=> {
 
 Employee.editEmployee(req.query.id, function(err, updateResult){
 	   res.status(201).render('employeeEdit',{           
          pageTitle: 'new employee page',
          empresult: updateResult
        
    });

 })
 		
};


exports.deleteEmployee = function(req, res) {
  Employee.deleteEmployee( req.query.id, function(err, employee) {
    req.flash('errormessage', 'Employee Deleted Succesfully');
      res.redirect('/employee')
  });
};