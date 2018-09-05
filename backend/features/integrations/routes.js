var OverviewController = require('./overviewController');

const overviewRoutes = (app, db) => {
    "use strict";
    const controller = new OverviewController(db);

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
};

module.exports = overviewRoutes;
