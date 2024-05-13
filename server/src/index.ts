import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import fetchRandomPoetry from './fetchdata';

const PORT = 4000;

const httpServer = createServer();

let playerList : string[] = [];
let gameText : string

fetchRandomPoetry().then((text) => {
  gameText = text;
});

const io = new SocketServer(httpServer, {
  cors: {
    origin: "http://localhost:3000", //the address of our web server. should setup env files for this
    methods: ["GET"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  playerList.push(socket.id);
  io.emit('playerList', playerList);
  io.emit('gameText', gameText);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    playerList = playerList.filter(id => id !== socket.id);
    io.emit('playerList', playerList)
  });
});

httpServer.listen(PORT, () => console.log(`Game Server listening on port ${PORT}`));