
export default class Player {
    score: number;
    WPM: number;
    username: string;

    constructor() {
        this.username = '';
        this.score = 0;
        this.WPM = 0;
    }

    update(score: number, WPM: number) {
        this.score = score;
        this.WPM = WPM;
    }
}