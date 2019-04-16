var log4js = require('log4js');
log4js.configure({
  appenders: {
    vehicle:{ type: 'file', filename: 'logs/vehicle.log', category: 'vehicle' }
  },
  categories: {
    vehicle: { appenders: ['vehicle'], level: 'info' },
    default: { appenders: ['vehicle'], level: 'trace' }
}
});

module.exports = log4js;