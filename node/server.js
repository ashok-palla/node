var express = require('express');
var log = require('./log')
var mssql = require('./msSqlServer');
var app = express();
var PORT = 3000;
log.writeLog('this is first log.');
// app.get('/', function (req, res) {
//     mssql.getCityData(function (data) { res.send(data); });
// });

app.listen(PORT, () => { console.log('listening port ' + PORT) });

