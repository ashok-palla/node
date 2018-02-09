var sql = require("mssql");
var log = require('../logger/log');
var config = {
    user: 'sa',
    password: '1234',
    server: 'localhost',
    database: 'CR'
};
module.exports.getCities = function (params, callback) {
    sql.connect(config).then(pool => { return pool.request().query(params.CityID == null || params.CityID == undefined ? 'select * from [admin].[city]' : 'select * from [admin].[city] where CityID = ' + params.CityID); })
        .then(result => { callback({ status: 200, data: result.recordset }); sql.close(); })
        .catch(err => { log.errorLog(err); callback({ status: 500, data: err.originalError.info.message }); sql.close(); })
}
module.exports.getCities_spl = function (callback) {
    ExecuteStoredProcedure([], '[Admin].[CITY_GET]', function (data) { callback(data); });
}
module.exports.getCities_insert__spl = function (body, callback) {
    var params = [{ name: 'CityID', dataType: sql.Int, value: 0 }, { name: 'CityName', dataType: sql.VarChar(150), value: body.CityName }]
    ExecuteStoredProcedure(params, '[Admin].[CITY_INSERT]', function (data) { callback(data); });
}
module.exports.getCities_delete__spl = function (params, callback) {
    sql.connect(config).then(pool => { return pool.request().query('delete from [Admin].CITY where CityID = ' + params.CityID); })
        .then(result => { callback({ status: 200, data: 'City Deleted Succesfully.' }); sql.close(); })
        .catch(err => { log.errorLog(err); callback({ status: 500, data: err.originalError.info.message }); sql.close(); })
}

function ExecuteStoredProcedure(params, stored_proc, callback) {

    const pool = new sql.ConnectionPool(config, err => {
        if (err) {
            switch (err.code) {
                case "ELOGIN": callback({ status: 500, data: "Login failed." }); log.errorLog(JSON.stringify(err)); break;
                case "ETIMEOUT": callback({ status: 500, data: "Connection timeout." }); log.errorLog(JSON.stringify(err)); break;
                case "EALREADYCONNECTED": callback({ status: 500, data: "Database is already connected!" }); log.errorLog(JSON.stringify(err)); break;
                case "EALREADYCONNECTING": callback({ status: 500, data: "Already connecting to database!"}); log.errorLog(JSON.stringify(err)); break;
                case "EINSTLOOKUP": callback({ status: 500, data: "Instance lookup failed." }); log.errorLog(JSON.stringify(err)); break;
                case "ESOCKET": callback({ status: 500, data: "Login failed." }); log.errorLog(JSON.stringify(err)); break;
                default: callback({ status: 500, data: err }); log.errorLog(err);
            }
        }
        else {
            const StoredProcedureExecute = pool.request();
            params.forEach(param => { StoredProcedureExecute.input(param.name, param.dataType, param.value); });
            StoredProcedureExecute.execute(stored_proc, (err, result) => {
                if (err) callback({ status: 500, data: err.originalError.info.message });
                else callback({ status: 200, data: result.recordsets });
            });
        }
    });

    pool.on('error', err => { pool.close(); });
}