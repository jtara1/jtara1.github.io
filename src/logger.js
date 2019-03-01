const winston = require('winston');
const path = require('path');
const appRoot = require('app-root-path');
const fs = require('fs');
const logform = require('logform');
// const { MESSAGE } = require('triple-beam'); // prop for info in winston formater to expose the shown message

function filterMessagesFormat(filterFunc = () => true) {
  const formatFunc = (info) => {
    if (filterFunc(info.message)) return info;
    return null;
  };

  const format = logform.format(formatFunc);
  format.transform = formatFunc;

  return format;
}

module.exports = function createLoggerForWinston3(callingModule) {
  /**
   * Returns the name of the parent dir and the basename (file name)
   * e.g.: input: callModule.filename = '/home/user/james/file.js'
   * returns: 'james/file.js'
   * @returns {string}
   */
  function getDirnameAndBasename() {
    if (!callingModule || !callingModule.filename) return 'no-module or filepath given';
    return path.basename(path.dirname(callingModule.filename)) +
      '/' +
      path.basename(callingModule.filename);
  }

  const myFormat = winston.format.combine(
    winston.format.label({ label: getDirnameAndBasename() }),
    winston.format.timestamp(),
    winston.format.simple(),
    filterMessagesFormat(),
  );

  const loggerFilePath = `${appRoot}/logs/app.log`;

  const options = {
    level: process.env.LOGGING_LEVEL || 'info',
    format: myFormat,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          myFormat
        ),
        handleExceptions: false,
      }),
      new winston.transports.File({
        maxsize: 5e7, // 50 MB
        maxFiles: 5,
        filename: loggerFilePath,
        handleExceptions: false,
      }),
    ],
    exitOnError: false,
  };

  fs.mkdir(path.dirname(loggerFilePath), null, () => {});
  return winston.createLogger(options);
};