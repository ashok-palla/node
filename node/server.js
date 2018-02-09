var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var data_layer = require('./databse_access_layer/data_layer');
var sc = require("./schedule");
var PORT = 3000;

app.listen(PORT, () => { 
    // console.log('listening port ' + PORT); 
});

//The function is executed every time the app receives a request
app.use(function (req, res, next) { next(); });

app.post('/city', function (req, res) {
    var params = { CityID: req.body.CityID }
    data_layer.getCities(params, (response) => { res.status(response.status).json(response.data); });
});

app.get('/city', function (req, res) {
    data_layer.getCities_spl((response) => { res.status(response.status).json(response.data); });
});

app.put('/city', function (req, res) {
    data_layer.getCities_insert__spl(req.body, (response) => { res.status(response.status).json(response.data); });
});

app.delete('/city', function (req, res) {
    data_layer.getCities_delete__spl(req.body, (response) => { res.status(response.status).json(response.data); });
});

module.exports.app = app;