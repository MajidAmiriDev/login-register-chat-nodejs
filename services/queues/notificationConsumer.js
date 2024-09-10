const amqp = require('amqplib');
const notificationService = require('../services/notificationService');

const consumeQueue = async (queueName) => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });

        channel.consume(queueName, async (message) => {
            if (message !== null) {
                const data = JSON.parse(message.content.toString());
                console.log(`Received message from queue ${queueName}:`, data);

                // ارسال نوتیفیکیشن به کاربر
                const { token, title, body } = data;
                await notificationService.sendNotification(token, title, body);

                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('Error consuming message from queue:', error);
    }
};

module.exports = {
    consumeQueue,
};
