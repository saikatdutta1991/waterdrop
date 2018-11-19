const UserModel = require('../models/user')

const validator = async function (req, data) {

    var validator = this  // this will be used to hold async user data after mobile number check 

    /**check for password */
    req.checkBody('password').isLength({ min: 6, max: 100 }).withMessage('Password must between 6-100 characters')

    /**check for mobile number */
    req.checkBody('mobile_number').
        isNumeric()
        .withMessage('Mobile number only digits allowed')
        .custom(function (value) {

            return UserModel.findOne({ 'mobile.number': value }).then(function (user) {
                validator.user = user
                if (!user) {
                    return Promise.reject()
                }
            })
        })
        .withMessage('Mobile number does not exists')


    /** check mobile number errors first */
    var errors = await req.getValidationResult()
    if (!errors.isEmpty()) {
        return errors
    }


    /** check password matches */
    req.checkBody('password', 'Wrong password entered').custom(function (value) {
        return UserModel.verifyPassword(req.body.password, validator.user.password)
    })

    data.user = validator.user

    return req.getValidationResult()
}



module.exports = validator