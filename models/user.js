const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

/** user schema */
let userSchema = new mongoose.Schema({

    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    mobile: {
        country_code: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true
        }
    },
    is_mobileno_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });






/** hash the password before saving to db */
userSchema.pre('save', function (next) {

    var user = this;

    // only hash the password if it has been modified (or is new)
    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, 10)
    }


    //update the updated_at record
    userSchema.updated_at = Date.now

    next()

});
/** hash the password before saving to db end*/







/** fetch user by email */
userSchema.statics.getUserByEmail = function (email) {
    return this.findOne({ email: email })
}



/** verify password */
userSchema.statics.verifyPassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}


/** remove password property from json response */
userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}



/** adding full mobile number to response */
userSchema.virtual('fullmobileno').get(function () {
    return this.mobile.country_code + this.mobile.number
})




/** creating user model with userSchema and finally exports user model */
var UserModel = mongoose.model('User', userSchema, 'User')
module.exports = UserModel;


