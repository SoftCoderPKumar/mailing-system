'use strict';
/**
 * Contains Default configuration setting to use in over all application for local
 * 
 */

const config = {
    site_config: {
        app_name: 'mailing system',
        base_url: 'https://dr-appointment-booking.herokuapp.com/',
        host: '0.0.0.0',
        port: process.env.PORT || 4200,
        env: 'production', // [local,production] default is production
        site_url: 'https://dr-appointment-booking.herokuapp.com/',
        isHttps: false
    },
    appLanguage: {
        name: 'EN'
    },
    config_mysql1: {
        connectionLimit: 5,
        host: 'sql12.freemysqlhosting.net',
        user: 'sql12610363',
        password: 'FudhpugHLM',
        database: 'sql12610363',
        multipleStatements: true
    },
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'pappu.setrosoft@gmail.com', // generated ethereal user
            pass: 'bdepataairbmdkid' // generated ethereal password   
        }
    }
}

module.exports = config;