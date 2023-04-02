'use strict'
/**
 * English language file
 * Author: - pkumar Soni
 */

//example key and value
//$displayMessage('get_xyz_template_msg', {'name':'rahul','email':'rahul@gamil.com'});
//get_xyz_template_msg: `name {{name}} email {{email}} not found.`,

const exportData = {};

const messages = {
    lang: 'English',
    app_listening: ` App listening at http://{{host}}:{{port}}`,
    db_close: "Database connection was closed.",
    db_many_connections: "Database has too many connections.",
    db_connections_refused: "Database connection was refused.",
    db_connected: "Database connected!",
    page_not_found: `Page {{url}} not found.`,
    wrong: "Something went wrong.",
    api_token: "Get api token.",
    unauthorized: "Unauthorized access.",
    enter_api_token: "Please insert api token.",
    valid_api_token: "Please insert valid api token.",
    enter_api_platform: "Please insert source request platform.",
    valid_api_platform: "Please enter valid source request platform.",
    enter_app_version: "Please insert mobile app version.",
    in_route_msg: "in side {{route}} get route",

    enter_from_name: "Please enter from name.",
    invalid_from_name_count: "Invalid from name, provide atleast 3 letters.",
    invalid_from_name: "Invalid from name, only letters are allowed.",
    enter_from_email: "Please enter email address.",
    valid_email: "Please enter valid email address.",
    email_exists: "Email already exists, Please try another.",
    enter_user_name: "Please enter user name.",
    valid_user_name: "User name should be a valid email address.",
    user_name_exists: "User name already exists, Please try another.",
    enter_password: "Please enter password.",
    password_length: "Password must be between 3-100 characters.",
    enter_smtp_host: "Please enter smtp host.",
    valid_smtp_host: "Please enter valid url.",
    enter_smtp_port: "Please enter smtp port.",
    valid_smtp_port: "Only integer values are allowed.",
    enter_smtp_type: "Please enter smtp type",
    valid_smtp_type: "Please enter valid smtp type, Only allow these value 'ssl', 'tls', 'none'.",
    enter_msg_per_day: "Please enter message per day count.",
    valid_msg_per_day_count: "Only integer values are allowed.",
    enter_msg_time_gap: "Please enter message time gap.",
    valid_msg_time_gap: "Only integer values are allowed.",
    enter_diff_reply_address: "Do you want diffrent reply to address (Y/N)?",
    valid_diff_reply_address: "Please enter valid diffrent reply to address status, Only allow these value 'Y','N'.",
    enter_imap_reply_mail: "Do you want use diffrent email account for receive email. (Y/N)?",
    valid_imap_reply_mail: "Please enter valid diffrent email account for receive email status, Only allow these value 'Y','N'.",
    enter_imap_host: "Please enter imap host.",
    valid_imap_host: "Please enter valid url.",
    enter_imap_port: "Please enter imap port.",
    valid_imap_port: "Only integer values are allowed.",
    enter_imap_type: "Please enter imap type",
    valid_imap_type: "Please enter valid imap type, Only allow these value 'ssl', 'tls', 'none'.",

    create_email_account_success_msg: "Email account created successfuly.",
    try_again: "Something happend wrong! try again.",

    enter_emailId: "Please enter Email Id.",
    valid_emailId: "Please enter valid Email Id.",
    emailId_exists: "Email Id Not Found.",
    get_email_account: "Get email account.",
    get_email_account_not: "Email account not available.",

    enter_toEmails: "Please enter To emailIds, toEmailIds should be an array.",
    toEmails_count: "Please enter minimum one emailId",
    valid_toEamilIds: "Please enter valid emailId.",
    enter_sendar_email: "Please enter sender email address.",
    valid_sendar_email: "Please enter valid sender email address.",
    sendar_email_exists: "Sender email Id Not Found.",
    enter_subject: "Please enter the email subject.",
    valid_subject_length: "Subject must be atleast 5 characters.",
    enter_body: "Please enter sender email body.",
    valid_body_length: "Body must be atleast 10 characters.",
};

exportData.getMessage = (key) => {
    return messages[key] || "undefined message.";
}

module.exports = exportData;