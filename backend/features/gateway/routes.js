var OverviewController = require('./overviewController');
var EmployeeSyncController = require('../gateway/employeeSyncController');

const overviewRoutes = (app, db) => {
    "use strict";
    const controller = new OverviewController(db);
    const syncController = new EmployeeSyncController(db);

    app.route('/api/mentor/:mentorId/mentees/overview')
        .get((req, res) => {
            controller.getMenteeGoalAndDiscussionInfo(req.params.mentorId).then(response => {
                res.json(response);
            }).catch(err => {
                res.status(500).json({ error: err.toString() });
            });
        });
    
    app.route('/api/mentee/:menteeId/overview')
        .get((req, res) => {
            controller.getMenteeDetails(req.params.menteeId).then(response => {
                res.json(response);
            }).catch(err => {
                res.status(500).json({ error: err.toString() });
            });
        });
    
    app.route('/api/sync/employees')
        .post((req, res) => {
            syncController.syncEmployeeData(req).then(result => {
                res.json(result);
            }).catch(err => {
                res.status(401).json(err);
            });
        });
};

module.exports = overviewRoutes;
