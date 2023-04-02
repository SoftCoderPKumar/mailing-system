'use strict';
/**
 * Contains error logging into file or console into /logs/ folder
 * 
 */
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const _ = require('lodash')
const path = require('path');
const env = process.env.NODE_ENV || 'production';
const moment = require('moment');

const filename = path.join('logs/reported_at_' + moment().format('YYYY-MM-DD') + '.log');

function getLevel() {
    let logLevel = 'info';
    switch (env) {
        case 'production':
            // logLevel = 'error';
            // logLevel = 'warn';
            logLevel = 'info';
            break;
        case 'local':
            logLevel = 'debug'
            break;
    }
    return logLevel;
}

const logger = createLogger({
    // change level if in dev environment versus production
    level: getLevel(),
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `Time: ${info.timestamp} | ${_.capitalize(info.level)} | ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `Time: ${info.timestamp} | ${_.capitalize(info.level)} | ${info.message}`
                )
            )
        }),
        new transports.File({ filename })
    ]
});

module.exports = logger;