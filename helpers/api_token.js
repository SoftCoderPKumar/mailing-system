'use strict';
const _ = require('lodash');
const { header, query, body } = require('express-validator');
const { API_TOKEN_CONST, API_PLATFORM } = require('../config/constant')
const exportData = {};
const { apiRequestLog } = require('../services/');


exportData.errorMsgArray = [
    $displayMessage('enter_api_token'), $displayMessage('enter_api_platform'), $displayMessage('enter_app_version'), $displayMessage('valid_api_token'), $displayMessage('valid_api_platform')
];

let isValidTokenCheck = (value, { req, location, path }) => {
    if (value && req.headers.platform && req.headers.version) {
        apiRequestLog(req);
    }
    if (value) {
        let decryptString = $encryptDecryptStringRes('decrypt', value);
        if (decryptString && API_TOKEN_CONST == decryptString.substring(0, decryptString.length - 13)) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

exportData.apiHeaderValidation = [
    header('api_token', $displayMessage('enter_api_token')).not().isEmpty().custom(isValidTokenCheck).withMessage($displayMessage('valid_api_token')),
    header('platform', $displayMessage('enter_api_platform')).not().isEmpty().custom((value, { req }) => _.includes(API_PLATFORM, value)).withMessage($displayMessage('valid_api_platform')),
    header('version', $displayMessage('enter_app_version')).not().isEmpty(),
];


module.exports = exportData;