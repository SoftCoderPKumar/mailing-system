'use strict';
const _ = require('lodash');
const CONSTANT = require('../../../config/constant');
const exportData = {};

exportData.createEmailAccount = async(postData) => {
    try {
        let sql = 'CALL CREATE_EMAIL_ACCOUNT_IP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        let inputarr = [postData.from_name, postData.from_email, postData.user_name, postData.password, postData.smtp_host, postData.smtp_port, postData.smtp_type, postData.msg_per_day, postData.msg_time_gap, postData.diff_reply_address, postData.imap_reply_mail, postData.imap_host, postData.imap_port, postData.imap_type, postData.created_at, postData.deleted];
        let resDb = await db1.query(sql, inputarr);
        let retAr = $convertProcedureData(resDb, true);
        let ret = retAr[0] || false;
        console.log(ret)
        return ret;
    } catch (error) {
        $applicationLogger.error($errorLogDetails(), { status: false, code: CONSTANT.RESPONSE_SERVER_ERR, msg: error.message });
        return false;
    }
    return false;
}

module.exports = exportData;