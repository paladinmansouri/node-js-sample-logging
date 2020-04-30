const appRoot = require("app-root-path");
const winston = require("winston");

var options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app-${new Date()
      .toISOString()
      .slice(0, 10)}.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

var logger = new winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  exitOnError: false, // do not exit on handled exceptions
  
});

if (process.env.NODE_ENV !== "production") {
   logger.add(new winston.transports.Console(options.console));
}

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
