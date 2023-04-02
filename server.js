"use strict";

/**
 * Main file to execute the application
 *
 */
process.env.NODE_ENV = "local"; // set application mode [local,production] default is production
const global = require('./helpers/global');
const app = require("./config/app");