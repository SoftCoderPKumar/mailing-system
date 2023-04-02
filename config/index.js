'use strict';
/**
 * Contains Default configuration setting to use in over all application
 * 
 */
const folders = process.env.NODE_ENV || 'production'; // [local,production] default is production
const config = require('./' + folders);
module.exports = config;