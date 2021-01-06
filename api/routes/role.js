const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

//add role
router.post('/', roleController.role_add);

//update role
router.put('/', roleController.role_update);

//get all roles
router.get('/', roleController.role_getAll);

//get by role
router.get('/:role', roleController.role_getbyRole);

//delete role
router.delete('/:roleId', roleController.role_remove);

module.exports = router;