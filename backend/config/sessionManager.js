var session = require('express-session');

var initializeSession = (app) => {
    "use strict";
    // initialize express-session to allow us track the logged-in user across sessions.
    app.use(session({
        key: 'sid',
        secret: '3A73E01E51564D5EB3967A0ECA23E900',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }));

    // This middleware will check if user's cookie is still saved in browser and user is not set, 
    // then automatically log the user out. This usually happens when you stop your express server 
    // after login, your cookie still remains saved in the browser.
    app.use((req, res, next) => {
        if(req.cookies.sid && !req.session.user){
            res.clearCookie('sid');
        }
        next();
    });

    // middleware function to check for logged-in users
    var sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.sid) {
            res.redirect('/');
        } else {
            next();
        }    
    };

    return sessionChecker;
};

module.exports = initializeSession;
