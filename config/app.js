"use strict";
/**
 * Single entry point to overall application
 * main files load here
 */
const { site_config } = require('./index');
const router = require('../routes');
const fs = require('fs');
const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const moment = require('moment');
const CONSTANT = require('./constant');
const db = require('./database');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

//form-urlencoded
app.use(cookieParser());

app.use('/', router);
app.use(function(req, res, next) {
    $jsonResponse(res, { 'status': false, 'msg': $displayMessage('page_not_found', { 'url': req.originalUrl }) }, CONSTANT.RESPONSE_NOT_FOUND);
    $applicationLogger.debug($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_NOT_FOUND, msg: $displayMessage('page_not_found', { 'url': req.originalUrl }) });
});


let server;
if (site_config.isHttps) {
    const https = require('https');
    const options = {
        key: fs.readFileSync('./key.pem', 'utf8'),
        cert: fs.readFileSync('./server.crt', 'utf8')
    };
    server = https.createServer(options, app).listen(site_config.port, site_config.host, listen_callback);
} else {
    server = app.listen(site_config.port, site_config.host, listen_callback);
}

module.exports = app;

function listen_callback() {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Time: ' + moment().format('LLLL') + $displayMessage('app_listening', { 'host': host, 'port': port }))
}