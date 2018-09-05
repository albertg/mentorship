var SecurityController = require('./securityController');

const securityRoutes = (app, db) =>{
    "use strict";
    const controller = new SecurityController(db);

    app.route('/api/signin')
       .post((req, res) => {
           controller.authenticate(req.body)
                .then(employee => {
                    res.json(employee);
                })
                .catch(err => {
                    res.status(401).json(err);
                });
       });
};

module.exports = securityRoutes;