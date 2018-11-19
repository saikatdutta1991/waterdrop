const mongoose = require('mongoose')
const pointSchema = require('../models/pointSchema')
const bcrypt = require('bcryptjs')
const appConfig = require('../configs/app')

/** shop schema */
let shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Shop name is required"],
        maxlength: [128, 'Shop name must be between 0-128 characters']
    },
    address: {
        type: String,
        required: [true, 'Shop address is required'],
        maxlength: [512, 'Shop address must be between 0-512 characters']
    },
    location: {
        type: pointSchema,
        required: true,
        validate: {
            validator: (value) => {

                return Array.isArray(value.coordinates)
                    && value.coordinates.length == 2
                    && (value.coordinates[0] !== undefined
                        && value.coordinates[1] !== undefined)
            },
            message: props => 'Invalid coordinates'
        }
    },
    email: {
        type: String,
        required: [true, 'Shop email is required'],
        validate: [
            {
                validator: function (value) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(value)
                },
                message: props => `${props.value} is not a valid email`
            },
            {
                isAsync: true,
                validator: function (value, cb) {

                    //check email and id both exists in db
                    ShopModel.find({ email: value, _id: { $ne: this._id } }, function (err, shops) {
                        cb(!shops.length, `${value} email already exists in our database`)
                    })
                }
            }
        ]
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    mobileno: {

        country_code: {
            type: String,
            required: [true, 'Shop mobile number is required'],
            validate: {
                validator: (value) => {
                    return /^[+]\d+$/.test(value)
                },
                message: props => `${props.value} is not a valid country code`
            }
        },
        number: {
            type: String,
            required: [true, 'Shop mobile number is required'],
            validate: [
                {
                    validator: (value) => {
                        return /^\d+$/.test(value)
                    },
                    message: props => `${props.value} is not a valid mobile number`
                },
                {
                    isAsync: true,
                    validator: function (value, cb) {

                        var countryCode = this.mobileno.country_code

                        //check email and id both exists in db
                        ShopModel.find({ 'mobileno.number': value, 'mobileno.country_code': countryCode, _id: { $ne: this._id } }, function (err, shops) {
                            cb(!shops.length, `${countryCode}-${value} mobile number already exists in our database`)
                        })
                    }
                }
            ]
        }


    },
    is_mobileno_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Shop password is required'],
        minlength: [6, 'Password must be between 6-20 characters'],
        maxlength: [20, 'Password must be between 6-20 characters']
    },
    shop_image_path: {
        type: String,
        default: ''
    },
    is_opened: {
        type: Boolean,
        default: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

shopSchema.set('toObject', { virtuals: true });
shopSchema.set('toJSON', { virtuals: true });
shopSchema.index({ location: '2dsphere' });





/** hash the password before saving to db */
shopSchema.pre('save', function (next) {

    var shop = this;

    // only hash the password if it has been modified (or is new)
    if (shop.isModified('password')) {
        shop.password = bcrypt.hashSync(shop.password, 10)
    }


    //update the updated_at record
    shop.updated_at = Date.now

    next()

});
/** hash the password before saving to db end*/







/** fetch user by email */
shopSchema.statics.getShopByEmail = function (email) {
    return this.findOne({ email: email })
}



/** verify password */
shopSchema.statics.verifyPassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}


/** remove password property from json response */
shopSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.shop_image_path;
    return obj;
}



/** adding full mobile number to response */
shopSchema.virtual('fullmobileno').get(function () {
    return this.mobileno.country_code + this.mobileno.number
})



/** generating shop image url */
shopSchema.virtual('shop_image_url').get(function () {
    if (!this.shop_image_path) {
        return ''
    }
    return `${appConfig.base_url}/${this.shop_image_path.replace('public/', '')}`
})




/** creating shop model with shopSchema and finally exports shop model */
var ShopModel = mongoose.model('Shop', shopSchema, 'Shop')
module.exports = ShopModel;


