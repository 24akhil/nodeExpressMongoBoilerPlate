const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");
const auth = require("../auth/middleware/validate-auth");

//add role
router.post('/', auth.validate, roleController.role_add);

//update role
router.put('/', auth.validate, auth.validateAdmin, roleController.role_update);

//get all roles
router.get('/', auth.validate, auth.validateAdmin, roleController.role_getAll);

//get by role
router.get('/:role', roleController.role_getbyRole);

//delete role
router.delete('/:roleId', roleController.role_remove);

module.exports = router;