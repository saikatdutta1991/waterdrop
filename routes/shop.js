/** initializing modules */
const router = require('express').Router();
const authController = require('../controllers/shop/auth')
const profileController = require('../controllers/shop/proflle')
const productController = require('../controllers/shop/product')
const searchControlller = require('../controllers/shop/search')
const verifyShopAuthtoken = require('../middlewares/verifyShopAuthtoken')
/** initializing modules end*/

router.post('/register', authController.doRegister); //shop registration route
router.post('/login', authController.doLogin) //shop manual login
router.get('/search', searchControlller.searchShops) //search shops

/** authenticated routes */
router.use('/', verifyShopAuthtoken)
router.get('/profile', profileController.getProfile)
router.post('/upload/shopimage', profileController.uploadShopImage)
router.post('/open', profileController.openShop)
router.post('/close', profileController.closeShop)


router.post('/products', productController.addProduct) //add new shop product
router.get('/products', productController.getProducts) //get shop products
router.get('/products/:productId', productController.getProductById)
router.post('/products/:productId/upload/image', productController.uploadProductImage)
/** authenticated routes end */




/** finally export the routes */
module.exports = router;
