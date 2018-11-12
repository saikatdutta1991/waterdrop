/** initializing modules */
const router = require('express').Router();
const authController = require('../controllers/shop/auth')
const profileController = require('../controllers/shop/proflle')
const verifyShopAuthtoken = require('../middlewares/verifyShopAuthtoken')
/** initializing modules end*/

router.post('/register', authController.doRegister); //shop registration route
router.post('/login', authController.doLogin) //shop manual login

/** authenticated routes */
router.use('/', verifyShopAuthtoken)
router.get('/profile', profileController.getProfile)
router.post('/upload/shopimage', profileController.uploadShopImage)
/** authenticated routes end */




/** finally export the routes */
module.exports = router;
