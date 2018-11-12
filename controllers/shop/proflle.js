/** 
 * This controller handles shops registration apis
 */

const ShopModel = require('../../models/shop')
const api = require('../../helpers/api')




/** 
 * get shop profile
 */
exports.getProfile = function (req, res) {
    res.json(api.createResponse(true, 'success', 'Profile fetched', req.auth_shop))
}
