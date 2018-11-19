/** initializing modules */
const router = require('express').Router();
const authController = require('../controllers/user/auth')
/** initializing modules end*/

router.post('/register', authController.doRegister); //shop registration route
router.post('/login', authController.doLogin) //shop manual login


/** finally export the routes */
module.exports = router;
