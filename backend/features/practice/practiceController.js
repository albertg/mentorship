class PracticeController{
    constructor(database){
        this.db = database;        
    }

    insertPractice(practice){
        return new Promise((resolve, reject) => {
            this.db.Practice.find({
                where:{
                    name: practice.name
                }
            }).then(found => {
                if(!found){
                    this.db.Practice.create({
                        name: practice.name
                    }).then(newPractice => {
                        if(practice.phId && practice.phId >= 0){
                            newPractice.setPracticeHead(practice.phId).then(() => {
                                this.db.Employee.find({
                                    where:{
                                        id: practice.phId
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
                                    }]
                                }).then(employee => {
                                    employee.setPractice(newPractice.id).then(() => {
                                        employee.removeRoles(employee.roles).then(() => {
                                            this.db.Role.find({
                                                where:{
                                                    roleName: "practicehead"
                                                }
                                            }).then(role => {
                                                employee.addRole(role.id).then(() => {
                                                    resolve({
                                                        "status":"success",
                                                        "practiceId": newPractice.id
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            }); 
                        }else{
                            resolve({
                                "status":"success",
                                "practiceId": newPractice.id
                            });
                        }
                    }).catch(err => {
                        var errorMessage = err.error;
                        if(err.name === "SequelizeValidationError"){
                            errorMessage = {error: "one or more fields has invalid or empty data"};
                        }else if(err.name === "SequelizeForeignKeyConstraintError"){
                            errorMessage = {error: "one or more fields has incorrect data"};
                        }
                        reject(errorMessage);
                    });
                }else{
                    resolve({
                        "status":"failed",
                        "message": "A practice with this name already exists"
                    });
                }
            });
        });
    }

    assignPracticeHead(practiceId, phId){
        return new Promise((resolve) => {
            this.db.Practice.findById(practiceId)
            .then(practice => {
                this.db.Employee.find({
                    where: {
                        id: phId
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
                    }],
                    exclude: ['createdAt', 'updatedAt','mentorId']
                }).then(employee => {
                    if(employee){
                        employee.removeRoles(employee.roles).then(() => {
                            this.db.Role.find({
                                where:{
                                    roleName: 'practicehead'
                                }
                            }).then(role => {
                                employee.addRole(role.id).then(() => {
                                    practice.setPracticeHead(phId).then(() => {
                                        employee.setPractice(practiceId).then(() => {
                                            resolve({
                                                "status":"success"
                                            });
                                        });
                                    });
                                });
                            }); 
                        });
                    }
                });                  
            });
        });
    }

    getPractices(){
        return new Promise((resolve) => {
            this.db.Practice.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt','practiceHeadId']
                },
                include:[{
                    model: this.db.Employee,
                    as: 'practiceHead',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    }
                },{
                    model: this.db.Employee,
                    as: 'practiceMembers',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId','practiceId']
                    }
                }]
            }).then(practices => {
                resolve(practices);
            });
        });
    }

    addPracticeIfNotFound(practiceName){
        return new Promise((resolve) => {
            this.db.Practice.find({
                where:{
                    name: practiceName
                }
            }).then(found => {
                if(!found){
                    this.db.Practice.create({
                        name: practiceName
                    }).then(newPractice => {
                        resolve(newPractice);
                    });
                }else{
                    resolve(found);
                }
            });
        });
    }

    getPracticesOfABu(buId){
        return new Promise(resolve => {
            this.db.Practice.findAll({
                where:{
                    businessUnitId: buId
                },attributes: {
                    exclude: ['createdAt', 'updatedAt','BusinessUnitId']
                },include:[{
                    model: this.db.Employee,
                    as: 'practiceHead',
                    attributes: {
                        exclude: ['mentorId', 'employeeId','practiceManagerId','competency','locationId',
                                  'gender','createdAt','updatedAt','practiceId','LocationId','PracticeId']
                    }
                },{
                    model: this.db.Employee,
                    as: 'PracticeManagers',
                    include: [{
                        model: this.db.Employee,
                        as: 'PracticeManagerReportees'
                    }]
                }]
            }).then(practices => {
                var allPractices = [];
                practices.forEach(practice => {
                    var practiceMemberCount = 0;
                    practice.PracticeManagers.forEach(manager => {
                        practiceMemberCount = practiceMemberCount + manager.PracticeManagerReportees.length;
                    });
                    var practiceInfo = {
                        id: practice.id,
                        name: practice.name,
                        practiceHead: practice.practiceHead,
                        practiceManagers: practice.PracticeManagers.length,
                        practiceMembers: practiceMemberCount
                    };
                    allPractices.push(practiceInfo);
                });
                resolve(allPractices);
            });
        });
    }

    getPracticeInfo(practiceId){
        return new Promise((resolve) => {
            this.db.Practice.find({
                where:{
                    id: practiceId
                },
                attributes:{
                    exclude: ['createdAt','updatedAt','practiceHeadId','BusinessUnitId']
                },
                include:[{
                    model: this.db.Employee,
                    as:'practiceHead',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt','mentorId','practiceId','practiceManagerId',
                                  'locationId','LocationId','PracticeId']
                    }
                },{
                    model: this.db.BusinessUnit,
                    as: 'BusinessUnit',
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    }
                }]
            }).then(practice => {
                resolve(practice);
            });
        });
    }

    getPracticeDetails(practiceId){
        return new Promise((resolve) => {
            this.db.Practice.find({
                where:{
                    id: practiceId
                },
                attributes:{
                    exclude:['createdAt', 'updatedAt','practiceHeadId','BusinessUnitId']
                },
                include:[{
                    model: this.db.Employee,
                    as: 'PracticeManagers',
                    attributes:{
                        exclude:['createdAt', 'updatedAt','practiceManagerId',
                        'practiceId','locationId','PracticeId','LocationId']
                    }
                },{
                    model: this.db.Employee,
                    as: 'practiceHead',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt','mentorId','practiceId','practiceManagerId',
                                  'locationId','LocationId','PracticeId']
                    }
                }]
            }).then(practice => {
                //Remove the reference to the practice head from the PracticeManagers array as the 
                //practice head also belongs to the practice
                var phObject = practice.PracticeManagers.find(pm => pm.id === parseInt(practice.practiceHead.id));
                var indexOfPh = practice.PracticeManagers.indexOf(phObject);
                if(indexOfPh >= 0){
                    practice.PracticeManagers.splice(indexOfPh, 1);
                }
                var result = {
                    id: practice.id,
                    name: practice.name,
                    PracticeManagers: practice.PracticeManagers
                };
                resolve(result);
            });
        });
    }

    getPracticesOfAHead(phId){
        return new Promise(resolve => {
            this.db.Practice.findAll({
                where:{
                    practiceHeadId: phId
                },
                attributes:{
                    exclude:['practiceHeadId','createdAt','updatedAt','BusinessUnitId']
                }
            }).then(practices => {
                resolve(practices);
            });
        });
    }
}

module.exports = PracticeController;
