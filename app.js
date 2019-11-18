require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const route_api = require('./routes/api');
const route_web = require('./routes/web');

const CCOM_LogService = require('./services/ccom/LogService');
const WEB_LogService = require('./services/web/LogService');
const API_LogService = require('./services/api/LogService');

//--- http ---
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// --- https ---
// const ssl_options = {
//     key: fs.readFileSync('./ssl/server-key.pem'),
//     cert: fs.readFileSync('./ssl/server-cert.pem'),
//     requestCert: false,
//     rejectUnauthorized: false
// };
// const https = require('https').createServer(ssl_options, app);
// const io_https = require('socket.io')(https);

// view engine setup
var cons = require('consolidate');
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', route_api);
app.use('/', route_web);

// app.listen(process.env.SERVER_PORT, () => console.log('server run listening on port '+process.env.SERVER_PORT));
http.listen(process.env.SERVER_PORT, () => console.log('server run listening on port ' + process.env.SERVER_PORT)); //For Socket.io
// https.listen(process.env.SERVER_PORT_HTTPS, () => console.log('server run listening on port https ' + process.env.SERVER_PORT_HTTPS)); //For Socket.io

io.on('connection', function(client) {
    // console.log('Socket : Client connected...');
    //--- Add Log CCOM ---
    client.on('addLogSearchCustomer', function(data) {
        CCOM_LogService.addLogSearchCustomer(data);
    });
    client.on('addLogSearchOrder', function(data) {
        CCOM_LogService.addLogSearchOrder(data);
    });
    client.on('addLogMenu', function(data) {
        CCOM_LogService.addLogMenu(data);
    });
    client.on('addLogExport', function(data) {
        CCOM_LogService.addLogExport(data);
    });
    client.on('addLogLogin', function(data) {
        CCOM_LogService.addLogLogin(data);
    });
    //--- End Add Log CCOM ---

    //--- Add Log API ---
    client.on('api_addLogRequest', function(data) {
        API_LogService.addLogRequest(data);
    });
    client.on('api_addLogUserAddress', function(data) {
        let _data = {
            imei_cookie: data.imei_cookie,
            user_id: data.user_id,
            user_info: {
                billto: {
                    first_name: data.billto.first_name,
                    last_name: data.billto.last_name,
                    idcard: data.billto.idcard,
                    email: data.billto.email,
                    phone_number: data.billto.phone_number
                },
                shipto: {
                    first_name: data.shipto.first_name,
                    last_name: data.shipto.last_name,
                    email: data.shipto.email,
                    phone_number: data.shipto.phone_number
                }
            },
            model: data.model,
            useragent: data.useragent,
        };
        API_LogService.addLogUserAddress(_data);
    });
    client.on('api_addLogToken', function(data) {
        API_LogService.addLogToken(data);
    });
    //--- End Add Log API ---
});

// io_https.on('connection', function(client) {
//     //--- Add Log WEB ---
//     client.on('web_addLogActivity', function(data) {
//         let _data = {
//             session_id: data.session_id,
//             action: data.action,
//             category_id: data.category_id,
//             product_id: data.product_id,
//             shelf_id: data.shelf_id,
//             user_info: {
//                 first_name: data.first_name,
//                 last_name: data.last_name,
//                 idcard: data.idcard,
//                 email: data.email,
//                 phone_number: data.phone_number
//             },
//             ip_address: data.ip_address
//         };
//         WEB_LogService.addLogActivity(_data);
//     });
//     //--- End Add Log WEB ---
// });
