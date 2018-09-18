var employeeRoutes = require('./employee/routes');
var securityRoutes = require('./security/routes');
var goalRoutes = require('./goal/routes');
var discussionRoutes = require('./discussion/routes');
var rcRoutes = require('./realityCheck/routes');
var overviewRoutes = require('./gateway/routes');
var practiceRoutes = require('./practice/routes');
var buRoutes = require('./businessUnit/routes');

var registerRoutes = (app, db) => {
    "use strict";
    employeeRoutes(app, db);
    securityRoutes(app, db);
    goalRoutes(app, db);
    discussionRoutes(app, db);
    rcRoutes(app, db);
    overviewRoutes(app, db);
    practiceRoutes(app,db);
    buRoutes(app, db);
};

module.exports = registerRoutes;