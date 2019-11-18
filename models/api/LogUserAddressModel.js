const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogUserAddressSchema = new Schema({
    imei_cookie: { type: String, required: true },
    user_id: { type: Number, required: false },
    user_info: {
        type: Object,
        "default": [{
            billto: {
                type: Object,
                "default": [{
                    first_name: { type: String, required: false },
                    last_name: { type: String, required: false },
                    idcard: { type: String, required: false },
                    email: { type: String, required: false },
                    phone_number: { type: String, required: false },
                }]
            },
            shipto: {
                type: Object,
                "default": [{
                    first_name: { type: String, required: false },
                    last_name: { type: String, required: false },
                    email: { type: String, required: false },
                    phone_number: { type: String, required: false },
                }]
            }
        }]
    },
    model: { type: String, required: false },
    useragent: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
    datetime_text: { type: String },
}, {
    collection: 'api_log_useraddress',
    versionKey: false
});

//middle ware in serial
LogUserAddressSchema.pre('save', function preSave(next) {
    let date_now = Date.now();
    this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
    next();
});

module.exports = mongoose.model('api_log_useraddress', LogUserAddressSchema);