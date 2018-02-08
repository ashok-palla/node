var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var log = require('./logger/log');
var mssql = require('./databse_access_layer/mssql');
var PORT = 3000;

//The function is executed every time the app receives a request
app.use(function (req, res, next) {
    log.errorLog('Time:' + Date.now());
    next();
});

app.post('/asd', function (req, res) {
    res.json({ 'name': 'Ashok Palla' });
});

app.listen(PORT, () => {
    console.log('listening port ' + PORT)
});
