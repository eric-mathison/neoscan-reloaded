const logging = require('logall');
logging.registerLogger({
    level: 'INFO',
    type: 'logstash',
    eventType: 'neoscan',
    codec: 'oldlogstashjson',
    output: {
        transport: 'udp',
        host: '178.62.14.56',
        port: 9999
    }
});

module.exports = logging;
