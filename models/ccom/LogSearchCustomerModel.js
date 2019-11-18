const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogSearchCustomerSchema = new Schema({
  session_id: {type: String,required: true},
  username: {type: String,required: true},
  customer_no: {type: String,required: false},
  customer_idcard: {type: String,required: false},
  customer_name: {type: String,required: false},
  customer_tel: {type: String,required: false},
  rows_of_result: {type: Number,required: false},
  menu_name: {type: String,required: true},
  action: {type: String,required: true},
  computer_name: {type: String,required: true},
  ip_address: {type: String,required: true},
  datetime: {type: Date,default: Date.now},
  datetime_text: {type: String},
}, {
  collection: 'ccom_log_search_customer',
  versionKey: false
});

//middle ware in serial
LogSearchCustomerSchema.pre('save', function preSave(next){
  let date_now = Date.now();
  this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
  next();
});

module.exports = mongoose.model('ccom_log_search_customer', LogSearchCustomerSchema);
