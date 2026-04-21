const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.json());

// API Routes for Slots and Casino Games
app.get('/api/slots', (req, res) => {
    res.json({ message: 'Slots API' });
});

app.get('/api/casino', (req, res) => {
    res.json({ message: 'Casino Games API' });
});

// Socket.io Setup
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
