const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/create', groupController.createGroup);
router.post('/add-user', groupController.addUserToGroup);

module.exports = router;