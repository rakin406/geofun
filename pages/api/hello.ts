import { Server } from "socket.io";

const SocketHandler = (req, res): void => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket): void => {
      socket.on("other-locations", (msg): void => {
        socket.broadcast.emit("update-locations", msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
