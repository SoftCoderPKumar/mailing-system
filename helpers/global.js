'use strict';
/**
 * Contains global function and veriable, accessible form whole Application
 *
 */
const _ = require('lodash');
const logger = require('../config/error');
const CONSTANT = require('../config/constant');
const crypto = require('crypto');
const stackTrace = require('stack-trace');
const path = require('path');
const { getResponseMessage } = require('../language');

global.$jsonResponse = (res, response, status) => {
    let sta = status || CONSTANT.RESPONSE_OK;
    res.status(sta);
    return res.json(response);
};

global.$applicationLogger = {
    debug: (location, log) => {
        if (location && log) {
            switch (typeof log) {
                case 'object':
                    logger.debug(`${location} | Message: ${JSON.stringify(log)}`);
                    break;
                default:
                    logger.debug(`${location} | Message: ${log}`);
                    break;
            }
        }
    },
    info: (location, log) => {
        if (location && log) {
            switch (typeof log) {
                case 'object':
                    logger.info(`${location} | Message: ${JSON.stringify(log)}`);
                    break;
                default:
                    logger.info(`${location} | Message: ${log}`);
                    break;
            }
        }
    },
    warn: (location, log) => {
        if (location && log) {
            switch (typeof log) {
                case 'object':
                    logger.warn(`${location} | Message: ${JSON.stringify(log)}`);
                    break;
                default:
                    logger.warn(`${location} | Message: ${log}`);
                    break;
            }
        }
    },
    error: (location, log) => {
        if (location && log) {
            switch (typeof log) {
                case 'object':
                    logger.error(`${location} | Message: ${JSON.stringify(log)}`);
                    break;
                default:
                    logger.error(`${location} | Message: ${log}`);
                    break;
            }
        }
    },
};

global.$getHash = (string, algo) => {
    let altm = algo || CONSTANT.DEFUALT_HASH_ALGO;
    let hash = crypto.createHash(altm).update(string, 'utf8').digest('hex');
    return hash;
}

global.$mb_strlen = (str) => {
    return str.replace(/[\u0080-\u10FFFF]/g, "x").length;
}

global.$getMD5 = (string) => {
    let md5 = crypto.createHash('md5').update(string).digest("hex");
    return md5;
}

global.$convertProcedureData = (res, single, index) => {
    let ret = [];
    try {
        let pos = index || 0;
        if (_.isArray(res)) {
            res.forEach(element => {
                if (_.isArray(element)) {
                    if (single) {
                        ret.push(element[pos]);
                    } else {
                        ret.push(element);
                    }
                }
            });
        }
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), error.message);
    }
    return ret;
}

global.$encryptDecryptStringRes = (act, string) => {
    let output = false;
    if (act == 'encrypt') {
        output = encrypts(string);
    } else {
        output = decrypts(string);
    }
    return output;
}

global.$stringToSlugConvert = (string) => {
    let output = _.trim(string);
    output = _.toLower(output).replace(' ', '-').replace(/[^A-Za-z0-9\-]/g, '-').replace(/\-+/g, '-');
    return output;
}

global.$quoteIdentifier = (array, spacialChar = '`') => {
    let output = array.toString().split(',').map(function(word) {
        return spacialChar + word.trim() + spacialChar;
    }).join(',');

    return output;
}

global.$urldecode = (url) => {
    return decodeURIComponent(url.replace(/\+/g, ' '));
}

global.$validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

global.$displayMessage = (key, inputParams = '') => {
    return getResponseMessage(key, inputParams);
}

global.$errorLogDetails = () => {
    let res = null;
    var trace = stackTrace.get();
    trace.shift()
    res = "Relative Path: " + path.relative(__dirname, trace[0].getFileName());
    res += " | Function Name: " + trace[0].getFunctionName();
    res += " | Line Number: " + trace[0].getLineNumber();
    res += " | Column Number: " + trace[0].getColumnNumber();
    return res;
}

let encrypts = (data) => {
    let cipher = crypto.createCipheriv(CONSTANT.DEFUALT_ENCPT_ALGO, new Buffer.from(CONSTANT.DEFUALT_ENCPT_KEY), '');
    cipher.setAutoPadding(false);
    try {
        return new Buffer.from(cipher.update(pad(data), 'utf8', 'binary') + cipher.final('binary'), 'binary').toString('base64');
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), error.message);
        return null;
    }
}

let decrypts = (data) => {
    let decipher = crypto.createDecipheriv(CONSTANT.DEFUALT_ENCPT_ALGO, new Buffer.from(CONSTANT.DEFUALT_ENCPT_KEY), '');
    decipher.setAutoPadding(false);
    try {
        return (decipher.update(new Buffer.from(data, 'base64').toString('binary'), 'binary', 'utf8') + decipher.final('utf8')).replace(/\x00+$/g, '');
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), error.message);
        return null;
    }
}

function pad(text) {
    let pad_bytes = 8 - (text.length % 8);
    for (var x = 1; x <= pad_bytes; x++)
        text = text + String.fromCharCode(0);
    return text;
}