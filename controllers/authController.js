const bcrypt = require('bcrypt');
const User = require('../models/user');
const redisClient = require('../utils/redisClient');
const smsService = require('../services/smsService');

const register = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ phoneNumber, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

const sendVerificationCode = async (req, res) => {
    const { phoneNumber } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const currentTime = Date.now();

    try {
        const lastCodeTime = await redisClient.get(`lastCodeTime_${phoneNumber}`);
        if (lastCodeTime && (currentTime - lastCodeTime) < 2 * 60 * 1000) {
            return res.status(429).json({ message: 'Please wait before requesting a new code' });
        }

        await redisClient.setex(`verificationCode_${phoneNumber}`, 10 * 60, code);
        await redisClient.setex(`lastCodeTime_${phoneNumber}`, 2 * 60, currentTime);

        await smsService.sendSms(phoneNumber, code);
        res.status(200).json({ message: 'Verification code sent' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending verification code' });
    }
};

const verifyCode = async (req, res) => {
    const { phoneNumber, code } = req.body;
    try {
        const storedCode = await redisClient.get(`verificationCode_${phoneNumber}`);
        if (storedCode === code) {
            await redisClient.del(`verificationCode_${phoneNumber}`);
            res.status(200).json({ message: 'Code verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid code' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error verifying code' });
    }
};

module.exports = { register, sendVerificationCode, verifyCode };