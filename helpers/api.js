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