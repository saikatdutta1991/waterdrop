/** importing dependent modules */
const multer = require('multer')
const path = require('path')


exports.unknownerror = function (error) {
    return this.createResponse(false, 'unkonwn_error', 'Unknown error. Try again')
}



/** create formated api json response */
exports.createResponse = function (success, type, message, data, stackTrace) {

    return {
        success: success,
        type: type.toLowerCase(),
        message: message,
        data: data,
        stack: stackTrace
    };
}


/** parse and format validation error response */
exports.formatErrors = function (error) {

    if (!error.hasOwnProperty('errors')) {
        return error
    }

    var errors = {}
    for (var key in error.errors) {
        errors[key] = error.errors[key].message
    }

    return errors
}


/** custom api error class that will be handled 
 * by default error handler in app.js
 * */
exports.CustomError = class CustomErr extends Error {

    constructor(type, message, data) {
        super(message)

        Error.captureStackTrace(this, this.constructor)
        this.name = this.constructor.name
        this.type = type
        this.message = message
        this.data = data

    }

}


/** 
 * shop image destination and file name generation
 */
exports.shopimageStorage = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/shops/images',
        filename: (req, file, cb) => {
            var filename = `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
            cb(null, filename)
        }
    })
}).single('image');


/** 
 * product image destination and file name generation
 */
exports.productimageStorage = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/shops/products/images',
        filename: (req, file, cb) => {
            var filename = `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
            cb(null, filename)
        }
    })
}).single('image');



/** format express validation errors */
exports.formatWith = function ({ location, msg, param, value, nestedErrors }) {
    return msg
}