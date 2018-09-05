var DiscussionController = require('./discussionController');

const discussionRoutes = (app,db) => {
    "use strict";
    const controller = new DiscussionController(db);

    app.route('/api/discussions/add')
       .post((req, res) => {
           controller.insertDiscussion(req.body).then(response => {
                res.json(response);
           }).catch(err => {
                res.status(500).json(err);
           });
    });

    app.route('/api/discussions/mentee/:menteeId')
       .get((req, res) => {
            controller.getDiscussions(req.params.menteeId).then(discussions => {
                res.json(discussions);
            }).catch(err => {
                res.status(500).json(err);
           });
    });

    app.route('/api/discussions/mentee/:menteeId/realitycheck/:realityCheckId')
       .get((req, res) => {
            controller.getRefDiscussions(req.params.menteeId, req.params.realityCheckId)
            .then(discussions => {
                res.json(discussions);
            }).catch(err => {
                res.status(500).json(err);
           });
    });
};

module.exports = discussionRoutes;
