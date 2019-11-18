const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogLoginSchema = new Schema({
  session_id: {type: String,required: true},
  username: {type: String,required: true},
  login_type: {type: String,required: true},
  action: {type: String,required: true},
  computer_name: {type: String,required: true},
  ip_address: {type: String,required: true},
  datetime: {type: Date,default: Date.now},
  datetime_text: {type: String},
}, {
  collection: 'ccom_log_login',
  versionKey: false
});

//middle ware in serial
LogLoginSchema.pre('save', function preSave(next){
  let date_now = Date.now();
  this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
  next();
});

module.exports = mongoose.model('ccom_log_login', LogLoginSchema);
