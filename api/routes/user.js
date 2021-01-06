const express = require("express");
const router = express.Router();
const userController = require("../auth/user.controller");


/** @swagger
* /orders/:
*  post:
*    tags:
*    - Orders
*    description: Creates a new order
*    produces:
*      - application/json
*    parameters:
*    - in: body
*      name: body
*      description: User object that needed to be created
*      required: true
*      schema: # Request body contents
*        type: "object"
*        properties:
*          name:
*            type: string
*          email:
*            type: string
*          role:
*            type: string
*          password:
*            type: string
*          city:
*            type: string
*        example:   # Sample object
*          name: John Doe
*          email: john_example.com 
*          role: manager
*          password: 123456
*          city: New York
*    responses:
*      200:
*        description: Successfully created   
*/
router.post('/', userController.user_create);

/** @swagger
 * /user/:
 *   get:
 *     tags:
 *       - User
 *     description: Returns multiple users
 *     produces:
 *       - application/json     
 *     responses:
 *       200:
 *         description: Users list
 */
router.get('/', userController.user_get_all);

/**@swagger
 * /user/:
 *   patch:
 *     tags:
 *       - User
 *     description: Update an existing user
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               city:
 *                 type: string   
 *             example:   # Sample object
 *               name: John Doe
 *               email: 'john_example.com'  
 *               password: ******  
 *               role: manager  
 *               city: New York  
 *     responses:
 *       200
 *         description: User created     
 */
router.patch('/', userController.user_update);

//find by email
router.get('/:email', userController.user_findby_email);

//delete by email
router.delete('/:email', userController.user_deleteby_email);

module.exports = router;
