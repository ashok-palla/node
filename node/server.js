var express = require('express');
var log = require('./logger/log')
var mssql = require('./business_layer/mssql');
var app = express();
var PORT = 3000;

log.errorLog('this is first log.');

app.listen(PORT, () => { console.log('listening port ' + PORT) });

