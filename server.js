const express = require('express');
const path=require('path');
var bodyParser = require('body-parser');
const app = express();
var db = require('./backend/database/models/index');
var registerRoutes = require('./backend/features/index');
app.use(express.static(__dirname + '/public/dist'));

//body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing
app.get('/', (req, res) => res.sendFile('index.html'));
registerRoutes(app, db);

app.listen(3000, () => {
    console.log("App started on http://localhost:3000");
});
