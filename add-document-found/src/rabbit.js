const rabbitmq = require('amqplib');

const rabbitConfig = {
    protocol: 'amqp',
    hostname: 'rabbitmq',
    port: 5672,
    username: 'guest',
    password: 'guest'
};

module.exports = rabbitmq.connect(rabbitConfig);