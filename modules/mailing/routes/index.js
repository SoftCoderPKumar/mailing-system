'use strict';
const express = require('express');
const { isEncodedInput, userValidationChecking } = require('../../../config/api_validation');
const router = express.Router();
const mailingHelper = require('../helpers');
const mailingController = require('../controllers');


router.get('/', async function(req, res, next) {
    $jsonResponse(res, $displayMessage('in_route_msg', { route: 'mailing' }));
});
router.post('/', function(req, res, next) {
    $jsonResponse(res, $displayMessage('in_route_msg', { route: 'mailing' }));
});

router.post('/create-email-account', isEncodedInput, mailingHelper.createEmailAccountValidation, userValidationChecking, mailingController.createEmailAccountPost);
router.get('/get-email-account', isEncodedInput, mailingHelper.getEmailAccountValidation, userValidationChecking, mailingController.getEmailAccountPost);
router.post('/send-mail', isEncodedInput, mailingHelper.sendMailValidation, userValidationChecking, mailingController.sendMailPost);
module.exports = router;