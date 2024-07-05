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

const roomIdToRoom: Map<string, Room> = new Map(); 
const playerIdToRoom: Map<string, Room> = new Map();

httpServer.listen(PORT, () => console.log(`Game Server listening on port ${PORT}`));

io.on('connection', (socket) => {
  
    socket.on('joinRoom', (roomID) => { joinRoom(socket, roomID) });
    socket.on('disconnect', () => { leaveRoom(socket)});

});

function joinRoom(socket: Socket, roomID: string) {

    let roomToJoin: Room;

    if(roomIdToRoom.has(roomID)) {
        roomToJoin = roomIdToRoom.get(roomID)!;
    } else {
        //for now, if a room doesn't exist then just create it.
        //maybe should result in a 404 instead - if we don't want users to be able to create arbitrary room IDs.
        roomToJoin = new Room(roomID)
        roomIdToRoom.set(roomID, roomToJoin);
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
    let roomToLeave: Room;

    if (playerIdToRoom.has(socket.id)) {
        roomToLeave = playerIdToRoom.get(socket.id)!;
        roomToLeave.removePlayer(socket.id);
    }
}