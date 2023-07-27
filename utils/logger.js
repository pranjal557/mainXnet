const { createLogger, transports, format } = require('winston');

const customerLogger = createLogger({

  transports: [

    new transports.File({

      filename: 'customer-info.log',

      level: 'info',

      format: format.combine(format.timestamp(), format.json()),

    }),

    new transports.Console({

      level: 'info',

      format: format.combine(format.timestamp(), format.json()),

    }),

  ],

});

module.exports = customerLogger;
