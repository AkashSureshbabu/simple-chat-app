// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the received message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const PORT = process.env.PORT || 5502;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
