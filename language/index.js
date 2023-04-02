'use strict'
/**
 * 
 * Author: - pkumar Soni
 */
const { appLanguage } = require('../config');
let lang = appLanguage.name || 'EN';
const { getMessage } = require('./' + lang);
const handlebars = require('handlebars');
const _ = require('lodash');

const exportData = {}

exportData.getResponseMessage = (key, inputParams) => {
    let message = getMessage(key);
    if (inputParams && !_.isEmpty(inputParams)) {
        let messageTemplate = handlebars.compile(message);
        message = messageTemplate(inputParams);
    }
    return message;
}
module.exports = exportData;