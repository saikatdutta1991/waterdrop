const UserModel = require('../models/user')

const validator = async function (req) {

    /**check for password */
    req.checkBody('password').isLength({ min: 6, max: 100 }).withMessage('Password must between 6-100 characters')

    /**check for mobile country_code and number */
    req.checkBody('country_code').matches(/^[+]\d+$/).withMessage('Country code ex: +91')
    req.checkBody('mobile_number').isNumeric().withMessage('Mobile number only digits allowed')

    /** check mobile number exists in db  */
    req.checkBody('mobile_number', 'Mobile number already in use').custom(value => {
        return UserModel.findOne({ 'mobile.number': value, 'mobile.country_code': req.body.country_code }).then(function (user) {
            if (user) {
                return Promise.reject();
            }
        })
    })

    return req.getValidationResult()
}



module.exports = validator