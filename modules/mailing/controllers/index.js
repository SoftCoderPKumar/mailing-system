'use strict';
const exportData = {};
const mailingModel = require('../models')
const CONSTANT = require('../../../config/constant');

exportData.createEmailAccountPost = async(req, res, next) => {
    let response = {
        status: false,
        msg: $displayMessage("wrong"),
        res: null
    }
    try {
        let postData = req.body;
        response = await mailingModel.createEmailAccount(postData);
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
    }
    $jsonResponse(res, response);
}

exportData.getEmailAccountPost = async(req, res, next) => {
    let response = {
        status: false,
        msg: $displayMessage("wrong"),
        res: null
    }
    try {
        let inputData = req.query;
        response = await mailingModel.getEmailAccount(inputData);
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
    }
    $jsonResponse(res, response);
}

exportData.sendMailPost = async(req, res, next) => {
    let response = {
        status: false,
        msg: $displayMessage("wrong"),
        res: null
    }
    try {
        let postData = req.body;
        response = await mailingModel.sendMail(postData);
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
    }
    $jsonResponse(res, response);
}

module.exports = exportData;