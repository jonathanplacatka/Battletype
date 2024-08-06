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
            socket.on('resetGame', (roomID) => this.#resetGame(roomID));
            socket.on('playerScoreUpdate', (roomID, playerID, score) => this.#playerScoreUpdate(roomID, playerID, score));
            socket.on('playerWPMUpdate', (roomID, playerID, WPM) => this.#playerWPMUpdate(roomID, playerID, WPM));
            socket.on('getRooms', () => this.#returnAllRooms(socket));
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
            socket.broadcast.emit('getAllRooms', this.#getRoomsDTO())
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
            socket.broadcast.emit('getAllRooms', this.#getRoomsDTO())
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

    #resetGame(roomID: string) {
        let roomToReset: Room | undefined = this.roomIdToRoom.get(roomID);

        if(roomToReset) {
            roomToReset.reset();
            this.io.to(roomID).emit('resetGame');
            this.io.to(roomID).emit('allPlayers', roomToReset.getPlayers());
        }  
    }

    #playerScoreUpdate(roomID: string, playerID: string, score: number) {
        let room: Room | undefined = this.roomIdToRoom.get(roomID);
    
        if(room) {
            let place = room.updatePlayerScore(playerID, score);
            this.io.to(roomID).emit('playerScoreUpdate', playerID, score, place);

            if(room.gameOver()) {
                this.io.to(roomID).emit('endGame');
            }
        }
    }

    #playerWPMUpdate(roomID: string, playerID: string, WPM: number) {
        let room: Room | undefined = this.roomIdToRoom.get(roomID);
    
        if(room) {
            room.updatePlayerWPM(playerID, WPM);
            this.io.to(roomID).emit('playerWPMUpdate', playerID, WPM);
        }
    }

    #returnAllRooms(socket: Socket) {
        let allRooms = this.#getRoomsDTO()
        socket.emit('getAllRooms', allRooms)
    }

    #getRoomsDTO() {
        //Returns an array of rooms Data Transfer Object
        
        let allRooms = Array.from(this.roomIdToRoom, ([key, room]) => ({
            roomID: key,
            players: room.getPlayers()
          }));

        return allRooms;
    }


}
