const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const groupRoutes = require('./routes/groupRoutes');
const socketServer = require('./utils/socketServer');
const redisClient = require('./utils/redisClient');
const authenticate = require('./middlewares/authMiddleware');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// WebSocket server initialization
socketServer.init(server);

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', authenticate, chatRoutes);
app.use('/api/groups', authenticate, groupRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});