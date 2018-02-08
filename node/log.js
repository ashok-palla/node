var fs = require('fs');

module.exports.writeLog = function (msg) {
    var fileName = (new Date()).getFullYear() + '_' + (new Date()).getWeek() + '.log';
    fs.open('./log/' + fileName, 'a', (err, fd) => {
        if (err) throw err;
        fs.appendFile(fd, '\n' + new Date() + ' : ' + msg, 'utf8', (err) => {
            fs.close(fd, (err) => { if (err) throw err; });
            if (err) throw err;
        });
    });
}
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}
