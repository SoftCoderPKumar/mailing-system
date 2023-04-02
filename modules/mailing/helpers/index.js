'use strict'
const { body, query } = require('express-validator');
const _ = require('lodash')
const exportData = {};
const { checkEmailExist, userEmailExist } = require('../../../services/index');
const { TYPE } = require('../../../config/constant')

let emailExist = async(value, { req, location, path }) => {
    let res = await checkEmailExist(value, 0);
    if (res.total_count == 0) {
        return true;
    } else {
        return false;
    }
}

let userExist = async(value, { req, location, path }) => {
    let res = await userEmailExist(value, 0);
    if (res.total_count == 0) {
        return true;
    } else {
        return false;
    }
}


exportData.createEmailAccountValidation = [
    body('from_name', $displayMessage('enter_from_name')).trim().not().isEmpty().bail().isLength({ min: 3 }).withMessage($displayMessage('invalid_from_name_count')).bail().isAlpha('en-US', { ignore: ' ' }).withMessage($displayMessage('invalid_from_name')),
    body('from_email', $displayMessage('enter_from_email')).trim().not().isEmpty().bail().isEmail().withMessage($displayMessage('valid_email')).bail().custom(async(value) => {
        return await checkEmailExist(value, 0).then((res) => {
            if (res.total_count) {
                return Promise.reject($displayMessage('email_exists'));
            }
        })
    }),
    body('user_name', $displayMessage('enter_user_name')).not().isEmpty().bail().isEmail().withMessage($displayMessage('valid_user_name')).bail().custom(async(value) => {
        return await userEmailExist(value, 0).then((res) => {
            if (res.total_count) {
                return Promise.reject($displayMessage('user_name_exists'));
            }
        })
    }),
    body('password', $displayMessage('enter_password')).trim().not().isEmpty().bail().isLength({ min: 3, max: 100 }).withMessage($displayMessage('password_length')),
    body('smtp_host', $displayMessage('enter_smtp_host')).not().isEmpty().bail().isURL().withMessage($displayMessage('valid_smtp_host')),
    body('smtp_port', $displayMessage('enter_smtp_port')).not().isEmpty().bail().isInt().withMessage($displayMessage('valid_smtp_port')),
    body('smtp_type', $displayMessage('enter_smtp_type')).not().isEmpty().bail().custom((value, { req }) => _.includes(TYPE, value)).withMessage($displayMessage('valid_smtp_type')),
    body('msg_per_day', $displayMessage('enter_msg_per_day')).not().isEmpty().bail().isInt().withMessage($displayMessage('valid_msg_per_day_count')),
    body('msg_time_gap', $displayMessage('enter_msg_time_gap')).not().isEmpty().bail().isInt().withMessage($displayMessage('valid_msg_time_gap')),
    body('diff_reply_address', $displayMessage('enter_diff_reply_address')).not().isEmpty().bail().custom((value, { req }) => _.includes(["Y", "N"], value)).withMessage($displayMessage('valid_diff_reply_address')),
    body('imap_reply_mail', $displayMessage('enter_imap_reply_mail')).not().isEmpty().bail().custom((value, { req }) => _.includes(["Y", "N"], value)).withMessage($displayMessage('valid_imap_reply_mail')),
    body('imap_host', $displayMessage('enter_imap_host')).not().isEmpty().bail().isURL().withMessage($displayMessage('valid_imap_host')),
    body('imap_port', $displayMessage('enter_imap_port')).not().isEmpty().bail().isInt().withMessage($displayMessage('valid_imap_port')),
    body('imap_type', $displayMessage('enter_imap_type')).not().isEmpty().bail().custom((value, { req }) => _.includes(TYPE, value)).withMessage($displayMessage('valid_imap_type')),
];

exportData.getEmailAccountValidation = [
    query('emailId', $displayMessage('enter_emailId')).trim().not().isEmpty().bail().isEmail().withMessage($displayMessage('valid_emailId')).bail().custom(async(value) => {
        return await checkEmailExist(value, 0).then((res) => {
            if (!res.total_count) {
                return Promise.reject($displayMessage('emailId_exists'));
            }
        })
    }),
];

exportData.sendMailValidation = [
    body("toEmails", $displayMessage('enter_toEmails')).not().isEmpty().bail().isArray({ min: 1 }).withMessage($displayMessage('toEmails_count')),
    body("toEmails.*").not().isArray().isEmail().withMessage($displayMessage('valid_toEamilIds')),
    body('sendar_email', $displayMessage('enter_sendar_email')).trim().not().isEmpty().bail().isEmail().withMessage($displayMessage('valid_sendar_email')).bail().custom(async(value) => {
        return await checkEmailExist(value, 0).then((res) => {
            if (!res.total_count) {
                return Promise.reject($displayMessage('sendar_email_exists'));
            }
        })
    }),
    body('subject', $displayMessage('enter_subject')).trim().not().isEmpty().bail().isLength({ min: 3 }).withMessage($displayMessage('valid_subject_length')),
    body('body', $displayMessage('enter_body')).trim().not().isEmpty().bail().isLength({ min: 10 }).withMessage($displayMessage('valid_body_length')),

];


module.exports = exportData;