var express = require('express');
var path=require('path');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./backend/database/models/index');
var registerRoutes = require('./backend/features/index');
var initializeSession = require('./backend/config/sessionManager');

app.use(cookieParser());
app.use(express.static(__dirname + '/public/dist'));

var sessionChecker = initializeSession(app);

//body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing
app.get('/', sessionChecker, (req, res) => res.sendFile('index.html'));
registerRoutes(app, db, sessionChecker);

app.listen(3000, () => {
    console.log("App started on http://localhost:3000");
});
