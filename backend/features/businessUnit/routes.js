var BusinessUnitController = require('./businessUnitController');

const buRoutes = (app, db) => {
    "use strict";
    const controller = new BusinessUnitController(db);

    app.route('/api/businessunits')
       .get((req, res) => {
            controller.getAllBusinessUnits().then(buList => {
             res.json(buList);
            }).catch(err => {
                res.status(500).json({ error: err.toString() });
            });
    });
};

module.exports = buRoutes;