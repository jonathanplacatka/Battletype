import { createServer } from 'http';
import { Socket, Server as SocketServer } from 'socket.io';
import fetchRandomWords from './fetchdata';
import Room from './room';

const PORT = 4000;
const httpServer = createServer();

const io = new SocketServer(httpServer, {
  cors: {
    origin: "http://localhost:3000", //the address of our web server. should setup env files for this
    methods: ["GET"]
  }
});

const rooms: Map<string, Room> = new Map(); 
const playerIdToRoom: Map<string, Room> = new Map();

httpServer.listen(PORT, () => console.log(`Game Server listening on port ${PORT}`));

io.on('connection', (socket) => {
    socket.on('joinRoom', (roomID) => {joinRoom(socket, roomID)});
    socket.on('disconnect', () => {leaveRoom(socket)});
    socket.on('startGame', (roomID) => {startGame(roomID)});
    socket.on('playerStateUpdate', (roomID, playerID, score, WPM) => playerStateUpdate(roomID, playerID, score, WPM))
});

function joinRoom(socket: Socket, roomID: string) {

    let roomToJoin: Room | undefined = rooms.get(roomID);

    if(!roomToJoin) {
        //for now, if a room doesn't exist then just create it.
        //maybe should result in a 404 instead - if we don't want users to be able to create arbitrary room IDs.
        roomToJoin = new Room(roomID)
        rooms.set(roomID, roomToJoin);
    }

    if(roomToJoin.gameStarted) { 
        socket.emit('onJoin', false);
    } else {
        roomToJoin.addPlayer(socket.id)
        playerIdToRoom.set(socket.id, roomToJoin);
        
        socket.join(roomID);
        socket.emit('onJoin', true);
        io.to(roomID).emit('allPlayers', roomToJoin.getPlayers());
    }
}   

function leaveRoom(socket: Socket) {
    let roomToLeave: Room | undefined = playerIdToRoom.get(socket.id);

    if(roomToLeave) {
        roomToLeave.removePlayer(socket.id);

        let roomId = roomToLeave.roomID

        if(roomToLeave.isEmpty()) {
            rooms.delete(roomToLeave.roomID)
        }

        io.to(roomId).emit('allPlayers', roomToLeave.getPlayers());
    }
}

function startGame(roomID: string) {
    let roomToStart: Room | undefined = rooms.get(roomID);

    if(roomToStart) {
        fetchRandomWords().then((text) => {
            io.to(roomID).emit('startGame', text);
            roomToStart.gameStarted = true;
        })
    }
}

function playerStateUpdate(roomID: string, playerID: string, score: number, WPM: number) {
    let room: Room | undefined = rooms.get(roomID);

    if(room) {
        room.updatePlayerState(playerID, score, WPM);
        io.to(roomID).emit('playerStateUpdate', playerID, score, WPM);
    }
}

