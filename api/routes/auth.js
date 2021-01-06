const express = require('express');
const router = express.Router();
const authController = require('../auth/controller/auth.controller');

//add role
router.post('/', authController.getToken);

module.exports = router;