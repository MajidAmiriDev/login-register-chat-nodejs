const Group = require('../models/group');
const User = require('../models/user');

const createGroup = async (req, res) => {
    const { name, memberIds } = req.body;
    const adminId = req.userId;

    try {
        const group = new Group({ name, members: [adminId, ...memberIds], permissions: [adminId] });
        await group.save();
        res.status(201).json({ group });
    } catch (error) {
        res.status(500).json({ error: 'Error creating group' });
    }
};

const addUserToGroup = async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.permissions.includes(req.userId)) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        group.members.push(userId);
        await group.save();
        res.status(200).json({ group });
    } catch (error) {
        res.status(500).json({ error: 'Error adding user to group' });
    }
};

module.exports = { createGroup, addUserToGroup };