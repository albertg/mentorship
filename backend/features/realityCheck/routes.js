var RealityCheckController = require('./RealityCheckController');

const rcRoutes = (app, db) => {
    "use strict";
    const controller = new RealityCheckController(db);

    app.route('/api/realitycheck/add')
       .post((req, res) => {
           controller.insertRealityCheck(req.body).then(response => {
                res.json(response);
           }).catch(err => {
                res.status(500).json(err);
           });
       });
    
    app.route('/api/realitycheck/:realityCheckId/discussions/add')
       .put((req, res) => {
           controller.addReferenceDiscussion(req.params.realityCheckId, req.body).then(response => {
                res.json(response);
           }).catch(err => {
                res.status(500).json(err);
           });
       });
    
    app.route('/api/mentee/:menteeId/realitycheck')
       .get((req, res) => {
            controller.getRealityCheck(req.params.menteeId).then(response => {
                res.json(response);
            }).catch(err => {
                res.status(500).json(err);
           });
       });

    app.route('/api/realitycheck/:realityCheckId/modify')
       .put((req, res) => {
           controller.updateRealityCheck(req.params.realityCheckId, req.body).then(response => {
                res.json(response);
           }).catch(err => {
                res.status(500).json(err);
           });
       });

       app.route('/api/realitycheck/types')
       .get((req, res) => {
            controller.getRealityCheckTypes().then(realityCheckTypes => {
                res.json(realityCheckTypes);
            }).catch(err => {
                res.status(500).json(err);
            });
        });
};

module.exports = rcRoutes;
