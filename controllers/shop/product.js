/** 
 * This controller handles shops registration apis
 */

const ShopModel = require('../../models/shop')
const ProductModel = require('../../models/product')
const api = require('../../helpers/api')
const paging = require('../../helpers/paging')



/** 
 * get shop products
 */
exports.getProducts = async function (req, res, next) {

    var perPage = 4 // setting perpage value
    var page = paging.currentPage(req.query.page) // getting current page from query

    var pagingData = await paging.calculatePaging(
        ProductModel.find({ shop_id: req.auth_shop._id }), // query to get count
        page, // current page
        perPage // perpage is 4
    )

    /** feching products by shop id */
    var products = await ProductModel.find({ shop_id: req.auth_shop._id })
        .sort({ created_at: -1 })
        .limit(perPage)
        .skip(perPage * page)
        .exec()


    res.json(api.createResponse(true, 'success', 'Products fetched', { paging: pagingData, products: products }))
}






/** add new shop product */
exports.addProduct = async function (req, res, next) {

    var product = new ProductModel
    product.shop_id = req.auth_shop._id
    product.title = req.body.title
    product.description = req.body.description
    product.in_stock = req.body.in_stock
    product.price = req.body.price

    try {

        //saving product
        var product = await product.save()
        res.json(api.createResponse(true, 'success', 'Product added', { product: product }))

    } catch (err) {
        next(new api.CustomError('failed', 'Product add failed', api.formatErrors(err)))
    }



}