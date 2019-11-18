const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogSearchOrderSchema = new Schema({
  session_id: {type: String,required: true},
  username: {type: String,required: true},
  order_no: {type: String,required: false},
  ref_no: {type: String,required: false},
  customer_no: {type: String,required: false},
  date_start: {type: String,required: false},
  date_end: {type: String,required: false},
  status: {type: String,required: false},
  channel: {type: String,required: false},
  payment_status: {type: String,required: false},
  seller: {type: String,required: false},
  rows_of_result: {type: Number,required: false},
  menu_name: {type: String,required: true},
  action: {type: String,required: true},
  computer_name: {type: String,required: true},
  ip_address: {type: String,required: true},
  datetime: {type: Date,default: Date.now},
  datetime_text: {type: String},
}, {
  collection: 'ccom_log_search_order',
  versionKey: false
});

//middle ware in serial
LogSearchOrderSchema.pre('save', function preSave(next){
  let date_now = Date.now();
  this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
  next();
});

module.exports = mongoose.model('ccom_log_search_order', LogSearchOrderSchema);
