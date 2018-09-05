var GoalController = require('./goalController');
var ActionController = require('./actionController');

const goalRoutes = (app,db) => {
    "use strict";
    const goalController = new GoalController(db);
    const actionController = new ActionController(db);

    app.route('/api/goals/add')
       .post((req,res) => {
            goalController.insertGoal(req.body).then(response => {
               res.json(response);
           }).catch(err => {
                res.status(500).json(err);
           });
        });

    app.route('/api/goals/mentee/:menteeId')
       .get((req, res) => {
            goalController.getGoals(req.params.menteeId).then(goals => {
                res.json(goals);
            }).catch(err => {
                res.status(500).json(err);
           });
        });

    app.route('/api/goals/types')
       .get((req, res) => {
            goalController.getGoalTypes().then(goalTypes => {
                res.json(goalTypes);
            }).catch(err => {
                res.status(500).json(err);
            });
        });
    
    app.route('/api/goals/:goalId/actions')
       .get((req, res) => {
           actionController.getActions(req.params.goalId).then(actions => {
                res.json(actions);
            }).catch(err => {
                res.status(500).json(err);
            });
       });
    
    app.route('/api/goals/:goalId/actions/add')
       .post((req, res) => {
            actionController.addActions(parseInt(req.params.goalId), req.body).then(response => {
                res.json(response);
            }).catch(err => {
                res.status(500).json(err);
            });
       });

    app.route('/api/action/statuses')
       .get((req, res) => {
            actionController.getActionStatusList().then(response => {
                res.json(response);
            }).catch(err => {
                res.status(500).json(err);
            });
       });
    
    app.route('/api/action/:actionId/update/status/:statusId')
       .put((req, res) => {
           actionController.updateActionStatus(req.params.actionId, req.params.statusId).then(response => {
                res.json(response);
           }).catch(err => {
                res.status(500).json(err);
           });
       });

    app.route('/api/goals/approvals/:mentorId')
       .get((req, res) => {
            goalController.getActionsPendingApproval(req.params.mentorId).then(response => {
                res.json(response);
            }).catch(err => {
                res.status(500).json(err);
            });
       });
    
    app.route('/api/goals/approvals/act')
       .post((req, res) => {
           actionController.actOnAction(req.body).then(response => {
                res.json(response);
            }).catch(err => {
                res.status(500).json(err);
            });
       });
};

module.exports = goalRoutes;