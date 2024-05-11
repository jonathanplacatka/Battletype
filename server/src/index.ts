import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

const PORT = 4000;

const httpServer = createServer();

const io = new SocketServer(httpServer, {
  cors: {
    origin: "http://localhost:3000", //the address of our web server. should setup env files for this
    methods: ["GET"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

});

httpServer.listen(PORT, () => console.log(`Game Server listening on port ${PORT}`));