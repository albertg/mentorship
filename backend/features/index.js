var employeeRoutes = require('./employee/routes');
var securityRoutes = require('./security/routes');
var goalRoutes = require('./goal/routes');
var discussionRoutes = require('./discussion/routes');
var rcRoutes = require('./realityCheck/routes');
var overviewRoutes = require('./integrations/routes');
var practiceRoutes = require('./practice/routes');
var syncRoutes = require('./sync/routes');

var registerRoutes = (app, db) => {
    "use strict";
    employeeRoutes(app, db);
    securityRoutes(app, db);
    goalRoutes(app, db);
    discussionRoutes(app, db);
    rcRoutes(app, db);
    overviewRoutes(app, db);
    practiceRoutes(app,db);
    syncRoutes(app, db);
};

module.exports = registerRoutes;