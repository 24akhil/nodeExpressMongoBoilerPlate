const express = require("express");
const router = express.Router();
// const swaggerSpecs = require('./api/middlewares/swagger');
const swaggerUiEx = require('swagger-ui-express');
const swaggerDoc = require('./api/middlewares/swagger.json');


//#region subroutes imports
const userRoutes = require("./api/routes/user");
const roleRoutes = require("./api/routes/role");
//#endregion

router.use("/user", userRoutes);
router.use("/role", roleRoutes);


//#region swagger injection into routes
router.get('/healthcheck', (req, res) => res.send('OK'));
router.use('/docs', swaggerUiEx.serve, swaggerUiEx.setup(swaggerDoc));
//#endregion


module.exports = router;