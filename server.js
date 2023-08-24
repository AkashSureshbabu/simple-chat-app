const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

// Emoji mapping
const emojiMap = {
  "Hey": "👋",
  "ThankYou": "🙏",
  "Congratulations": "🤝",
  "lol": "😂",
  "Awesome": "🔥"
};

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat message', (msg) => {
    // Replace keywords with emojis in the message
    const modifiedMsg = msg.replace(/\b(?:Hey|ThankYou|Congratulations|lol|Awesome)\b/g, match => emojiMap[match]);
    io.emit('chat message', modifiedMsg); // Broadcast the received message (with emojis) to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
