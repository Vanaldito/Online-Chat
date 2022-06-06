const { Server } = require("socket.io");

module.exports = function createSocket(server) {
  const io = new Server(server, {
    maxHttpBufferSize: 1e8,
    cors: {
      methods: ["GET", "POST"],
    },
  });

  const messages = [];

  io.on("connection", (socket) => {
    socket.on("send message", (message) => {
      messages.push(message);
      io.emit("get messages", messages);
    })

    socket.on("get messages", () => {
      socket.emit("get messages", messages);
    })
  });
}
