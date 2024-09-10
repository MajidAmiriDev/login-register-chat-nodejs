const axios = require('axios');
const config = require('../config/sms');

const sendSms = async (phoneNumber, code) => {
    try {
        const response = await axios.post('https://api.kaaveh.com/send', {
            apiKey: config.apiKey,
            sender: config.sender,
            phoneNumber,
            message: `Your verification code is ${code}`
        });
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

module.exports = { sendSms };