var formidable = require('formidable');
var fs = require('fs');
var XLSX = require('xlsx');
var BusinessUnitController = require('../businessUnit/businessUnitController');
var PracticeController = require('../practice/practiceController');
var LocationController = require('../location/locationController');
var EmployeeController = require('../employee/employeeController');

class EmployeeSyncController{
    constructor(database){
        this.db = database;
        this.buController = new BusinessUnitController(this.db);
        this.practiceController = new PracticeController(this.db);
        this.locationController = new LocationController(this.db);
        this.employeeController = new EmployeeController(this.db);
    }

    syncEmployeeData(req){
        return new Promise((resolve, reject) => {
            var that = this;
            var form = new formidable.IncomingForm();
            form.parse(req, (err, fields, files) => {                
                    var oldPath = files.syncStore.path;
                    var newPath = files.syncStore.path+'.xls';
                    fs.rename(oldPath, newPath, function (err) {
                        if (err){
                            reject(err);
                        }
                        //read the excel file
                        var workbook = XLSX.readFile(newPath);
                        var sheets = workbook.SheetNames;
                        var jsonified = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[1]]);
                        that.syncEmployees(0, that, jsonified, resolve);            
                    });
            });
        });
    }

    syncEmployees(index, reference, employeeArray, callback){
        var lIndex = index;
        var empArr = employeeArray;
        if(lIndex < empArr.length ){
            reference.syncEmployee(empArr[lIndex], reference).then(() => {
                lIndex = lIndex + 1;
                reference.syncEmployees(lIndex, reference, empArr, callback);
            });
        }else{
            reference.syncEmployeeManagers(0, reference, employeeArray, callback);
        }
    }

    syncEmployeeManagers(index, reference, employeeArray, callback){
        if(index < employeeArray.length ){
            reference.syncEmployeeManager(employeeArray[index], reference, employeeArray).then(() => {
                index = index + 1;
                reference.syncEmployeeManagers(index, reference, employeeArray, callback);
            });
        }else{
            callback({"status":"success","contents":employeeArray});        
        }
    }

    syncEmployeeManager(employee, reference, employeeArray){
        return new Promise((resolve) => {
            //associate practice head
            return reference.practiceController.addPracticeIfNotFound(employee.Practice).then(practice => {
                reference.employeeController.getEmployee(employee['Practice Head Email']).then(ph => {
                    if(ph.status !== "failed"){
                        //assign the user the role of practice head
                        reference.employeeController.promoteAsPracticeHead(ph.payload.id).then(() => {
                            practice.setPracticeHead(ph.payload.id).then(() => {
                                //associate practice manager's practice
                                if(employee['Practice Manager Email']){
                                    reference.employeeController.getEmployee(employee['Practice Manager Email']).then(pm => {
                                        if(pm.status !== "failed"){
                                            //assign the user the role of practice manager
                                            reference.employeeController.promoteAsPracticeManager(pm.payload.id).then(() => {
                                                pm.payload.setManagersPractice(practice.id).then(() => {
                                                    //set this user as practice manager for the designated users
                                                    var pmReportees = employeeArray.filter(emp => emp['Practice Manager Email'] === employee['Practice Manager Email']);
                                                    if(pmReportees && pmReportees.length > 0){
                                                        reference.employeeController.setPracticeManager(pm.payload.id, pmReportees).then(() => {
                                                            resolve({"status":"success"});
                                                        });
                                                    }                                                    
                                                });
                                            });                                            
                                        }else{
                                            resolve({"status":"success"});
                                        }
                                    });
                                }else{
                                    resolve({"status":"success"});
                                }
                            });
                        });                        
                    }else{
                        resolve({"status":"success"});
                    }
                });
            });
        });
    }

    syncEmployee(jsonEmployee, reference){
        return new Promise((resolve) => {
            //add business unit
            return reference.buController.addBUIfNotFound(jsonEmployee.Department).then(bu => {  
                //add practice              
                reference.practiceController.addPracticeIfNotFound(jsonEmployee.Practice).then(practice => {
                    //associate practice to a business unit
                    bu.addPractice(practice.id).then(() => {  
                        //add location                      
                        reference.locationController.addLocationIfNotFound(jsonEmployee['Emp Location']).then(location => {
                            //add employee
                            reference.employeeController.addEmployeeIfNotFound(jsonEmployee, "mentee").then(employee => {
                                //associate employee with location
                                employee.setLocation(location.id).then(() => {
                                    resolve({"status":"success"});
                                }); 
                            });
                        });
                    });                    
                });
            });
        });        
    }
}

module.exports = EmployeeSyncController;
