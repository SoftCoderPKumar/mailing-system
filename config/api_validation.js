'use strict';
/**
 * Common validation for api requests
 */
const _ = require('lodash');
const CONSTANT = require('./constant');
const { validationResult } = require('express-validator');
const { errorMsgArray } = require('../helpers/api_token')

const exportData = {};

exportData.isEncodedInput = async(res, req, next) => {
    try {
        if (res.body.isEncoded == 1) {
            let data = res.body.data || null;
            if (data) {
                let decodeData = JSON.parse($encryptDecryptStringRes('decrypt', data));
                if (decodeData) {
                    res.body = _.assign({}, res.body, decodeData);
                }
            }
        }
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
    }
    next();
}

exportData.userValidationChecking = async(req, res, next) => {
    let response = {
        status: false,
        msg: $displayMessage('wrong'),
        res: null
    }
    let errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${msg}`;
        //return `${location}[${param}]: ${msg}`;
    };
    let errors = await validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        response.errors = errors.array();
        if (_.includes(errorMsgArray, response.errors[0])) {
            response.msg = $displayMessage('unauthorized');
            $jsonResponse(res, response, CONSTANT.RESPONSE_UNAUTHORIZED);
        } else {
            response.msg = response.errors[0];
            $jsonResponse(res, response, CONSTANT.RESPONSE_BAD_REQUEST);
        }
    } else {
        next();
    }
}
module.exports = exportData;