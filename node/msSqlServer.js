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
        request.query('select * from [admin].[city]', function (err, recordset) { callback(recordset); });
    });
}