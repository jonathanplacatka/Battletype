import Player from './player';

export default class Room {
    roomID: string; //maybe delete
    #players: Map<string, Player>;
    gameStarted: boolean;
    
    constructor(roomID: string) {
        this.roomID = roomID;
        this.#players = new Map()
        this.gameStarted = false;
    }

    addPlayer(playerId: string) {
        this.#players.set(playerId, new Player());
    }

    removePlayer(playerId: string) {
        this.#players.delete(playerId);
    }

    getPlayers() {
        return Object.fromEntries(this.#players);
    }

    isEmpty() {
        return this.#players.size === 0;
    }
}