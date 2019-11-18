const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogRequestSchema = new Schema({
    token: { type: String, required: true },
    type: { type: String, required: true },
    sub_type: { type: String, required: true },
    header: { type: String, required: true },
    query_string: { type: String, required: false },
    body: { type: String, required: true },
    end_point: { type: String, required: true },
    main_channel: { type: String, required: false },
    channel: { type: String, required: false },
    sub_channel: { type: String, required: false },
    response: { type: String, required: true },
    user_id: { type: Number, required: false },
    imei_cookie: { type: String, required: true },
    model: { type: String, required: false },
    useragent: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
    datetime_text: { type: String },
}, {
    collection: 'api_log_request',
    versionKey: false
});

//middle ware in serial
LogRequestSchema.pre('save', function preSave(next) {
    let date_now = Date.now();
    this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
    next();
});

module.exports = mongoose.model('api_log_request', LogRequestSchema);