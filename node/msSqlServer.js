var sql = require("mssql");
var config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'CR'
};
module.exports.getCityData = function (callback) {
    sql.connect(config, function (err) {
        var request = new sql.Request();
        request.execute('[Admin].[CITY_GET]', function (err, recordset) { callback(recordset); });
        request.close();
    });
}

// module.exports.getCityData = function (callback) {
//     sql.connect(config).then(() => { return sql.execute('[Admin].[CITY_GET]'); })
//         .then(result => { callback(result); })
//         .catch(err => { });
//     sql.close();
//     sql.on('error', err => { console.log(err); });
// }