var getGoalYear = require('../../lib/utils').getYear;

class EmployeeController{
    constructor(database){
        this.db = database;
    }

    listEmployees(){
        return new Promise((resolve) => {
            this.db.Employee.findAll({
                include: ['mentor','mentees'],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }).then(employees => {
                resolve(employees);
            });
        });
    }

    getMentees(employeeId){
        return new Promise((resolve) => {
            this.db.Employee.find({where: {
                id:employeeId},
                include:[{
                    model: this.db.Employee,
                    as: 'mentees',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    }
                }],
                exclude: ['createdAt', 'updatedAt','mentorId']
            })
            .then(employee => {
                resolve(employee.mentees);
            });
        });
    }

    getMenteesWithDetails(employeeId){
        return new Promise((resolve, reject) => {
            this.db.Employee.find({where: {
                id:employeeId},
                include:[{
                    model: this.db.Employee,
                    as: 'mentees',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    },
                    include:[{
                        model: this.db.Goal,
                        as: 'goals',
                        where:{
                            year: getGoalYear()
                        },
                        attributes:{
                            exclude: ['createdAt','updatedAt','year','menteeId','mentorId']
                        },
                        include:[{
                            model: this.db.GoalType,
                            as: 'goalType',
                            attributes:{
                                exclude: ['createdAt','updatedAt']
                            }
                        },{
                            model: this.db.Action,
                            as: 'actions',
                            attributes:{
                                exclude: ['createdAt','updatedAt','createdById','GoalId','goalId',
                                'actionText','id']
                            },
                            include:[{
                                model: this.db.ActionStatus,
                                as: 'actionStatus',
                                attributes:{
                                    exclude: ['createdAt','updatedAt']
                                }
                            }]
                        }]
                    }]
                }],
                exclude: ['createdAt', 'updatedAt','mentorId']
            }).then(employee => {
                resolve(employee.mentees);
            }).catch(err => {
                var errorMessage = err;
                if(err.name === "SequelizeValidationError"){
                    errorMessage = {error: "one or more fields has invalid or empty data"};
                }else if(err.name === "SequelizeForeignKeyConstraintError"){
                    errorMessage = {error: "one or more fields has incorrect data"};
                }
                reject(errorMessage);
            });
        });
    }

    assignMentor(mentorId, menteeIds){
        return new Promise((resolve) => {
            this.db.Employee.findById(mentorId)
                .then(mentor => {
                    mentor.addMentees(menteeIds).then(() => {
                        resolve();
                    });
                });
        });
    }

    removeMentees(mentorId, menteeIds){
        return new Promise((resolve) => {
            this.db.Employee.findById(mentorId)
                .then(mentor => {
                    mentor.removeMentees(menteeIds).then(() => {
                        resolve();
                    });
                });
        });
    }

    getEmployee(email){
        return new Promise((resolve) => {
            this.db.Employee.find({
                where: {
                    email: email
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt','LocationId','PracticeId']
                },
                include: [{
                    model: this.db.Role,
                    as: 'roles',
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    },
                    through:{
                        model: this.db.EmployeeRoles,
                        attributes: []
                    }
                },{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    }
                }]
            }).then(employee => {
                if(employee){
                    resolve({
                        status: 'success',
                        payload: employee
                    });
                }else{
                    resolve({
                        status: 'failed',
                        payload: "no user found"
                    });
                }
            });
        });
    }

    registerUser(user){
        return new Promise((resolve) => {
            this.db.Employee.create({
                firstName: user.firstName.toLowerCase(),
                lastName: user.lastName.toLowerCase(),
                email: user.email.toLowerCase()
            }).then(newUser => {
                this.db.Role.find({
                    where:{
                        roleName: 'mentee'
                    }, 
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    }
                }).then(role => {
                    newUser.addRole(role.id).then(() => {                        
                        resolve({
                            id:newUser.id,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            roles: [role]
                        });
                    });                  
                });
            });
        });
    }

    getEmployeeById(employeeId){
        return new Promise((resolve, reject) => {
            this.db.Employee.find({
                where: {
                    id: employeeId
                },
                include:[{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    }
                }]
            }).then(employee => {
                if(employee){
                    resolve(employee);
                }else{
                    reject({
                        status: "failed",
                        message: "No employee found"
                    });
                }                
            });
        });
    }

    promoteAsMentor(employeeId){
        return this.setEmployeeRole(employeeId, "mentor");
    }

    promoteAsPracticeHead(employeeId){
        return this.setEmployeeRole(employeeId, "practicehead");
    }

    promoteAsPracticeManager(employeeId){
        return this.setEmployeeRole(employeeId, "practicemanager");
    }

    setEmployeeRole(employeeId, role){
        return new Promise((resolve, reject) => {
            this.db.Employee.find({
                where: {
                    id:employeeId
                }
            }).then(employee => {
                if(employee){
                    this.db.Role.find({
                        where:{
                            roleName: role
                        }
                    }).then(appRole => {
                        employee.addRole(appRole.id).then(() => {
                            resolve({"result":"success"});
                        });
                    });
                }else{
                    reject({
                        "status":"failed",
                        "message":"User not found"
                    });
                }
            });        
        });
    }

    getUnassignedMenteesOf(practiceId){
        return new Promise((resolve) => {
            this.db.Employee.findAll({
                where:{
                    practiceId: practiceId,
                    $or: [{
                        mentorId:{
                            $eq: null
                        }
                    },{
                        mentorId:{
                            $eq: 0
                        }
                    }]
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include:[{
                    model: this.db.Role,
                    as: 'roles',
                    where:{
                        roleName: "mentee"
                    },
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    },
                    through:{
                        model: this.db.EmployeeRoles,
                        attributes: []
                    }                    
                }]
            }).then(mentees => {
                resolve(mentees);
            });
        });
    }

    getUsersNotAssignedToPractice(){
        return new Promise((resolve) => {
            this.db.Employee.findAll({
                where:{
                    $or: [{
                        practiceId:{
                            $eq: null
                        }
                    },{
                        practiceId:{
                            $eq: 0
                        }
                    }]
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include:[{
                    model: this.db.Role,
                    as: 'roles',
                    where:{
                        roleName: ['mentor','mentee']
                    },
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    },
                    through:{
                        model: this.db.EmployeeRoles,
                        attributes: []
                    }
                }]
            }).then(users => {
                resolve(users);
            });
        });
    }

    getUsersAssignedToPractice(practiceId){
        return new Promise((resolve) => {
            this.db.Employee.findAll({
                where:{
                    practiceId:practiceId
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt','mentorId','practiceId']
                },
                include:[{
                    model: this.db.Role,
                    as: 'roles',
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    },
                    through:{
                        model: this.db.EmployeeRoles,
                        attributes: []
                    }                    
                },{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId','practiceId']
                    }
                }]
            }).then(users => {
                var mentors = [];
                var mentees = [];
                var otherUsers = [];
                users.forEach(user => {
                    if(user.roles.find(role => role.roleName === "mentor")){
                        mentors.push(user);
                    }else if(user.roles.find(role => role.roleName === "mentee")){
                        mentees.push(user);
                    }else{
                        otherUsers.push(user);
                    }
                });
                var result = {
                    "mentors": mentors,
                    "mentees": mentees,
                    "practiceHead": otherUsers
                };
                resolve(result);
            });
        });
    }

    assignUsersToPractice(practiceId, users){
        return new Promise((resolve) => {
            this.db.Employee.update({
                practiceId: practiceId
            },{
                where: {
                    id: users
                }
            }).then(() => {
                resolve({"status":"success"});
            });
        });
    }

    removeUsersFromPractice(practiceId, users){
        return new Promise((resolve) => {
            this.db.Employee.update({
                practiceId: null
            },{
                where: {
                    id: users
                }
            }).then(() => {
                resolve({"status":"success"});
            });
        });
    }

    getAllUsersBelongingTo(practiceId){
        return new Promise((resolve) => {
            this.db.Employee.findAll({
                where:{
                    practiceId:practiceId
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt','mentorId','practiceId']
                },
                include:[{
                    model: this.db.Role,
                    as: 'roles',
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    },
                    through:{
                        model: this.db.EmployeeRoles,
                        attributes: []
                    }                    
                },{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId','practiceId']
                    }
                }]
            }).then(users => {                
                resolve(users);
            });
        });
    }

    addEmployeeIfNotFound(employee, role){
        return new Promise(resolve => {
            this.db.Employee.find({
                where: {
                    email: employee.Email
                }
            }).then(found => {
                if(!found){
                    this.db.Employee.create({
                        firstName: employee.EmployeeName.split(' ')[0],
                        lastName: employee.EmployeeName.substr(employee.EmployeeName.indexOf(' ') + 1),
                        email: employee.Email,
                        employeeId: employee['Emp Id'],
                        title: employee['Job Title'],
                        competency: employee.Competency,
                        gender: employee.emp_gender
                    }).then(newEmployee => {
                        this.db.Role.find({
                            where:{
                                roleName: role
                            }
                        }).then(appRole => {
                            newEmployee.addRole(appRole.id).then(() => {
                                resolve(newEmployee);
                            });
                        });                        
                    });
                }else{
                    resolve(found);
                }
            });
        });
    }

    setPracticeManager(pmId, employeeArray){
        var emails = [];
        employeeArray.forEach(emp => emails.push(emp.Email));
        return new Promise((resolve) => {
            this.db.Employee.update({
                practiceManagerId: pmId
            },{
                where: {
                    email: emails
                }
            }).then(() => {
                resolve({"status":"success"});
            });
        });
    }

    getMenteeInfo(menteeId){
        return new Promise((resolve) => {
            this.db.Employee.find({
                where:{
                    id: menteeId
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt','mentorId','practiceId','practiceManagerId',
                              'locationId','LocationId','PracticeId']
                },include:[{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId','practiceId']
                    }
                },{
                    model: this.db.Employee,
                    as: 'PracticeManager',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId','practiceId','practiceManagerId',
                                  'competency','locationId','employeeId','LocationId','PracticeId']
                    },include:[{
                        model: this.db.Practice,
                        as: 'ManagersPractice',
                        attributes:{
                            exclude: ['createdAt','updatedAt','id','practiceHeadId','BusinessUnitId']
                        }
                    }]
                }]
            }).then(mentee => {
                resolve(mentee);
            });
        });
    }

    getPracticeManagerInfo(pmId){
        return new Promise((resolve) => {
            this.db.Employee.find({
                where:{
                    id: pmId
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt','mentorId','practiceId','practiceManagerId',
                              'locationId','LocationId','PracticeId']
                },include:[{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId','practiceId']
                    }
                },{
                    model: this.db.Employee,
                    as: 'PracticeManager',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId','practiceId','practiceManagerId',
                                  'competency','locationId','employeeId','LocationId','PracticeId']
                    },include:[{
                        model: this.db.Practice,
                        as: 'ManagersPractice',
                        attributes:{
                            exclude: ['createdAt','updatedAt','id','practiceHeadId','BusinessUnitId']
                        }
                    }]
                }]
            }).then(mentee => {
                resolve(mentee);
            });
        });
    }
}

module.exports = EmployeeController;
