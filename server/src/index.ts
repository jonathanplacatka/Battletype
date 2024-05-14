import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import fetchRandomPoetry from './fetchdata';

const PORT = 4000;

const httpServer = createServer();

let players = new Map();
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

  players.set(socket.id, {score: 0});
  io.emit('playerList', getPlayerNames());
  console.log(players.keys);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    players.delete(socket.id);
    io.emit('playerList', getPlayerNames());
  });

  socket.on('playerStateUpdate', (score) => {
    players.set(socket.id, score);
  })

  socket.on('gameStart', () => {
    fetchRandomPoetry().then((gameText) => { 
      io.emit('gameStart', gameText);
    });
  })

});

httpServer.listen(PORT, () => console.log(`Game Server listening on port ${PORT}`));

function getPlayerNames() {
  //replace this with usernames later
  return Array.from(players.keys());
}