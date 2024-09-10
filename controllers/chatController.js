const Message = require('../models/message');
const Group = require('../models/group');
const User = require('../models/user');
const io = require('../utils/socketServer');
const notificationEmitter = require('../events/notificationEmitter');

const sendMessage = async (req, res) => {
    const { groupId, text } = req.body;
    const senderId = req.userId; // فرض بر این است که کاربر لاگین شده است و userId در req موجود است
    try {
        const message = new Message({ group: groupId, sender: senderId, text });
        await message.save();
        const user = await User.findById(recipientId);
        const { firebaseToken } = user;

        if (firebaseToken) {
            notificationEmitter.emit('sendNotification', {
                token: firebaseToken,
                title: 'New Message',
                body: message,
            });
        }

        io.getIO().to(groupId).emit('message', message);

        res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

module.exports = { sendMessage };