var getGoalYear = require('../../lib/utils').getYear;

class GoalController{
    constructor(database){
        this.db = database;        
    }

    insertGoal(goal){
        return new Promise((resolve, reject) => {
            this.db.Goal.findAll({
                where: {
                    menteeId: goal.mentee,
                    year: getGoalYear()
                }
                // attributes:[
                //     [this.db.sequelize.fn('SUM', this.db.sequelize.col('weightage')), 'totalWeightage']
                // ]
            }).then(() => {
                //var currentTotalWeightage = result[0].dataValues.totalWeightage;
                this.db.Goal.create({
                    menteeId:goal.mentee,
                    mentorId: goal.mentor,
                    goalDescription: goal.description,
                    goalTypeId: goal.goalType,
                    year: getGoalYear()
                }).then(newGoal => {
                    resolve({
                        "status":"success",
                        "goalId": newGoal.id
                    });
                }).catch(err => {
                    var errorMessage = err.error;
                    if(err.name === "SequelizeValidationError"){
                        errorMessage = {error: "one or more fields has invalid or empty data"};
                    }else if(err.name === "SequelizeForeignKeyConstraintError"){
                        errorMessage = {error: "one or more fields has incorrect data"};
                    }
                    reject(errorMessage);
                });
            }).catch(err => {
                var errorMessage = err.message;
                reject(errorMessage);
            });            
        });
    }

    getGoals(forMenteeId){
        return new Promise((resolve, reject) => {
            this.db.Goal.findAll({
                where: {
                    menteeId: forMenteeId 
                }, 
                attributes: {
                    exclude: ['goalTypeId','mentorId']
                },              
                include:[{
                    model: this.db.GoalType,
                    as: 'goalType',
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    }
                },{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    } 
                }]
            }).then(goals => {
                resolve(goals);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getGoalTypes(){
        return new Promise((resolve, reject) => {
            this.db.GoalType.findAll({
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            }).then(goalTypes => {
                resolve(goalTypes);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getGoalsFor(menteeIds){
        return new Promise((resolve) => {
            this.db.Goal.findAll({
                where: {
                    menteeId: menteeIds
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
                        exclude: ['createdAt','updatedAt']
                    },
                    include:[{
                        model: this.db.ActionStatus,
                        as: 'actionStatus'
                    }]
                }]
            }).then(goals => {
                resolve(goals);
            });
        });
    }

    getActionsPendingApproval(forMentor){
        return new Promise((resolve) => {
            this.db.Goal.findAll({
                where: {
                    mentorId: forMentor
                },
                attributes:{
                    exclude: ['createdAt','updatedAt','year','goalTypeId'],
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
                    where:{
                        pendingApproval: true
                    },
                    attributes:{
                        exclude: ['createdAt','updatedAt','actionStatusId','goalId','createdById','GoalId']
                    },
                    include:[{
                        model: this.db.ActionStatus,
                        as: 'actionStatus',
                        attributes:{
                            exclude: ['createdAt','updatedAt','id']
                        }
                    }]
                }]
            }).then(goals => {
                goals.forEach(goal => {
                    goal.actions.forEach(action => {
                        action.actionStatus.statusName = "Pending Approval";
                    });
                });
                resolve(goals);
            });
        });
    }
}

module.exports = GoalController;
