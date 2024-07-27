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
        this.#players.set(playerId, new Player(username));
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

    setLeader(playerID: string) {

        //For every new lobby, we need to set a leader that controls the lobby (starts the game, kicks, etc)

        //1. if a lobby is just created, the user who created it is the leader
        //2. if the host leaves the lobby, then randomly assign someone to be the host.
        
        let playerToUpdate : Player | undefined = this.#players.get(playerID);


        if (this.#players.size === 1) {

           if (playerToUpdate) {
                playerToUpdate.host = true;
           }

        }




    }
}