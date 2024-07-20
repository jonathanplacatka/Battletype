import { createServer, Server as HttpServer } from 'http';
import { Socket, Server as SocketServer } from 'socket.io';
import fetchRandomWords from './fetchdata';
import Room from './room';


export default class GameServer {

    httpServer: HttpServer;

    io: SocketServer;
    port: number;

    roomIdToRoom: Map<string, Room>;
    playerIdToRoom: Map<string, Room>;
  
    constructor(port: number, origin: string) {
        this.port = port;

        this.httpServer = createServer();
        this.io = new SocketServer(this.httpServer, {
            cors: {
            origin: origin, 
            methods: ["GET"]
            }
        });

        this.io.on('connection', (socket) => {
            socket.on('joinRoom', (roomID, username) => this.#joinRoom(socket, roomID, username));
            socket.on('disconnect', () => this.#leaveRoom(socket));
            socket.on('startGame', (roomID) => this.#startGame(roomID));
            socket.on('playerStateUpdate', (roomID, playerID, score, WPM) => this.#playerStateUpdate(roomID, playerID, score, WPM))
        });

        this.roomIdToRoom = new Map(); 
        this.playerIdToRoom = new Map();
    }

    start() {
        this.httpServer.listen(this.port, () => console.log(`Game Server listening on port ${this.port}`));
    }

    #joinRoom(socket: Socket, roomID: string, username: string) {
        let roomToJoin: Room | undefined = this.roomIdToRoom.get(roomID);
    
        if(!roomToJoin) {
            //for now, if a room doesn't exist then just create it.
            //maybe should result in a 404 instead - if we don't want users to be able to create arbitrary room IDs.
            roomToJoin = new Room(roomID)
            this.roomIdToRoom.set(roomID, roomToJoin);
        }
    
        if(roomToJoin.gameStarted) { 
            socket.emit('joinRoom', false);
        } else {
            roomToJoin.addPlayer(socket.id, username)
            this.playerIdToRoom.set(socket.id, roomToJoin);
            
            socket.join(roomID);
            socket.emit('joinRoom', true);
            this.io.to(roomID).emit('allPlayers', roomToJoin.getPlayers());
        }
    }   
    
    #leaveRoom(socket: Socket) {
        let roomToLeave: Room | undefined = this.playerIdToRoom.get(socket.id);
    
        if(roomToLeave) {
            roomToLeave.removePlayer(socket.id);
    
            let roomId = roomToLeave.roomID
    
            if(roomToLeave.isEmpty()) {
                this.roomIdToRoom.delete(roomToLeave.roomID)
            }
    
            this.io.to(roomId).emit('allPlayers', roomToLeave.getPlayers());
        }
    }
    
    #startGame(roomID: string) {
        let roomToStart: Room | undefined = this.roomIdToRoom.get(roomID);
    
        if(roomToStart) {
            fetchRandomWords().then((text) => {
                this.io.to(roomID).emit('startGame', text);
                roomToStart.numWords = text.split(" ").length-1;
                roomToStart.gameStarted = true;
            })
        }
    }

    #playerStateUpdate(roomID: string, playerID: string, score: number, WPM: number) {
        let room: Room | undefined = this.roomIdToRoom.get(roomID);
    
        if(room) {
            let place = room.updatePlayerState(playerID, score, WPM);
            this.io.to(roomID).emit('playerStateUpdate', playerID, score, WPM, place);
        }
    }
}
