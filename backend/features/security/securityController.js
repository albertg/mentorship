var Authenticator = require('../../lib/authenticator');
var EmployeeController = require('../employee/employeeController');

class SecurityController{
    constructor(database){
        this.db = database;
        this.auth = new Authenticator();
        this.employeeController = new EmployeeController(this.db);
    }

    authenticate(user){
        return new Promise((resolve, reject) => {
            this.auth.authenticate(user.email, user.pwd).then(authResponse => {
                if(authResponse && authResponse.isAuthenticated){
                    this.employeeController.getEmployee(authResponse.email).then(authUser => {
                        if(authUser && authUser.status === 'success'){
                            resolve(authUser);
                        }else{
                            this.employeeController.registerUser(authResponse).then(newUser => {
                                resolve(newUser);                                
                            });
                        }
                    });
                }
            }).catch(() => {
                reject({"status":"failed","message":"Invalid credentials supplied"});
            });           
        });
    }
}

module.exports = SecurityController;
