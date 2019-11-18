const mongodb = require('../../config/mongodb');
// const moment = require('moment');
const helper_util = require('../../helpers/util');
const LineNotifyService = require('../../services/LineNotifyService');
//--- Model ---
const CCOM_LogMenuModel = require('../../models/ccom/LogMenuModel');
const CCOM_LogLoginModel = require('../../models/ccom/LogLoginModel');
const CCOM_LogSearchCustomerModel = require('../../models/ccom/LogSearchCustomerModel');
const CCOM_LogSearchOrderModel = require('../../models/ccom/LogSearchOrderModel');
const CCOM_LogExportModel = require('../../models/ccom/LogExportModel');
const prefix = "ccom";

module.exports = {

    addLogLogin: function(data) {
        const logger = require('../../config/logger').init(prefix);
        CCOM_LogLoginModel.findOne({ session_id: data.session_id }, function(err, obj) {
            if (err) {
                logger.error('addLog Login FineOne error | Request: ' + data.session_id + ' | Response: ' + err.message);
            } else {
                if (!obj) {
                    const LogLogin = new CCOM_LogLoginModel(data);
                    let datalog_str = JSON.stringify(data);
                    LogLogin.save(function(err, resd) {
                        if (err) {
                            logger.error('addLog Login error | Request: ' + datalog_str + ' | Response: ' + err.message);
                            return;
                        } else {
                            let d_str = JSON.stringify(resd);
                            logger.info('addLog Login success | Request: ' + datalog_str + ' | Response: ' + d_str);
                        }
                    });
                } //!obj
            }
        });
    },
    addLogSearchCustomer: function(data) {
        const logger = require('../../config/logger').init(prefix);
        const LogSearchCustomer = new CCOM_LogSearchCustomerModel(data);
        let datalog_str = JSON.stringify(data);
        LogSearchCustomer.save(function(err, resd) {
            if (err) {
                logger.error('addLog SearchCustomer error | Request: ' + datalog_str + ' | Response: ' + err.message);
                return;
            } else {
                let d_str = JSON.stringify(resd);
                logger.info('addLog SearchCustomer success | Request: ' + datalog_str + ' | Response: ' + d_str);
                //--- Line Notify ---
                let d_json = JSON.parse(d_str);
                delete d_json.datetime;
                let line_str = JSON.stringify(d_json);
                if (d_json.rows_of_result > parseInt(process.env.ROWS_OF_RESULT_LINE_NOTIFY_CUSTOMER)) {
                    let str = line_str;
                    let map = {
                        '{"': '',
                        '"}': '',
                        '":"': ': ',
                        '":': ': ',
                        '","': '\n',
                        ',"': '\n',
                    };
                    let s = helper_util.replaceAll(str, map);
                    const line_message = `*ค้นหาลูกค้า*\n` + s;
                    LineNotifyService.sendMessage(prefix, line_message);
                }
                //--- End Line Notify ---
            }
        });
    },
    addLogSearchOrder: function(data) {
        const logger = require('../../config/logger').init(prefix);
        const LogSearchOrder = new CCOM_LogSearchOrderModel(data);
        let datalog_str = JSON.stringify(data);
        LogSearchOrder.save(function(err, resd) {
            if (err) {
                logger.error('addLog SearchOrder error | Request: ' + datalog_str + ' | Response: ' + err.message);
                return;
            } else {
                let d_str = JSON.stringify(resd);
                logger.info('addLog SearchOrder success | Request: ' + datalog_str + ' | Response: ' + d_str);
                //--- Line Notify ---
                let d_json = JSON.parse(d_str);
                delete d_json.datetime;
                let line_str = JSON.stringify(d_json);
                if (d_json.rows_of_result > parseInt(process.env.ROWS_OF_RESULT_LINE_NOTIFY_ORDER)) {
                    let str = line_str;
                    let map = {
                        '{"': '',
                        '"}': '',
                        '":"': ': ',
                        '":': ': ',
                        '","': '\n',
                        ',"': '\n',
                    };
                    let s = helper_util.replaceAll(str, map);
                    const line_message = `*ค้นหารายการสั่งซื้อ*\n` + s;
                    LineNotifyService.sendMessage(prefix, line_message);
                }
                //--- End Line Notify ---
            }
        });
    },
    addLogMenu: function(data) {
        const logger = require('../../config/logger').init(prefix);
        const LogMenu = new CCOM_LogMenuModel(data);
        let datalog_str = JSON.stringify(data);
        LogMenu.save(function(err, resd) {
            if (err) {
                logger.error('addLog Menu error | Request: ' + datalog_str + ' | Response: ' + err.message);
                return;
            } else {
                let d_str = JSON.stringify(resd);
                logger.info('addLog Menu success | Request: ' + datalog_str + ' | Response: ' + d_str);
            }
        });
    },
    addLogExport: function(data) {
        const logger = require('../../config/logger').init(prefix);
        const LogExport = new CCOM_LogExportModel(data);
        let datalog_str = JSON.stringify(data);
        LogExport.save(function(err, resd) {
            if (err) {
                logger.error('addLog Export error | Request: ' + datalog_str + ' | Response: ' + err.message);
                return;
            } else {
                let d_str = JSON.stringify(resd);
                logger.info('addLog Export success | Request: ' + datalog_str + ' | Response: ' + d_str);
                //--- Line Notify ---
                let d_json = JSON.parse(d_str);
                delete d_json.datetime;
                let line_str = JSON.stringify(d_json);
                if (d_json.rows_of_result > parseInt(process.env.ROWS_OF_RESULT_LINE_NOTIFY_EXPORT)) {
                    let str = line_str;
                    let map = {
                        '{"': '',
                        '"}': '',
                        '":"': ': ',
                        '":': ': ',
                        '","': '\n',
                        ',"': '\n',
                    };
                    let s = helper_util.replaceAll(str, map);
                    const line_message = '*'+ d_json.report_name +'*\n' + s;
                    LineNotifyService.sendMessage(prefix, line_message);
                }
                //--- End Line Notify ---
            }
        });
    }

};