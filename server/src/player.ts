
export default class Player {
    score: number;
    WPM: number;
    place: number;
    username: string;
    host: boolean;

    constructor(username : string) {
        this.username = username;
        this.score = 0;
        this.WPM = 0;
        this.place = -1;
        this.host = false;
    }
}