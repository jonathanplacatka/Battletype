import Player from './player';

export default class Room {

    roomID: string; 
    #players: Map<string, Player>;
    gameStarted: boolean;
    numWords: number;
    playersFinished: number;
    
    constructor(roomID: string) {
        this.roomID = roomID;
        this.#players = new Map()
        this.gameStarted = false;
        this.numWords = 0;
        this.playersFinished = 0;
    }

    addPlayer(playerId: string, username: string) {
        let newPlayer = new Player(username)

        if(this.isEmpty()) {
            newPlayer.host = true;
        }

        this.#players.set(playerId, newPlayer);
    }

    removePlayer(playerID: string) {
        let playerToRemove : Player | undefined = this.#players.get(playerID);

        if(playerToRemove) {
            this.#players.delete(playerID);

            if(playerToRemove.host && this.#players.size > 0) {
                let newHost : Player = this.#players.values().next().value;
                newHost.host = true;
            }
        }
    }

    getPlayers() {
        return Object.fromEntries(this.#players);
    }

    updatePlayerState(playerID: string, score: number, WPM: number) {
        let playerToUpdate : Player | undefined = this.#players.get(playerID);

        if (playerToUpdate) {
            playerToUpdate.update(score, WPM);

            if(score === this.numWords && playerToUpdate.place === -1) {
                this.playersFinished++;
                playerToUpdate.place = this.playersFinished;
            }

            return playerToUpdate.place
        }
    }

    isEmpty() {
        return this.#players.size === 0;
    }

    // setLeader(playerID: string) {
    //     let playerToUpdate : Player | undefined = this.#players.get(playerID);

    //     if (this.#players.size === 1) {
    //        if (playerToUpdate) {
    //             playerToUpdate.host = true;
    //        }
    //     }
    // }
}