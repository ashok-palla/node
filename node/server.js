var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', function (req, res) {
    res.send('<h1>hello world</h1>');
});

app.listen(PORT, () => {
    console.log('listening port ' + PORT)
});

