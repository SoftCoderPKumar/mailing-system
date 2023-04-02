'use strict'
/**
 * Contains common constant here
 * 
 */
const exportData = {};

exportData.RESPONSE_OK = 200;
exportData.RESPONSE_CREATED = 201;
exportData.RESPONSE_ACCEPTED = 202;
exportData.RESPONSE_NO_CONTENT = 204;
exportData.RESPONSE_REDIRECT_PERMANENT = 301;
exportData.RESPONSE_NOT_MODIFIED = 304;
exportData.RESPONSE_REDIRECT_TEMPORARY = 307;
exportData.RESPONSE_BAD_REQUEST = 400;
exportData.RESPONSE_UNAUTHORIZED = 401;
exportData.RESPONSE_FORBIDDEN = 403;
exportData.RESPONSE_NOT_FOUND = 404;
exportData.RESPONSE_SERVER_ERR = 500;
exportData.RESPONSE_BAD_GETEWAY = 502;
exportData.RESPONSE_SERVICE_UNAVAILABLE = 503;
exportData.RESPONSE_GATEWAY_TIMEOUT = 504;

//Encryption methods and algorithms
exportData.DEFUALT_HASH_ALGO = 'ripemd160';
exportData.DEFUALT_ENCPT_ALGO = 'bf-ecb';
exportData.DEFUALT_ENCPT_KEY = '012abc345fed';

//Api Token
exportData.API_TOKEN_CONST = 'apitoken';
exportData.API_PLATFORM = ['android', 'ios', 'web', 'wap'];

//mailing
exportData.TYPE = ['ssl', 'tls', 'none'];

module.exports = exportData;