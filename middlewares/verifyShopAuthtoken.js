/** 
 * verify shop auth token 
 * if auth token verified
 * then fetch shop and add to req
 * */

const jwt = require('jsonwebtoken')
const appConfig = require('../configs/app')
const api = require('../helpers/api')
const ShopModel = require('../models/shop')

module.exports = function (req, res, next) {

    jwt.verify(req.headers.authorization, appConfig.jwt_secret, function (err, decoded) {

        /** if invalid token then send session expired response */
        if (err) {
            return res.json(api.createResponse(false, 'session_expired', 'Session expired'))
        }

        /** fetch shop by id */
        ShopModel.findById(decoded.data._id, function (err, shop) {

            /** if no shop find then send  */
            if (err || !shop) {
                return res.json(api.createResponse(false, 'session_expired', 'Session expired'))
            }

            /** adding authenticated shop object to req */
            req.auth_shop = shop
            next()
        })


    });

}