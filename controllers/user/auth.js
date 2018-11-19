/** 
 * This controller handles user registration apis
 */

const UserModel = require('../../models/user')
const api = require('../../helpers/api')
const jwt = require('jsonwebtoken')
const appConfig = require('../../configs/app')
const userRegisterValidator = require('../../validators/userRegister')
const userLoginValidator = require('../../validators/userLogin')



/** 
 * login shop user
 * email and password required
 */
exports.doLogin = async function (req, res, next) {

    /** user registration validtion */
    var data = {};
    var errors = await userLoginValidator(req, data)
    if (!errors.isEmpty()) {
        return res.json(api.createResponse(false, 'validation', 'Login failed', errors.formatWith(api.formatWith).mapped()))
    }
    /** user registration validtion end */

    /** creating auth token */
    var authToken = jwt.sign({
        data: {
            _id: data.user._id,
            mobile_number: data.user.mobile.number,
            country_code: data.user.mobile.country_code
        }
    }, appConfig.jwt_secret, { expiresIn: '1h' });


    res.json(api.createResponse(true, 'success', 'You have logged in successfully', {
        auth_token: authToken,
        user: data.user
    }))


}











/**
 * 
 * @param {request object} req 
 * @param {response object} res 
 * @param {next callback} next 
 * @description {manual user registration function}
 */
exports.doRegister = async function (req, res, next) {

    /** user registration validtion */
    var errors = await userRegisterValidator(req)
    if (!errors.isEmpty()) {
        return res.json(api.createResponse(false, 'validation', 'Registration failed', errors.formatWith(api.formatWith).mapped()))
    }
    /** user registration validtion end */


    var user = new UserModel
    user.mobile = {
        country_code: req.body.country_code,
        number: req.body.mobile_number
    }
    user.password = req.body.password

    try {

        var user = await user.save()
        res.json(api.createResponse(true, 'success', 'You have registered successfully', { user: user }))

    } catch (error) {
        console.log(error)
        return res.json(api.unknownerror())
    }

} 