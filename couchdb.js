var config = require(__dirname + '/config.js').config;
var cradle = require('cradle');
var connection = new(cradle.Connection)
                    (config.couchdb.host, 
                     config.couchdb.port, 
                     config.couchdb.cradleConfig);

module.exports = function couchDBMiddleware() {

    return function couchDBMiddlerware(req, res, next) {

        var dbName = config.couchdb.database || req.headers.host.replace(/\./g, '-');
        if (dbName.match(/\:/)) dbName = dbName.split(':')[0];

	if (dbName.match(/^\d/)) dbName = 'localhost';

        if (!req.db) {

            console.log('connection dbName:', dbName);

            req.db = connection.database(dbName); 

            req.db.name = dbName;

            next();

        } else {

            next();

        }

    };

};