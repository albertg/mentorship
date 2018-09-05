class RealityCheckController{
    constructor(database){
        this.db = database;
    }

    insertRealityCheck(realityCheck){
        return new Promise((resolve, reject) => {
            this.db.RealityCheck.create({
                menteeId:realityCheck.mentee,
                mentorId: realityCheck.mentor,
                goalId: realityCheck.goal,
                menteeComments: realityCheck.menteeComment,
                mentorComments: realityCheck.mentorComment,
                statusId: realityCheck.status
            }).then(newRealityCheck => {
                if(realityCheck.refDiscussions != null && realityCheck.refDiscussions.length > 0){
                    newRealityCheck.addReferenceDiscussion(realityCheck.refDiscussions);
                }
                resolve({
                    "status":"success",
                    "realityCheckId": newRealityCheck.id
                });
            }).catch(err => {
                var errorMessage = err.error;
                if(err.name == "SequelizeValidationError"){
                    errorMessage = {error: "one or more fields has invalid or empty data"};
                }else if(err.name == "SequelizeForeignKeyConstraintError"){
                    errorMessage = {error: "one or more fields has incorrect data"};
                }
                reject(errorMessage);
            });
        });
    };

    addReferenceDiscussion(realityCheckId, discussionIds){
        return new Promise((resolve, reject) => {
            this.db.RealityCheck.findById(realityCheckId).then(realityCheck => {
                realityCheck.addReferenceDiscussion(discussionIds);          
                resolve({
                    "status":"success"
                });
            }).catch(err => {
                var errorMessage = err.error;
                if(err.name == "SequelizeValidationError"){
                    errorMessage = {error: "one or more fields has invalid or empty data"};
                }else if(err.name == "SequelizeForeignKeyConstraintError"){
                    errorMessage = {error: "one or more fields has incorrect data"};
                }
                reject(errorMessage);
            });
        });
    };

    getRealityCheck(forMenteeId){
        return new Promise((resolve, reject) => {
            this.db.RealityCheck.findAll({
                where: {
                    menteeId: forMenteeId 
                }, 
                attributes: {
                    exclude: ['menteeId','mentorId','goalId','statusId','updatedAt']
                },
                include:[{
                    model: this.db.Goal,
                    as: 'goal',
                    attributes:{
                        exclude: ['createdAt','updatedAt','goalTypeId','menteeId']
                    },
                    include:[{
                        model: this.db.GoalType,
                        as: 'goalType',
                        attributes:{
                            exclude: ['createdAt','updatedAt']
                        }
                    }]
                },{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    }
                },{
                    model: this.db.RealityCheckStatus,
                    as: 'status',
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    }
                }]
            }).then(realityChecks => {
                resolve(realityChecks);
            }).catch(err => {
                reject(err);
            });
        });
    };

    updateRealityCheck(realityCheckId, realityCheck){
        return new Promise((resolve, reject) => {
            this.db.RealityCheck.findById(realityCheckId)
                .then(rc => {
                    rc.goalId = rc.goalId;
                    rc.menteeComments = realityCheck.menteeComment;
                    rc.mentorComments = realityCheck.mentorComment;
                    rc.statusId = realityCheck.status;
                    rc.save().then(() => {
                        resolve({"status":"success"});
                    });
                }).catch(err => {
                    reject(err);
                });
        });
    };

    getRealityCheckTypes(){
        return new Promise((resolve, reject) => {
            this.db.RealityCheckStatus.findAll({
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            }).then(realityCheckTypes => {
                resolve(realityCheckTypes);
            }).catch(err => {
                reject(err);
            });
        });
    };
}

module.exports = RealityCheckController;
