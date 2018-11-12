/** 
 * This controller handles shops registration apis
 */

const ShopModel = require('../../models/shop')
const api = require('../../helpers/api')
const jwt = require('jsonwebtoken')
const appConfig = require('../../configs/app')




/** 
 * login shop user
 * email and password required
 */
exports.doLogin = async function (req, res, next) {

    /** find shop by email */
    var shop = await ShopModel.getShopByEmail(req.body.email)

    /** if shop not found then send error */
    if (!shop) {
        res.json(api.createResponse(false, 'failed', 'Entered eamil not registered with us'))
    }

    /** verify password with input password */
    if (!ShopModel.verifyPassword(req.body.password, shop.password)) {
        res.json(api.createResponse(false, 'failed', 'Wrong password entered'))
    }

    /** creating auth token */
    var authToken = jwt.sign({
        data: {
            _id: shop._id,
            email: shop.email,
            name: shop.name
        }
    }, appConfig.jwt_secret, { expiresIn: '1h' });


    res.json(api.createResponse(true, 'success', 'You have logged in successfully', {
        auth_token: authToken,
        shop: shop
    }))


}












exports.doRegister = async function (req, res, next) {

    var shop = new ShopModel()
    shop.name = req.body.name
    shop.email = req.body.email
    shop.password = req.body.password
    shop.mobileno.country_code = req.body.mobileno.country_code
    shop.mobileno.number = req.body.mobileno.number
    shop.location.address = req.body.location.address
    shop.location.latitude = req.body.location.latitude
    shop.location.longitude = req.body.location.longitude


    try {

        var shop = await shop.save()
        res.json(api.createResponse(true, 'success', { shop: shop }, 'Shop registered successfully'))

    } catch (err) {
        next(new api.CustomError('failed', 'Failed to register', api.formatErrors(err)))
    }

} 