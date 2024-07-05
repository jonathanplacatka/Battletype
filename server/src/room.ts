import Player from './player';

export default class Room {
    roomID: string;
    players: Map<string, Player>;
    gameStarted: boolean;
    
    constructor(roomID: string) {
        this.roomID = roomID;
        this.players = new Map()
        this.gameStarted = false;
    }
}