'use strict';
const nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
const CONSTANT = require('../config/constant');
const _ = require('lodash');
const exportData = {};

/**
 * To send html type email
 * @param : 
 * from : string type , required
 * to: array type, required
 * subject: string type, required
 * body: string type, required
 * attachments: array of object [{filename: 'text1.txt', content: 'hello world!'}] type, not required
 * */

exportData.sendHtmlEmail = async(smtp, from, to, subject, body, attachments) => {
    let res = false;
    try {
        if (to.length > 0) {

            smtpTransport = nodemailer.createTransport(smtpTransport({
                host: smtp.smtp_host,
                port: smtp.smtp_port,
                secure: (smtp.smtp_type === 'ssl') ? true : false, // true for 465, false for other ports
                auth: {
                    user: smtp.user_name, // generated ethereal user
                    pass: smtp.password // generated ethereal password   
                }
            }));

            let froms = `${_.upperFirst(smtp.from_name)} ${from}`;
            let toString = _.join(to, ',');
            let mailOptions = {
                from: froms,
                to: toString,
                subject: 'Mailing System ' + subject,
                html: body,
                attachments: attachments
            };
            let sendMail = await smtpTransport.sendMail(mailOptions);
            return sendMail;
        }
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), error.message);
    }
    return res;
}


module.exports = exportData;