var PracticeController = require('./practiceController');

const practiceRoutes = (app, db) => {
    "use strict";
    const practiceController = new PracticeController(db);

    app.route('/api/practice/add')
    .post((req, res) => {
        practiceController.insertPractice(req.body).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practice/:practiceId/assign/:phId')
    .put((req, res) => {
        practiceController.assignPracticeHead(req.params.practiceId, req.params.phId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practice/all')
    .get((req, res) => {
        practiceController.getPractices().then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practice/bu/:buId')
    .get((req, res) => {
        practiceController.getPracticesOfABu(req.params.buId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practice/:practiceId/info')
    .get((req, res) => {
        practiceController.getPracticeInfo(req.params.practiceId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practice/:practiceId/details')
    .get((req, res) => {
        practiceController.getPracticeDetails(req.params.practiceId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practicehead/:phId')
    .get((req, res) => {
        practiceController.getPracticesOfAHead(req.params.phId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });
};

module.exports = practiceRoutes;
