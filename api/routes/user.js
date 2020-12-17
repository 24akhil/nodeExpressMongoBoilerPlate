const express = require("express");
const router = express.Router();
const userController = require("../auth/user.controller");



router.post('/',userController.user_create);

router.get('/',userController.user_get_all);
router.patch('/',userController.user_update);

module.exports = router;
