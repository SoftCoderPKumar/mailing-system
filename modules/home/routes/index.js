'use strict';
const express = require('express');
const router = express.Router();


router.get('/', async function (req, res, next) {
    $jsonResponse(res, $displayMessage('in_route_msg', { route: 'home' }));
});
router.post('/', function (req, res, next) {
    $jsonResponse(res, $displayMessage('in_route_msg', { route: 'home' }));
});

module.exports = router;