const mongoose = require('mongoose')
const appConfig = require('../configs/app')

/** product schema */
let productSchema = new mongoose.Schema({

    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    title: {
        type: String,
        required: [true, 'Product title is required'],
        maxlength: [128, 'Product title must be between 0-128 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [500, 'Product description must be between 0-128 characters']
    },
    product_image_path: {
        type: String,
        default: '',
    },
    in_stock: {
        type: Number,
        default: 0,
        validate: [
            {
                validator: function (value) {
                    return value > -1
                },
                message: props => `Product quantity minimum is 0`
            }
        ]
    },
    price: {
        type: Number,
        default: 0.00,
        validate: [
            {
                validator: function (value) {
                    return value >= 0
                },
                message: props => `Product price minimum is 0.00`
            }
        ]
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });


/** change updated at */
productSchema.pre('save', function (next) {

    var product = this;

    //update the updated_at record
    product.updated_at = Date.now

    next()

});
/** hash the password before saving to db end*/




/** remove product_image_path property from json response */
productSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.product_image_path;
    return obj;
}


/** generating product image url */
productSchema.virtual('product_image_url').get(function () {
    if (!this.product_image_path) {
        return ''
    }
    return `${appConfig.base_url}/${this.product_image_path.replace('public/', '')}`
})





/** get products by shop_id */
productSchema.statics.getProductsByShopId = function (shop_id) {
    return this.find({ shop_id: shop_id }).exec()
}




/** creating product model with productSchema and finally exports Product model */
var ProductModel = mongoose.model('Product', productSchema, 'Product')
module.exports = ProductModel;


