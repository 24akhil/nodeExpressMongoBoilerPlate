const express = require("express");
const router = express.Router();
const userController = require("../auth/user.controller");



router.post('/', userController.user_create);

router.get('/', userController.user_get_all);

router.patch('/', userController.user_update);

//find by email
router.get('/:email', userController.user_findby_email);

//delete by email
router.delete('/:email', userController.user_deleteby_email);

module.exports = router;
