import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import fetchRandomWords from './fetchdata';
import Player from './player';

const PORT = 4000;
const CURRENT_ROOM = "1234"; 

const httpServer = createServer();

const io = new SocketServer(httpServer, {
  cors: {
    origin: "http://localhost:3000", //the address of our web server. should setup env files for this
    methods: ["GET"]
  }
});

httpServer.listen(PORT, () => console.log(`Game Server listening on port ${PORT}`));

let players = new Map(); 
let gameText = ""
let gameStarted = false;

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  if(gameStarted) { 
    socket.emit('joinRoom', false);
  } else {
    socket.join(CURRENT_ROOM);
    players.set(socket.id, new Player());
    socket.emit('joinRoom', true);
    emitAllPlayers();
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    players.delete(socket.id);
    emitAllPlayers();
  });

  socket.on('startGame', () => {
    fetchRandomWords().then((text) => {
      gameText = text
    })

    io.to(CURRENT_ROOM).emit('startGame', gameText);
    gameStarted = true;

    setTimeout(() => {
      if (gameStarted) {
        console.log("Server shuts down game room")
        endGame()
      }
    }, 60000)
  })

  socket.on('playerStateUpdate', (id, score, wpm) => {
    players.get(id).update(score, wpm);
    io.to(CURRENT_ROOM).emit('playerStateUpdate', id, score, wpm);
  });

  socket.on('endGame', (id) => {
    //TODO: Think about breaking this up into two different events??? Might be better??
    io.to(CURRENT_ROOM).emit('endGame', false, id, players.get(id));
    gameStarted = false;

	resetAllPlayerScores()
  })

});

function emitAllPlayers() {
  io.to(CURRENT_ROOM).emit('allPlayers', Object.fromEntries(players));
}

function endGame() {
	io.to(CURRENT_ROOM).emit('endGame', true, Object.fromEntries(players));
    gameStarted = false;

	//Temp Fix
	resetAllPlayerScores()
}

function resetAllPlayerScores() {
	if (players.size != 0)
		for (const key of players.keys()) {
			players.get(key).update(0,0);
			io.to(CURRENT_ROOM).emit('playerStateUpdate', key, 0, 0);
		}			
}