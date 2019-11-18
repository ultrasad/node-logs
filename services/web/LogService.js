const express = require('express');
const mongodb = require('../../config/mongodb');
// const moment = require('moment');
// const helper_util = require('../../helpers/util');
// const LineNotifyService = require('../../services/LineNotifyService');
//--- Model ---
const WEB_LogActivityModel = require('../../models/web/LogActivityModel');
const prefix = "web";

module.exports = {
  
  addLogActivity: function (data) {
    const logger = require('../../config/logger').init(prefix);
    const LogActivity = new WEB_LogActivityModel(data);
    let datalog_str = JSON.stringify(data);
    LogActivity.save(function (err,resd) {
      if(err){
        logger.error('addLog Activity error | Request: '+ datalog_str +' | Response: '+ err.message);
        return;
      }else{
        let d_str = JSON.stringify(resd);
        logger.info('addLog Activity success | Request: '+ datalog_str +' | Response: '+ d_str);
      }
    });
  }
  
};