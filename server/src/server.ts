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

            socket.on('joinRoom', (roomID, username, onJoin) => {
                let response = this.#joinRoom(socket, roomID, username);
                onJoin(response);
            });

            socket.on('createRoom', (onCreate) => {
                let roomID = this.#createRoom()
                onCreate(roomID);
            });
          
            socket.on('disconnect', () => this.#leaveRoom(socket));
            socket.on('startGame', (roomID) => this.#startGame(roomID));
            socket.on('resetGame', (roomID) => this.#resetGame(roomID));
            socket.on('updatePlayerScore', (roomID, playerID, score) => this.#updatePlayerScore(roomID, playerID, score));
            socket.on('updatePlayerWPM', (roomID, playerID, WPM) => this.#updatePlayerWPM(roomID, playerID, WPM));
            socket.on('updatePlayerName', (roomID, playerID, newUsername) => this.#updatePlayerUsername(roomID, playerID, newUsername));
            socket.on('getRooms', () => socket.emit('updateRooms', this.#getRoomsDTO()));
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
            return "notFound"
        } else if (roomToJoin.isFull()) {
            return "roomFull";
        } else if(roomToJoin.gameStarted) { 
            return "gameStarted";
        } else {
            this.playerIdToRoom.set(socket.id, roomToJoin);
            roomToJoin.addPlayer(socket.id, username)
            socket.join(roomID);

            this.io.to(roomID).emit('updatePlayers', roomToJoin.getPlayers());
            this.io.emit('updateRooms', this.#getRoomsDTO())

            return "success";
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

            this.io.to(roomId).emit('updatePlayers', roomToLeave.getPlayers());
            socket.broadcast.emit('updateRooms', this.#getRoomsDTO())
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
            this.io.to(roomID).emit('updatePlayers', roomToReset.getPlayers());
        }  
    }

    #updatePlayerScore(roomID: string, playerID: string, score: number) {
        let room: Room | undefined = this.roomIdToRoom.get(roomID);
    
        if(room) {
            let place = room.updatePlayerScore(playerID, score);
            this.io.to(roomID).emit('updatePlayerScore', playerID, score, place);

            if(room.gameOver()) {
                this.io.to(roomID).emit('endGame');
            }
        }
    }

    #updatePlayerWPM(roomID: string, playerID: string, WPM: number) {
        let room: Room | undefined = this.roomIdToRoom.get(roomID);
    
        if(room) {
            room.updatePlayerWPM(playerID, WPM);
            this.io.to(roomID).emit('updatePlayerWPM', playerID, WPM);
        }
    }

    #updatePlayerUsername(roomID: string, playerID: string, newUsername: string) {
        let room: Room | undefined = this.roomIdToRoom.get(roomID);
    
        if(room) {
            room.updatePlayerUsername(playerID, newUsername);
            this.io.to(roomID).emit('updatePlayers', room.getPlayers());
            this.io.emit('updateRooms', this.#getRoomsDTO());        
        }
    }

    #createRoom() {
        let roomID: string;

        do {
            roomID = String(Math.floor(1000 + Math.random() * 9000));
        } while (this.roomIdToRoom.has(roomID))
    
        this.roomIdToRoom.set(roomID, new Room(roomID));
        return roomID;
    }


    #getRoomsDTO() {
        //Returns an array of rooms Data Transfer Object
        
        let allRooms = Array.from(this.roomIdToRoom, ([key, room]) => ({
            roomID: key,
            players: room.getPlayers(),
            maxCapacity: room.maxCapacity
          }));

        return allRooms;
    }
}
