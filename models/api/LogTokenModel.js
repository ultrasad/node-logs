const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogTokenSchema = new Schema({
    token: { type: String, required: true },
    imei_cookie: { type: String, required: true },
    model: { type: String, required: false },
    useragent: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
    datetime_text: { type: String },
}, {
    collection: 'api_log_token',
    versionKey: false
});

//middle ware in serial
LogTokenSchema.pre('save', function preSave(next) {
    let date_now = Date.now();
    this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
    next();
});

module.exports = mongoose.model('api_log_token', LogTokenSchema);