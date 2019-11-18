const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogActivitySchema = new Schema({
    session_id: { type: String, required: true },
    action: { type: String, required: true },
    category_id: { type: Number, required: false },
    product_id: { type: Number, required: false },
    shelf_id: { type: Number, required: false },
    user_info: {
        type: Object,
        "default": [{
            first_name: { type: String, required: false },
            last_name: { type: String, required: false },
            idcard: { type: String, required: false },
            email: { type: String, required: false },
            phone_number: { type: String, required: false },
        }]
    },
    ip_address: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
    datetime_text: { type: String },
}, {
    collection: 'web_log_activity',
    versionKey: false
});

//middle ware in serial
LogActivitySchema.pre('save', function preSave(next) {
    let date_now = Date.now();
    this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
    next();
});

module.exports = mongoose.model('web_log_activity', LogActivitySchema);