class ActionController{
    constructor(database){
        this.db=database;
    }

    getActions(forGoalId){
        return new Promise((resolve, reject) => {
            this.db.Action.findAll({
                where: {
                    goalId: parseInt(forGoalId)
                }, 
                attributes: {
                    exclude: ['createdAt','updatedAt','GoalId','actionStatusId']
                },
                include:[{
                    model: this.db.Employee,
                    as: 'createdBy',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    }
                },{
                    model: this.db.ActionStatus,
                    as: 'actionStatus',
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    }
                }]
            }).then(actions => {
                resolve(actions);
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

    addActions(forGoalId, actionItems){
        return new Promise((resolve, reject) => {
            this.db.ActionStatus.find({
                where: {
                    statusName: "Not Started"
                }
            }).then(actionStatus => {
                var actions = actionItems.map(action => {
                    return {
                        actionText: action.description,
                        actionStatusId: actionStatus.id,
                        createdById: action.mentor,
                        goalId: forGoalId
                    };                
                });
                this.db.Action.bulkCreate(actions).then(() => {
                    resolve({
                        "status":"success"
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
            });            
        });
    }

    getActionStatusList(){
        return new Promise((resolve, reject) => {
            this.db.ActionStatus.findAll({
                attributes:{
                    exclude:['createdAt','updatedAt']
                }
            }).then(actionStatuses => {
                resolve(actionStatuses);
            }).catch(err => {
                reject(err);
            });
        });
    }

    updateActionStatus(actionId, statusId){
        return new Promise((resolve) => {
            this.db.ActionStatus.find({
                where: {
                    statusName: "Completed"
                }
            }).then(actionStatus => {
                this.db.Action.findById(actionId).then(action => {
                    action.actionStatusId = statusId;
                    if(parseInt(statusId) === actionStatus.id){
                        //mentee has marked this action as completed and will need approval from the mentor
                        action.pendingApproval = true;
                    }
                    action.save().then(() => {
                        resolve({
                            "status":"success"
                        });
                    });
                });
            });
        });
    }

    actOnAction(approval){
        return new Promise((resolve) => {
            this.db.Action.findById(approval.actionId).then(action => {
                if(action.pendingApproval){
                    var status = 'Completed';
                    if(approval.status.toLowerCase() === 'rejected'){
                        status = 'In Progress';
                    }
                    this.db.ActionStatus.find({
                        where:{
                            statusName: status
                        }
                    }).then(actionStatus => {
                        action.pendingApproval = false;
                        action.actionStatusId = actionStatus.id;
                        action.statusChangeReason = approval.comments;
                        action.save().then(() => {
                            resolve({
                                "status":"success"
                            });
                        });
                    });
                }               
            });
        });
    }
}

module.exports = ActionController;
