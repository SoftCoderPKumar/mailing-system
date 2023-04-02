"use strict";
/**
 * Single routing point for overall application
 * main files App routes
 */
const express = require('express');
const router = express.Router();
const modules = require('../modules');
const tokens = require('../config/tokens');

const { apiHeaderValidation } = require('../helpers/api_token');
const { userValidationChecking } = require('../config/api_validation');

//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
router.use('/assigment-docs', swaggerUi.serve);
router.get('/assigment-docs', swaggerUi.setup(swaggerDocument));


router.get('/get-api-token', tokens.apiToken);

router.use('/', apiHeaderValidation, userValidationChecking, modules);
module.exports = router;