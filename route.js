const express = require("express");
const router = express.Router();
// const swaggerUi = require('swagger-ui-express');
// const specs = require('./api/middleware/swagger');

//#region subroutes
const userRoutes = require("./api/routes/user");
//#endregion

router.use("/user", userRoutes);


router.get('/healthcheck', (req, res) => res.send('OK'));
// router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer:true }));
// router.use('/docs', swaggerUi.serve);

// router.get('/docs', swaggerUi.setup(specs, { explorer:true }));



module.exports = router;