var EmployeeSyncController = require('./employeeSyncController');

const syncRoutes = (app, db) => {
    "use strict";
    const controller = new EmployeeSyncController(db);

    app.route('/api/sync/employees')
        .post((req, res) => {
            controller.syncEmployeeData(req).then(result => {
                res.json(result);
            }).catch(err => {
                res.status(401).json(err);
            });
        })
};

module.exports = syncRoutes;