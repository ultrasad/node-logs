const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogExportSchema = new Schema({
  session_id: {type: String,required: true},
  username: {type: String,required: true},
  customer_no: {type: String,required: false},
  customer_name: {type: String,required: false},
  priority: {type: String,required: false},
  status: {type: String,required: false},
  workgroup: {type: String,required: false},
  job_description: {type: String,required: false},
  topic_main: {type: String,required: false},
  topic_sub: {type: String,required: false},
  tel_mobile: {type: String,required: false},
  agent: {type: String,required: false},
  subject: {type: String,required: false},
  date_start: {type: String,required: false},
  date_end: {type: String,required: false},
  rows_of_result: {type: Number,required: false},
  report_name: {type: String,required: false},
  menu_name: {type: String,required: true},
  action: {type: String,required: true},
  computer_name: {type: String,required: true},
  ip_address: {type: String,required: true},
  datetime: {type: Date,default: Date.now},
  datetime_text: {type: String},
}, {
  collection: 'ccom_log_export',
  versionKey: false
});

//middle ware in serial
LogExportSchema.pre('save', function preSave(next){
  let date_now = Date.now();
  this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
  next();
});

module.exports = mongoose.model('ccom_log_export', LogExportSchema);
