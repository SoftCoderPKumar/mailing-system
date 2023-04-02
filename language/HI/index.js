'use strict'
/**
 * Hindi language file
 * Author: - pkumar Soni
 */
//example key and value
//$displayMessage('get_xyz_template_msg', {'name':'rahul','email':'rahul@gamil.com'});
//get_xyz_template_msg: `name {{name}} email {{email}} not found.`,

const exportData = {};
const messages = {
    lang: 'Hindi',
};

exportData.getMessage = (key) => {
    return messages[key] || "undefined message.";
}

module.exports = exportData;