var getDiscussionYear = require('../../lib/utils').getYear;

class DiscussionController{
    constructor(database){
        this.db = database;
    }

    insertDiscussion(discussion){
        return new Promise((resolve, reject) => {
            this.db.Discussion.create({
                menteeId: discussion.mentee,
                mentorId: discussion.mentor,
                discussion: discussion.discussionText,
                year: getDiscussionYear()
            }).then(newDiscussion => {
                resolve({
                    "status":"success",
                    "discussionId": newDiscussion.id
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
    }

    getDiscussions(forMentee){
        return new Promise((resolve, reject) => {
            this.db.Discussion.findAll({
                where: {
                    menteeId: forMentee,
                    year: getDiscussionYear()
                },
                attributes:{
                    exclude: ['updatedAt','mentorId','year','RealityCheckId']
                },
                order:[
                    ['createdAt', 'DESC']
                ]
                /*include:[{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    } 
                }]*/
            }).then(discussions => {
                resolve(discussions);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getRefDiscussions(forMentee, andRealityCheck){
        return new Promise((resolve, reject) => {
            this.db.Discussion.findAll({
                where: {
                    menteeId: forMentee,
                    realityCheckId: andRealityCheck
                },
                attributes:{
                    exclude: ['createdAt','updatedAt','mentorId','menteeId']
                },
                include:[{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    } 
                }]
            }).then(discussions => {
                resolve(discussions);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getDiscussionsForMany(menteeIds){
        return new Promise((resolve, reject) => {
            this.db.Discussion.findAll({
                where: {
                    menteeId: menteeIds,
                    year: getDiscussionYear()
                },
                attributes:{
                    exclude: ['createdAt','updatedAt','mentorId','year']
                },
                include:[{
                    model: this.db.Employee,
                    as: 'mentor',
                    attributes:{
                        exclude: ['createdAt','updatedAt','mentorId']
                    } 
                }]
            }).then(discussions => {
                resolve(discussions);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = DiscussionController;
