const mongodb = require('../../config/mongodb');
// const moment = require('moment');
// const helper_util = require('../../helpers/util');
//--- Model ---
const API_LogRequestModel = require('../../models/api/LogRequestModel');
const API_LogUserAddressModel = require('../../models/api/LogUserAddressModel');
const API_LogTokenModel = require('../../models/api/LogTokenModel');
const prefix = "api";

module.exports = {

    addLogRequest: function(data) {
        const logger = require('../../config/logger').init(prefix);
        const LogRequest = new API_LogRequestModel(data);
        let datalog_str = JSON.stringify(data);
        LogRequest.save(function(err, resd) {
            if (err) {
                logger.error('add LogRequest error | Request: ' + datalog_str + ' | Response: ' + err.message);
                return;
            } else {
                let d_str = JSON.stringify(resd);
                logger.info('add LogRequest success | Request: ' + datalog_str + ' | Response: ' + d_str);
            }
        });
    },
    addLogUserAddress: function(data) {
        const logger = require('../../config/logger').init(prefix);
        let datalog_str = JSON.stringify(data);
        const LogUserModel = new API_LogUserAddressModel(data);
        LogUserModel.save(function(err, resd) {
            if (err) {
                logger.error('add LogUserAddress error | Request: ' + datalog_str + ' | Response: ' + err.message);
                return;
            } else {
                let d_str = JSON.stringify(resd);
                logger.info('add LogUserAddress success | Request: ' + datalog_str + ' | Response: ' + d_str);
            }
        });
    },
    addLogToken: function(data) {
        const logger = require('../../config/logger').init(prefix);
        let datalog_str = JSON.stringify(data);
        API_LogTokenModel.findOne({ token: data.token }, function(err, obj) {
            if (err) {
                logger.error('add LogToken FineOne error | Request: ' + datalog_str + ' | Response: ' + err.message);
                return;
            } else {
                if (obj) {
                    logger.warn('add LogToken fail (duplicate token) | Request: ' + datalog_str + '');
                    return;
                }else{
                    const LogTokenModel = new API_LogTokenModel(data);
                    LogTokenModel.save(function(err, resd) {
                        if (err) {
                            logger.error('add LogToken error | Request: ' + datalog_str + ' | Response: ' + err.message);
                            return;
                        } else {
                            let d_str = JSON.stringify(resd);
                            logger.info('add LogToken success | Request: ' + datalog_str + ' | Response: ' + d_str);
                        }
                    });
                }
            }
        });
    }

};