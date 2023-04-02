'use strict';
/**
 * Contains Database connection and require functions related to db
 * 
 */

const { config_mysql1 } = require('./index');
const mysql = require('mysql');
const util = require('util');
let pool1 = mysql.createPool(config_mysql1);

const getcon = (err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            $applicationLogger.error("database.js", $displayMessage('db_close'));

        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            $applicationLogger.error("database.js", $displayMessage('db_many_connections'));
        }
        if (err.code === 'ECONNREFUSED') {
            $applicationLogger.error("database.js", $displayMessage('db_connections_refused'));
        }
        $applicationLogger.error("database.js", err);
    } else {
        $applicationLogger.info("database.js", $displayMessage('db_connected'));
    }
    if (connection) connection.release();
    return
};

pool1.getConnection(getcon);
pool1.query = util.promisify(pool1.query);
global.db1 = pool1;

const exportData = { pool1: pool1 }
module.exports = exportData;