/** 
 * This controller handles shops registration apis
 */

const ProductModel = require('../../models/product')
const ShopModel = require('../../models/shop')
const api = require('../../helpers/api')


/** 
 * search shops nearby
 */
exports.searchShops = async function (req, res, next) {

    var shops = await ShopModel.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] },
                distanceField: "calculated_distance_km",
                distanceMultiplier: 0.001,
                maxDistance: parseFloat(req.query.distance),
                spherical: true
            }
        }
    ])

    res.json(api.createResponse(true, 'success', 'Nearby shops', shops))

}