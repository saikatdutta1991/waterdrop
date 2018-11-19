/** 
 * This controller handles shops registration apis
 */

const ShopModel = require('../../models/shop')
const api = require('../../helpers/api')


/**
 * open shop status
 */
exports.openShop = async function (req, res, next) {

    try {
        var shop = ShopModel.findOneAndUpdate({ _id: req.auth_shop._id }, { is_opened: true }, { new: true }).exec()
        res.json(api.createResponse(true, 'success', 'Shop opened'))
    } catch (error) {
        res.json(api.createResponse(false, 'faliled', 'Shop open failed'))
    }

}



/**
 * close shop status
 */
exports.closeShop = async function (req, res, next) {
    try {
        var shop = ShopModel.findOneAndUpdate({ _id: req.auth_shop._id }, { is_opened: false }, { new: true }).exec()
        res.json(api.createResponse(true, 'success', 'Shop closed'))
    } catch (error) {
        return next(new api.CustomError('failed', 'Shop close failed', api.formatErrors(error)))
    }
}





/**
 * upload shop image
 */
exports.uploadShopImage = function (req, res, next) {

    api.shopimageStorage(req, res, async function (err) {

        /** if any error occour then send response */
        if (err || !req.file) {
            return next(new api.CustomError('file_missing', 'File missing'))
        }

        try {
            shop = await ShopModel.findOneAndUpdate({ _id: req.auth_shop._id }, { shop_image_path: req.file.path }, { new: true });
        } catch (err) {
            return next(new api.CustomError('failed', 'Failed to upload', api.formatErrors(err)))
        }

        res.json(api.createResponse(true, 'success', 'Shop image uploaded successfully', {
            shop_image_url: shop.shop_image_url
        }))


    })
}





/** 
 * get shop profile
 */
exports.getProfile = function (req, res) {
    res.json(api.createResponse(true, 'success', 'Profile fetched', req.auth_shop))
}
