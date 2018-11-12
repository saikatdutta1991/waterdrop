/**
 * this module handles default error and api errors
 * and send response
 */

const api = require('./api') //loading api helper functions


module.exports = function (err, req, res, next) {

    /** 
     * if err is class of api.CustomError 
     * then collect data from err object 
     * and send json response
     */
    if (err instanceof api.CustomError) {

        res.json(api.createResponse(
            false,
            err.type,
            err.message,
            err.data,
            req.app.get('env') === 'development' ? (err.stack ? err.stack : {}) : {}
        ))

        return;

    }

    /** set locals, only providing error in development */
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    /** render the error page */
    res.status(err.status || 500);
    res.render('error');
}