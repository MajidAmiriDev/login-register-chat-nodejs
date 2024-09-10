const Message = require('../models/message');
const Group = require('../models/group');
const User = require('../models/user');
const io = require('../utils/socketServer');

const sendMessage = async (req, res) => {
    const { groupId, text } = req.body;
    const senderId = req.userId; // فرض بر این است که کاربر لاگین شده است و userId در req موجود است

    try {
        const message = new Message({ group: groupId, sender: senderId, text });
        await message.save();

        // ارسال پیام به کلاینت‌ها از طریق WebSocket
        io.getIO().to(groupId).emit('message', message);

        res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

module.exports = { sendMessage };