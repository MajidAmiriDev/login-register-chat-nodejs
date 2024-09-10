const Message = require('../models/message');
const Group = require('../models/group');
const User = require('../models/user');

// ارسال پیام
const sendMessage = async (groupId, senderId, text) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) throw new Error('Group not found');

        const message = new Message({ group: groupId, sender: senderId, text });
        await message.save();

        return message;
    } catch (error) {
        throw new Error(`Error sending message: ${error.message}`);
    }
};

// دریافت پیام‌های گروه
const getMessages = async (groupId, limit = 20, page = 1) => {
    try {
        const messages = await Message.find({ group: groupId })
            .populate('sender', 'phoneNumber') // فرض بر این است که می‌خواهید شماره تلفن فرستنده را مشاهده کنید
            .sort({ timestamp: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        return messages;
    } catch (error) {
        throw new Error(`Error retrieving messages: ${error.message}`);
    }
};

// ایجاد گروه جدید
const createGroup = async (name, adminId, memberIds) => {
    try {
        const group = new Group({ name, members: [adminId, ...memberIds], permissions: [adminId] });
        await group.save();

        return group;
    } catch (error) {
        throw new Error(`Error creating group: ${error.message}`);
    }
};

// اضافه کردن کاربر به گروه
const addUserToGroup = async (groupId, userId, adminId) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) throw new Error('Group not found');

        if (!group.permissions.includes(adminId)) {
            throw new Error('Not authorized to add user');
        }

        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }

        return group;
    } catch (error) {
        throw new Error(`Error adding user to group: ${error.message}`);
    }
};

// حذف کاربر از گروه
const removeUserFromGroup = async (groupId, userId, adminId) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) throw new Error('Group not found');

        if (!group.permissions.includes(adminId)) {
            throw new Error('Not authorized to remove user');
        }

        group.members = group.members.filter(member => member.toString() !== userId.toString());
        await group.save();

        return group;
    } catch (error) {
        throw new Error(`Error removing user from group: ${error.message}`);
    }
};

// تغییر نام گروه
const updateGroupName = async (groupId, newName, adminId) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) throw new Error('Group not found');

        if (!group.permissions.includes(adminId)) {
            throw new Error('Not authorized to update group');
        }

        group.name = newName;
        await group.save();

        return group;
    } catch (error) {
        throw new Error(`Error updating group name: ${error.message}`);
    }
};

// گرفتن لیست گروه‌ها برای کاربر
const getUserGroups = async (userId) => {
    try {
        const groups = await Group.find({ members: userId });
        return groups;
    } catch (error) {
        throw new Error(`Error retrieving user groups: ${error.message}`);
    }
};

module.exports = {
    sendMessage,
    getMessages,
    createGroup,
    addUserToGroup,
    removeUserFromGroup,
    updateGroupName,
    getUserGroups
};