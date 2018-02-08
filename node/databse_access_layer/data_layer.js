var sql = require("mssql");
var log = require('../logger/log');
var config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'CR'
};
module.exports.getCities = function (params, callback) {
    sql.connect(config).then(pool => { return pool.request().query(params.CityID == null || params.CityID == undefined ? 'select * from [admin].[city]' : 'select * from [admin].[city] where CityID = ' + params.CityID); })
        .then(result => { callback({ status: 200, data: result.recordset }); sql.close(); })
        .catch(err => { log.errorLog(err); callback({ status: 500, data: err.originalError.info.message }); sql.close(); })

    sql.on('error', err => { log.errorLog(err); sql.close(); });
}
module.exports.getCities_spl = function (callback) {
    sql.connect(config).then(pool => { return pool.request().execute('[Admin].[CITY_GET]'); })
        .then(result => { callback({ status: 200, data: result.recordset }); sql.close(); })
        .catch(err => { log.errorLog(err); callback({ status: 500, data: err.originalError.info.message }); sql.close(); })

    sql.on('error', err => { log.errorLog(err); sql.close(); });
}
module.exports.getCities_insert__spl = function (params, callback) {
    sql.connect(config).then(pool => { return pool.request().input('CityID', sql.Int, 0).input('CityName', sql.VarChar(150), params.CityName).execute('[Admin].[CITY_INSERT]'); })
        .then(result => { callback({ status: 200, data: 'City Inserted Succesfully.' }); sql.close(); })
        .catch(err => { log.errorLog(err); callback({ status: 500, data: err.originalError.info.message }); sql.close(); })

    sql.on('error', err => { log.errorLog(err); sql.close(); });
}
module.exports.getCities_delete__spl = function (params, callback) {
    sql.connect(config).then(pool => { return pool.request().query('delete from [Admin].CITY where CityID = ' + params.CityID); })
        .then(result => { callback({ status: 200, data: 'City Deleted Succesfully.' }); sql.close(); })
        .catch(err => { log.errorLog(err); callback({ status: 500, data: err.originalError.info.message }); sql.close(); })

    sql.on('error', err => { log.errorLog(err); sql.close(); });
}