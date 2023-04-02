'use strict';
/**
 * dynamic API token
 * author PKumar Soni
 * @date 13-02-2021
 */

const _ = require('lodash');
const { API_TOKEN_CONST } = require('./constant');
const CONSTANT = require('../config/constant');

const exportData = {}

exportData.apiToken = async (req, res, next) => {
    let response = {
        "status": false,
        "msg": $displayMessage('wrong'),
        "api_token": null
    }
    try {
        const str = API_TOKEN_CONST + _.now();
        response = {
            "status": true,
            "msg": $displayMessage('api_token'),
            "api_token": $encryptDecryptStringRes('encrypt', str)
        }
    } catch (error) {
        response.msg = error.message;
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
        $jsonResponse(res, response, CONSTANT.RESPONSE_SERVER_ERR);
    }
    $jsonResponse(res, response);
};

module.exports = exportData;