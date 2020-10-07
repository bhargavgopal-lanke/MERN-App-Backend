const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');


router.get('/', adminController.getEmployee);

router.get('/newEmployee', adminController.getNewEmployee);

router.get('/deleteEmployee', adminController.deleteEmployee);

router.post('/createEmployee', adminController.createEmployee);

router.get('/employeeEdit', adminController.editEmployee);

router.post('/updateEmployee', adminController.updateEmployee);


module.exports = router;