const messaging = require('./firebase');
const notificationEmitter = require('../events/notificationEmitter');
const { sendToQueue } = require('../queues/notificationProducer');


notificationEmitter.on('sendNotification', async (data) => {
    const { token, title, body } = data;
    // ارسال پیام به صف RabbitMQ
    await sendToQueue('notificationQueue', { token, title, body });
});

// ارسال نوتیفیکیشن
const sendNotification = async (registrationToken, title, body) => {
    const message = {
        token: registrationToken,
        notification: {
            title: title,
            body: body,
        },
    };

    try {
        await messaging.send(message);
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

// گوش دادن به رویدادها
notificationEmitter.on('sendNotification', async (data) => {
    const { token, title, body } = data;
    await sendNotification(token, title, body);
});

module.exports = {
    sendNotification,
};
