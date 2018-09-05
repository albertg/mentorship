var EmployeeController = require('../employee/employeeController');
var GoalController = require('../goal/goalController');
var DiscussionController = require('../discussion/discussionController');
var getGoals = require('../../lib/goalUtils').goalStatuses;

class OverviewController{
    constructor(database){
        this.db = database;
        this.empController = new EmployeeController(this.db);
        this.goalController = new GoalController(this.db);
        this.discussionController = new DiscussionController(this.db);
    }

    getMenteeGoalAndDiscussionInfo(ofMentorId){
        return new Promise((resolve) => {
            this.empController.getMentees(ofMentorId).then(mentees => {
                var menteeIds = mentees.map(mentee => {
                    return mentee.id;
                });
                this.goalController.getGoalsFor(menteeIds).then(goals => {
                    this.discussionController.getDiscussionsForMany(menteeIds).then(discussions => {
                        var simplified = mentees.map(mentee => {
                            return {
                                id: mentee.id,
                                firstName: mentee.firstName,
                                lastName: mentee.lastName,
                                email: mentee.email,
                                profileImage: mentee.profileImage,
                                goals: getGoals(goals.filter(goal => goal.menteeId === mentee.id)),
                                discussions: discussions.filter(discussion => discussion.menteeId === mentee.id).length
                            };
                        });
                        resolve(simplified);
                    });                    
                });
            });
        });
    }

    getMenteeDetails(menteeId){
        return new Promise((resolve) => {
            this.empController.getEmployeeById(menteeId).then(mentee => {
                this.goalController.getGoalsFor([menteeId]).then(goals => {
                    this.discussionController.getDiscussionsForMany([menteeId]).then(discussions => {
                        var simplified = {
                                id: mentee.id,
                                firstName: mentee.firstName,
                                lastName: mentee.lastName,
                                email: mentee.email,
                                profileImage: mentee.profileImage,
                                mentor: mentee.mentor? mentee.mentor.firstName + ' ' + mentee.mentor.lastName: "",
                                goalsOverview: {
                                    goals: goals,
                                    overview: getGoals(goals),
                                },
                                discussions: discussions.length
                            };
                        resolve(simplified);
                    });
                });
            });
        });
    }
}

module.exports = OverviewController;
