const moment = require('moment');
const fs = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
    // return `${dt} [${label}] ${level}: ${message}`;
    return `[${level}][${label}] ${moment(timestamp).format('YYYY-MM-DD HH:mm:ss')} : ${message}`;
});

const init = (prefix) => {
    let logger;
    const _prefix = (prefix ? prefix + '_' : '');
    const optionFile = {
        name: 'logfile-log',
        level: process.env.LOG_LEVEL,
        dirname: 'logs',
        filename: _prefix + 'logfile-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        zippedArchive: true,
        prepend: true,
        colorize: true,
        json: false,
        prettyPrint: true,
        format: combine(
            label({ label: (prefix ? prefix.toUpperCase() : '-') }),
            timestamp(),
            logFormat
        ),
    };
    const optionConsole = {
        colorize: true,
        json: false,
        handleExceptions: true,
        format: combine(
            label({ label: (prefix ? prefix.toUpperCase() : '-') }),
            timestamp(),
            logFormat
        ),
    };
    const logDir = 'logs'; // directory path you want to set
    if (!fs.existsSync(logDir)) {
        // Create the directory if it does not exist
        fs.mkdirSync(logDir);
    }
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console(optionConsole),
            new winston.transports.DailyRotateFile(optionFile),
        ],
        exitOnError: false
    });
    return logger;
}

// module.exports = logger;
module.exports = {
    init: (prefix) => init(prefix),
    // get : () => logger,
};