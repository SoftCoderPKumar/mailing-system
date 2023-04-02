'use strict';
const _ = require("lodash");
const CONSTANT = require('../../../config/constant');
const mailingService = require("../services")
const { checkEmailExist } = require("../../../services/index")
const handlebars = require('handlebars');
const { sendHtmlEmail } = require('../../../helpers/mail')
const now = Date.now();

const exportData = {};

exportData.createEmailAccount = async(postData) => {
    let response = {
        status: false,
        msg: $displayMessage("wrong"),
        res: null
    }
    try {
        postData.created_at = parseInt(now / 1000);
        postData.deleted = 0;
        let result = await mailingService.createEmailAccount(postData);
        if (result && result.affected_rows) {
            response = {
                status: true,
                msg: $displayMessage("create_email_account_success_msg"),
                res: null
            }
        } else {
            response = {
                status: false,
                msg: $displayMessage("try_again"),
                res: null
            }
        }
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
    }
    return response;
}
exportData.getEmailAccount = async(inputData) => {
    let response = {
        status: false,
        msg: $displayMessage("wrong"),
        res: null
    }
    try {
        let result = await checkEmailExist(inputData.emailId, 1);
        if (result && Object.keys(result).length) {
            response = {
                status: true,
                msg: $displayMessage("get_email_account"),
                res: result
            }
        } else {
            response = {
                status: false,
                msg: $displayMessage("get_email_account_not"),
                res: null
            }
        }
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
    }
    return response;
}

exportData.sendMail = async(postData) => {
    let response = {
        status: false,
        msg: $displayMessage("wrong"),
        res: null
    }
    try {
        let emailAccountData = await checkEmailExist(postData.sendar_email, 1);
        if (emailAccountData && Object.keys(emailAccountData).length) {
            let template = handlebars.compile(postData.body);
            let htmlToSend = template();
            let attachments = [];
            let to = postData.toEmails;
            let from = emailAccountData.from_email;
            let subject = postData.subject
            let resMail = await sendHtmlEmail(emailAccountData, from, to, subject, htmlToSend, attachments);
            if (resMail) {
                response = {
                    status: true,
                    msg: 'Email has send successfully.',
                    res: null
                }
            }
        } else {
            response = {
                status: false,
                msg: $displayMessage("sendar_email_exists"),
                res: null
            }
        }
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
    }
    return response;
}


module.exports = exportData;