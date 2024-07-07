import Player from './player';

export default class Room {

    roomID: string; 
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

    updatePlayerState(playerID: string, score: number, WPM: number) {
        let playerToUpdate : Player | undefined = this.#players.get(playerID);

        if (playerToUpdate) {
            playerToUpdate.update(score, WPM);
        }
    }

    updatePlayerWPM(playerID: string, WPM: number) {
        console.log("WE GOT HERE!!")
        let playerToUpdate : Player | undefined = this.#players.get(playerID);

        if (playerToUpdate) {
            playerToUpdate.WPM = WPM;
        }
    }

    isEmpty() {
        return this.#players.size === 0;
    }
}